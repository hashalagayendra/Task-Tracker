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

  findAll() {
    return this.prisma.task.findMany();
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

  remove(id: string) {
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
}
