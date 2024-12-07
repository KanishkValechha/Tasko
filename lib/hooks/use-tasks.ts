"use client";

import { useStore } from "@/lib/store";
import { format } from "date-fns";

export function useTasks(selectedDate: Date) {
  const tasks = useStore((state) => state.tasks);

  const filteredTasks = tasks.filter(
    (task) => format(new Date(task.dueDate), "yyyy-MM-dd") === format(selectedDate, "yyyy-MM-dd")
  );

  return {
    tasks: filteredTasks,
    totalTasks: filteredTasks.length,
  };
}