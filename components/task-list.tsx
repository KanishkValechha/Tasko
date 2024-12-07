"use client";

import React, { forwardRef } from "react";
import { motion, AnimatePresence, HTMLMotionProps } from "framer-motion";
import { Task, useStore } from "@/lib/store";
import { Checkbox } from "@/components/ui/checkbox";
import { format } from "date-fns";
import { Trash2, Pencil } from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

type MotionDivProps = HTMLMotionProps<"div"> &
  React.HTMLAttributes<HTMLDivElement>;

const MotionDiv = motion(
  forwardRef<HTMLDivElement, MotionDivProps>(function Div(props, ref) {
    return <div {...props} ref={ref} />;
  })
);

interface TaskListProps {
  tasks: Task[];
}

export function TaskList({ tasks }: TaskListProps) {
  const toggleTask = useStore((state) => state.toggleTask);
  const deleteTask = useStore((state) => state.deleteTask);

  return (
    <AnimatePresence>
      {tasks.length === 0 ? (
        <MotionDiv
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="text-center py-12 text-muted-foreground"
        >
          No tasks for this day
        </MotionDiv>
      ) : (
        <div className="space-y-2">
          {tasks.map((task) => (
            <MotionDiv
              key={task.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={cn(
                "group flex items-start space-x-4 bg-card p-4 rounded-lg shadow-md",
                "hover:shadow-lg transition-shadow duration-200",
                "lg:hover:scale-[1.02] lg:transform lg:transition-all"
              )}
            >
              <Checkbox
                checked={task.completed}
                onCheckedChange={() => toggleTask(task.id)}
                className="my-auto rounded-full h-5 w-5 border-2"
              />
              <div className="flex-1 space-y-1">
                <p
                  className={cn(
                    task.completed ? "line-through text-muted-foreground" : "",
                    "font-medium"
                  )}
                >
                  {task.title}
                </p>
                {task.description && (
                  <p className="text-sm text-muted-foreground">
                    {task.description}
                  </p>
                )}
              </div>
              <div className="flex gap-2 group-hover:opacity-100 transition-opacity">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => deleteTask(task.id)}
                  className="h-10 w-10 text-destructive hover:text-destructive/90"
                >
                  <Trash2 className="h-5 w-5" />
                </Button>
              </div>
            </MotionDiv>
          ))}
        </div>
      )}
    </AnimatePresence>
  );
}
