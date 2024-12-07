"use client";

import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Task } from "@/lib/store";
import { format } from "date-fns";
import { Plus, Calendar as CalendarIcon, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface DesktopLayoutProps {
  tasks: Task[];
  selectedDate: Date;
  onSelectDate: (date: Date) => void;
  onAddTask: () => void;
  children: React.ReactNode;
}

export function DesktopLayout({
  tasks,
  selectedDate,
  onSelectDate,
  onAddTask,
  children,
}: DesktopLayoutProps) {
  const [view, setView] = useState<"calendar" | "list">("calendar");

  return (
    <div className="hidden lg:grid grid-cols-[300px_1fr] gap-8 max-w-7xl mx-auto p-8">
      <aside className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            <Button
              variant={view === "calendar" ? "default" : "ghost"}
              size="sm"
              onClick={() => setView("calendar")}
            >
              <CalendarIcon className="h-4 w-4 mr-2" />
              Calendar
            </Button>
            <Button
              variant={view === "list" ? "default" : "ghost"}
              size="sm"
              onClick={() => setView("list")}
            >
              <List className="h-4 w-4 mr-2" />
              List
            </Button>
          </div>
        </div>

        {view === "calendar" ? (
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={(date) => date && onSelectDate(date)}
            className={cn("rounded-md border")}
          />
        ) : (
          <div className="space-y-2">
            {Array.from(
              new Set(
                tasks.map((task) =>
                  format(new Date(task.dueDate), "yyyy-MM-dd")
                )
              )
            ).map((date) => (
              <Button
                key={date}
                variant="ghost"
                className="w-full justify-start"
                onClick={() => onSelectDate(new Date(date))}
              >
                <span className="flex-1 text-left">
                  {format(new Date(date), "MMMM d, yyyy")}
                </span>
                <span className="text-muted-foreground">
                  {
                    tasks.filter(
                      (task) =>
                        format(new Date(task.dueDate), "yyyy-MM-dd") === date
                    ).length
                  }
                </span>
              </Button>
            ))}
          </div>
        )}

        <Button onClick={onAddTask} className="w-full">
          <Plus className="h-4 w-4 mr-2" />
          Add Task
        </Button>
      </aside>

      <main className="min-h-[calc(100vh-4rem)]">{children}</main>
    </div>
  );
}
