import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PrismaService } from '../prisma.service';

@Injectable()
export class TaskService {
  constructor(private prisma: PrismaService) {}

  create(createTaskDto: CreateTaskDto, userId: string) {
    return this.prisma.task.create({
      data: {
        title: createTaskDto.title,
        description: createTaskDto.description,
        status: createTaskDto.status,
        priority: createTaskDto.priority,
        estimatedTime: createTaskDto.estimatedTime * 60, // convert minutes to seconds
        startTime: createTaskDto.startTime,
        endTime: createTaskDto.endTime,
        userId,
      },
    });
  }

  async findAll() {
    const tasks = await this.prisma.task.findMany({
      include: { taskTrackers: true },
    });

    return tasks.map((task) => this.formatTaskWithMetrics(task));
  }

  async findRecent() {
    const tasks = await this.prisma.task.findMany({
      include: { taskTrackers: true },
      orderBy: { updatedAt: 'desc' },
      take: 3,
    });

    return tasks.map((task) => this.formatTaskWithMetrics(task));
  }

  private formatTaskWithMetrics(task: any) {
    const totalElapsedSeconds = task.taskTrackers.reduce(
      (sum, tracker) => sum + (tracker.timeDeference || 0),
      0,
    );

    // Find the active tracker (has startTime but no pauseTime)
    const activeTracker = task.taskTrackers.find(
      (t) => t.startTime && !t.pauseTime,
    );

    const { taskTrackers, ...taskData } = task;
    return {
      ...taskData,
      totalElapsedSeconds,
      activeTrackerStartTime: activeTracker?.startTime || null,
    };
  }

  findOne(id: string) {
    return this.prisma.task.findUnique({ where: { id } });
  }

  update(id: string, updateTaskDto: UpdateTaskDto) {
    return this.prisma.task.update({
      where: { id },
      data: updateTaskDto,
    });
  }

  async remove(id: string) {
    // Delete related TaskTracker rows first (foreign key constraint)
    await this.prisma.taskTracker.deleteMany({ where: { taskId: id } });
    return this.prisma.task.delete({ where: { id } });
  }

  async startTask(taskId: string) {
    // 1. Update task status to running
    const task = await this.prisma.task.update({
      where: { id: taskId },
      data: { status: 'running' },
    });

    // 2. Create a new TaskTracker row with startTime = now
    const activeTracker = await this.prisma.taskTracker.create({
      data: {
        taskId,
        startTime: new Date(),
      },
    });

    // 3. Get all previous tracker rows and sum timeDeference
    const allTrackers = await this.prisma.taskTracker.findMany({
      where: { taskId },
    });

    const totalElapsedSeconds = allTrackers.reduce((sum, tracker) => {
      return sum + (tracker.timeDeference || 0);
    }, 0);

    return {
      task,
      totalElapsedSeconds,
      activeTracker,
    };
  }

  async pauseTask(taskId: string) {
    // 1. Update task status to pause
    const task = await this.prisma.task.update({
      where: { id: taskId },
      data: { status: 'pause' },
    });

    // 2. Find the latest tracker row that has no pauseTime (active row)
    const activeTracker = await this.prisma.taskTracker.findFirst({
      where: { taskId, pauseTime: null },
      orderBy: { startTime: 'desc' },
    });

    if (activeTracker) {
      const now = new Date();
      const timeDiff = Math.floor(
        (now.getTime() - new Date(activeTracker.startTime).getTime()) / 1000,
      );

      // 3. Update the active tracker with pauseTime and timeDeference
      await this.prisma.taskTracker.update({
        where: { id: activeTracker.id },
        data: {
          pauseTime: now,
          timeDeference: timeDiff,
        },
      });
    }

    // 4. Get total elapsed seconds from all tracker rows
    const allTrackers = await this.prisma.taskTracker.findMany({
      where: { taskId },
    });

    const totalElapsedSeconds = allTrackers.reduce((sum, tracker) => {
      return sum + (tracker.timeDeference || 0);
    }, 0);

    return {
      task,
      totalElapsedSeconds,
    };
  }

  async completeTask(taskId: string, timeToSpend: number) {
    // 1. If currently running, close the active tracker first
    const activeTracker = await this.prisma.taskTracker.findFirst({
      where: { taskId, pauseTime: null },
      orderBy: { startTime: 'desc' },
    });

    if (activeTracker) {
      const now = new Date();
      const timeDiff = Math.floor(
        (now.getTime() - new Date(activeTracker.startTime).getTime()) / 1000,
      );
      await this.prisma.taskTracker.update({
        where: { id: activeTracker.id },
        data: {
          pauseTime: now,
          timeDeference: timeDiff,
        },
      });
    }

    // 2. Update task status to done and store timeToSpend provided by frontend
    const task = await this.prisma.task.update({
      where: { id: taskId },
      data: {
        status: 'done',
        timeToSpend,
      },
    });

    // 3. Sum all timeDeference from all tracker rows for returning updated state
    const allTrackers = await this.prisma.taskTracker.findMany({
      where: { taskId },
    });
    const totalElapsedSeconds = allTrackers.reduce((sum, tracker) => {
      return sum + (tracker.timeDeference || 0);
    }, 0);

    return {
      task,
      totalElapsedSeconds,
      timeToSpend,
    };
  }
}
