"use client";

import Chatbox from "./components/chatbox";
import { useState } from "react";
import { TaskContext } from "./context/taskContext";

export default function Home() {
  // Task states for modal
  const [taskType, setTaskType] = useState<string>("general_knowledge"); // default task


  return (
    <TaskContext.Provider value={{ taskType, setTaskType }}>

      <Chatbox />

    </TaskContext.Provider>  
  );
}
