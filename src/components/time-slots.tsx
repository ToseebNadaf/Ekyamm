import * as React from "react";
import { format } from "date-fns";
import { ChevronDown } from "lucide-react";
import { timeSlots, isTimeSlotBooked } from "@/lib/data";
import { Button } from "./ui/button";

interface TimeSlotsProps {
  date: Date;
  onSelect: (time: string) => void;
}

export function TimeSlots({ date, onSelect }: TimeSlotsProps) {
  const dateStr = format(date, "yyyy-MM-dd");
  const [openSections, setOpenSections] = React.useState<string[]>([
    "morning",
    "afternoon",
    "evening",
    "night",
  ]);

  const toggleSection = (sectionKey: string) => {
    setOpenSections((prev) =>
      prev.includes(sectionKey)
        ? prev.filter((key) => key !== sectionKey)
        : [...prev, sectionKey]
    );
  };

  const TimeSlotButton = ({ time }: { time: string }) => {
    const isBooked = isTimeSlotBooked(dateStr, time);
    return (
      <Button
        disabled={isBooked}
        onClick={() => onSelect(time)}
        className={`px-3 py-2 text-[12px] font-medium rounded-[7.26px] border bg-white ${
          isBooked
            ? "opacity-50 cursor-not-allowed border-rose-200 text-[#CC627B]"
            : "border-rose-300 text-[#CC627B] hover:text-rose-500 hover:bg-rose-100 text-[12px] font-medium"
        }`}
      >
        {format(new Date(`2024-01-01 ${time}`), "hh:mm aa")}
      </Button>
    );
  };

  const TimeSlotSection = ({
    title,
    slots,
    sectionKey,
  }: {
    title: string;
    slots: string[];
    sectionKey: string;
  }) => {
    const isOpen = openSections.includes(sectionKey);
    const allBooked = slots.every((time) => isTimeSlotBooked(dateStr, time));

    return (
      <div className="bg-white px-4 rounded-[12px] mt-4">
        <button
          className="flex w-full items-center justify-between py-4"
          onClick={() => toggleSection(sectionKey)}
        >
          <h3 className="text-base font-semibold text-gray-900">{title}</h3>
          <ChevronDown
            className={`h-5 w-5 text-gray-500 transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </button>
        {isOpen && (
          <div className="pb-4 max-h-48 overflow-y-auto">
            {allBooked ? (
              <p className="text-sm text-gray-500">
                All slots booked for this time
              </p>
            ) : (
              <div className="grid grid-cols-4 gap-[10px]">
                {slots.map((time) => (
                  <TimeSlotButton key={time} time={time} />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="max-h-[80vh] overflow-y-auto pb-[70px]">
      <TimeSlotSection
        title="Morning"
        slots={timeSlots.morning}
        sectionKey="morning"
      />
      <TimeSlotSection
        title="Afternoon"
        slots={timeSlots.afternoon}
        sectionKey="afternoon"
      />
      <TimeSlotSection
        title="Evening"
        slots={timeSlots.evening}
        sectionKey="evening"
      />
      <TimeSlotSection
        title="Night"
        slots={timeSlots.night}
        sectionKey="night"
      />

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t flex gap-3">
        <Button
          onClick={() => onSelect("")}
          className="flex-1 rounded-[8px] border-[#CC627B] bg-[#FFE5EB]/50 hover:bg-white text-[14px] font-medium text-[#CC627B]"
        >
          Cancel
        </Button>
        <Button className="flex-1 rounded-[8px] bg-gradient-to-r from-[#BBA3E4] to-[#E7A1A0] text-white hover:opacity-90 text-[14px] font-medium">
          Confirm
        </Button>
      </div>
    </div>
  );
}
