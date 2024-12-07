"use client";

import { startOfWeek, addDays } from "date-fns";
import { WeekDay } from "./week-day";

interface WeekViewProps {
  selectedDate: Date;
  onSelectDate: (date: Date) => void;
}

export function WeekView({ selectedDate, onSelectDate }: WeekViewProps) {
  // Start week from Monday (weekStartsOn: 1)
  const startDate = startOfWeek(selectedDate, { weekStartsOn: 1 });
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(startDate, i));

  return (
    <div className="flex justify-between items-center gap-1">
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