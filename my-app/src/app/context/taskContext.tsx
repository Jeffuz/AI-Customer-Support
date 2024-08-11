import { createContext} from "react";

interface TaskContextType {
  taskType: string;
  setTaskType: any;
}

export const TaskContext = createContext<TaskContextType | undefined>(undefined);
