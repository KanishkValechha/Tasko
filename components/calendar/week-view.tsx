"use client";

import { startOfWeek, addDays, subDays } from "date-fns";
import { WeekDay } from "./week-day";

interface WeekViewProps {
  selectedDate: Date;
  onSelectDate: (date: Date) => void;
}

export function WeekView({ selectedDate, onSelectDate }: WeekViewProps) {
  const today = new Date();
  // Get 3 days before and 3 days after today
  const weekDays = [
    ...Array(3).fill(0).map((_, i) => subDays(today, 3 - i)),
    today,
    ...Array(3).fill(0).map((_, i) => addDays(today, i + 1)),
  ];

  return (
    <div className="flex justify-between items-center gap-1 border-x-0 border-y-0">
      {weekDays.map((date) => (
        <WeekDay
          key={date.toISOString()}
          date={date}
          selectedDate={selectedDate}
          onSelect={onSelectDate}
        />
      ))}
    </div>
  );
}