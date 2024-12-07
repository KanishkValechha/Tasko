"use client";

import { motion } from "framer-motion";
import { format } from "date-fns";
import { useStore, Task } from "@/lib/store";
import { TaskList } from "@/components/task-list";
import { AddTaskDialog } from "@/components/add-task-dialog";
import { useState } from "react";
import { MobileLayout } from "@/components/layouts/mobile-layout";
import { DesktopLayout } from "@/components/layouts/desktop-layout";

export default function Home() {
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const tasks = useStore((state) => state.tasks);

  const filteredTasks = tasks.filter(
    (task) =>
      format(new Date(task.dueDate), "yyyy-MM-dd") ===
      format(selectedDate, "yyyy-MM-dd")
  );

  const taskContent = (
    <motion.div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">
          {format(selectedDate, "MMMM d, yyyy")}
        </h2>
        <span className="text-muted-foreground">
          {filteredTasks.length} task{filteredTasks.length !== 1 ? "s" : ""}
        </span>
      </div>
      <TaskList tasks={filteredTasks} />
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-background">
      <MobileLayout
        selectedDate={selectedDate}
        onSelectDate={setSelectedDate}
        onAddTask={() => setIsAddTaskOpen(true)}
      >
        {taskContent}
      </MobileLayout>

      <DesktopLayout
        tasks={tasks}
        selectedDate={selectedDate}
        onSelectDate={setSelectedDate}
        onAddTask={() => setIsAddTaskOpen(true)}
      >
        {taskContent}
      </DesktopLayout>

      <AddTaskDialog open={isAddTaskOpen} onOpenChange={setIsAddTaskOpen} />
    </div>
  );
}
