"use client";

import { format, isSameDay } from "date-fns";
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

  return (
    <Button
      variant="ghost"
      className={cn(
        "flex-1 flex flex-col items-center p-2 h-auto relative",
        isSelected && "bg-primary text-primary-foreground",
        isToday && !isSelected && "border border-primary"
      )}
      onClick={() => onSelect(date)}
    >
      <span className="text-xs font-medium">
        {format(date, "EEE")}
      </span>
      <span className="text-lg">
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