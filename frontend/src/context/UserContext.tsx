import { createContext, useContext, useState, type ReactNode } from "react";

interface User {
  id: string;
  name: string;
  email: string;
}

// Define the specific allowed values for currentSection
export type SectionType = "DashBoard" | "Tasks" | "Analyzing";

interface UserContextType {
  user: User | null;
  setUser: (user: User) => void;
  clearUser: () => void;
  currentSection: SectionType;
  setCurrentSection: (section: SectionType) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUserState] = useState<User | null>(null);
  // Default to "DashBoard" as requested
  const [currentSection, setCurrentSection] =
    useState<SectionType>("DashBoard");

  const setUser = (user: User) => {
    setUserState(user);
    // Optionally persist to localStorage if needed, but user mentioned storing *after* validation
  };

  const clearUser = () => {
    setUserState(null);
  };

  return (
    <UserContext.Provider
      value={{ user, setUser, clearUser, currentSection, setCurrentSection }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
