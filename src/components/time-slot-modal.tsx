import * as React from "react";
import { format } from "date-fns";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { timeSlots, isTimeSlotBooked } from "@/lib/data";

interface TimeSlotModalProps {
  date: Date;
  onClose: () => void;
  onSelect: (time: string) => void;
}

export function TimeSlotModal({ date, onClose, onSelect }: TimeSlotModalProps) {
  const dateStr = format(date, "yyyy-MM-dd");

  const TimeSlotButton = ({ time }: { time: string }) => {
    const isBooked = isTimeSlotBooked(dateStr, time);
    return (
      <Button
        variant="outline"
        className={`rounded-md border-rose-200 ${
          isBooked ? "opacity-50 cursor-not-allowed" : "hover:border-rose-500"
        }`}
        disabled={isBooked}
        onClick={() => onSelect(time)}
      >
        {format(new Date(`2024-01-01 ${time}`), "hh:mm aa")}
      </Button>
    );
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Select Session Time</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-6 p-4">
            <div>
              <h3 className="text-lg font-medium mb-3">Morning</h3>
              <div className="grid grid-cols-4 gap-2">
                {timeSlots.morning.map((time) => (
                  <TimeSlotButton key={time} time={time} />
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-3">Afternoon</h3>
              <div className="grid grid-cols-4 gap-2">
                {timeSlots.afternoon.map((time) => (
                  <TimeSlotButton key={time} time={time} />
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-3">Evening</h3>
              <div className="grid grid-cols-4 gap-2">
                {timeSlots.evening.map((time) => (
                  <TimeSlotButton key={time} time={time} />
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-3">Night</h3>
              <div className="grid grid-cols-4 gap-2">
                {timeSlots.night.map((time) => (
                  <TimeSlotButton key={time} time={time} />
                ))}
              </div>
            </div>
          </div>
        </ScrollArea>

        <div className="flex justify-end gap-3 mt-6 pt-4 border-t">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button className="bg-rose-100 text-rose-500 hover:bg-rose-200">
            Confirm
          </Button>
        </div>
      </div>
    </div>
  );
}
