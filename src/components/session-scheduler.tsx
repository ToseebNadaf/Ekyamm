"use client";

import * as React from "react";
import { format, isBefore, isWeekend } from "date-fns";
import { CalendarIcon, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Sheet } from "@/components/ui/sheet";
import { TimeSlots } from "./time-slots";
import { hasAvailableSlots } from "@/lib/data";

export function SessionScheduler({
  onChange,
}: {
  onChange: (data: { date: Date | undefined; sessionTime: string }) => void;
}) {
  const [date, setDate] = React.useState<Date>();
  const [sessionTime, setSessionTime] = React.useState("");
  const [isCalendarOpen, setIsCalendarOpen] = React.useState(false);
  const [isTimeOpen, setIsTimeOpen] = React.useState(false);

  const handleDateSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
    onChange({ date: selectedDate, sessionTime });
    setIsCalendarOpen(false);
    if (selectedDate) {
      setIsTimeOpen(true);
    }
  };

  const handleTimeSelect = (time: string) => {
    setSessionTime(time);
    onChange({ date, sessionTime: time });
    setIsTimeOpen(false);
  };

  return (
    <div className="grid grid-cols-2 gap-6 items-start">
      <div>
        <h3 className="mb-2 text-sm font-medium text-gray-500">Session Date</h3>
        <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-full flex items-center justify-between rounded-[7.26px] bg-white text-left font-normal text-gray-400"
            >
              <div className="text-[12px]">
                {date ? format(date, "dd/MM/yyyy") : "11/12/2024"}
              </div>
              <CalendarIcon className="h-4 w-4 text-gray-400" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={date}
              onSelect={handleDateSelect}
              disabled={(date) => {
                const dateStr = format(date, "yyyy-MM-dd");
                return (
                  isWeekend(date) ||
                  isBefore(date, new Date()) ||
                  !hasAvailableSlots(dateStr)
                );
              }}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>

      <div>
        <h3 className="mb-2 text-sm font-medium text-gray-500">
          Session Time Slot
        </h3>
        <div className="relative">
          <Input
            disabled
            type="text"
            value={
              sessionTime
                ? format(new Date(`2024-01-01 ${sessionTime}`), "hh:mm aa")
                : ""
            }
            readOnly
            className="w-full flex items-center justify-between rounded-[7.26px] bg-white text-left font-normal text-gray-400 text-[12px]"
            placeholder="HH:MM"
            onClick={() => date && setIsTimeOpen(true)}
          />
          <Clock className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        </div>
      </div>

      <Sheet
        open={isTimeOpen}
        onClose={() => setIsTimeOpen(false)}
        title="Select Session Time"
      >
        <TimeSlots date={date!} onSelect={handleTimeSelect} />
      </Sheet>
    </div>
  );
}
