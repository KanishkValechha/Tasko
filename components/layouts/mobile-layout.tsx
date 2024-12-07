"use client";

import { MobileCalendar } from "@/components/calendar/mobile-calendar";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MobileLayoutProps {
  selectedDate: Date;
  onSelectDate: (date: Date) => void;
  onAddTask: () => void;
  children: React.ReactNode;
}

export function MobileLayout({
  selectedDate,
  onSelectDate,
  onAddTask,
  children
}: MobileLayoutProps) {
  const dayOfWeek = selectedDate.toLocaleDateString('en-US', { weekday: 'long' });
  return (
    <div className="lg:hidden container mx-auto px-4 py-8 max-w-2xl">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">{dayOfWeek}</h1>
        </div>

        <MobileCalendar
          selectedDate={selectedDate}
          onSelectDate={onSelectDate}
        />

        <main>
          {children}
        </main>
      </div>
      <Button 
        onClick={onAddTask} 
        size="icon" 
        className="fixed bottom-8 left-1/2 -translate-x-1/2 rounded-full bg-white hover:bg-gray-100 shadow-xl"
      >
        <Plus className="h-6 w-6 text-black" />
      </Button>
    </div>
  );
}