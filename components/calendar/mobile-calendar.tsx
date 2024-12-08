"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { addWeeks, subWeeks } from "date-fns";
import { Button } from "@/components/ui/button";
import { WeekView } from "./week-view";

interface MobileCalendarProps {
  selectedDate: Date;
  onSelectDate: (date: Date) => void;
}

export function MobileCalendar({
  selectedDate,
  onSelectDate,
}: MobileCalendarProps) {
  const [currentWeek, setCurrentWeek] = useState(new Date());

  const handlePreviousWeek = () => {
    setCurrentWeek((prev) => subWeeks(prev, 1));
  };

  const handleNextWeek = () => {
    setCurrentWeek((prev) => addWeeks(prev, 1));
  };

  const handleDateSelect = (date: Date) => {
    onSelectDate(date);
    setCurrentWeek(date);
  };

  return (
    <div
      className="bg-card rounded-2xl  py-4 px-2 shadow-xl"
    >
      <WeekView selectedDate={selectedDate} onSelectDate={handleDateSelect} />
    </div>
  );
}


