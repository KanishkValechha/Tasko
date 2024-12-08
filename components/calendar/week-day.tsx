"use client";

import { format, isSameDay, isAfter, isBefore } from "date-fns";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface WeekDayProps {
  date: Date;
  selectedDate: Date;
  onSelect: (date: Date) => void;
}

export function WeekDay({ date, selectedDate, onSelect }: WeekDayProps) {
  const isSelected = isSameDay(date, selectedDate);
  const isToday = isSameDay(date, new Date());
  const isPast = isBefore(date, new Date()) && !isToday;
  const isFuture = isAfter(date, new Date()) && !isToday;

  return (
    <Button
      variant="ghost"
      className={cn(
        "flex-1 flex flex-col items-center p-2 h-auto relative",
        isSelected && "!bg-black !text-white hover:!bg-black rounded-xl",
        isToday && !isSelected && "border border-primary"
      )}
      onClick={() => onSelect(date)}
    >
      <span className={cn(
        "text-xs font-medium",
        (isPast || isFuture) && !isSelected && "opacity-50"
      )}>
        {format(date, "EEE")}
      </span>
      <span className={cn(
        "text-lg",
        isPast && !isSelected && "text-black",
        isFuture && !isSelected && "opacity-50"
      )}>
        {format(date, "d")}
      </span>
      {isSelected && (
        <motion.div
          layoutId="selected-day"
        />
      )}
    </Button>
  );
}