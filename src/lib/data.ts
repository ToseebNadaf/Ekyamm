export type BookedSlot = {
  date: string;
  times: string[];
};

export const bookedSlots: BookedSlot[] = [
  {
    date: "2025-01-23",
    times: [
      "08:00",
      "10:00",
      "11:00",
      "13:00",
      "14:00",
      "15:00",
      "17:00",
      "18:00",
      "19:00",
      "20:00",
      "22:00",
      "23:00",
    ],
  },
  {
    date: "2025-01-24",
    times: ["11:00", "16:00"],
  },
  {
    date: "2025-01-29",
    times: [
      "08:00",
      "09:00",
      "10:00",
      "11:00",
      "12:00",
      "13:00",
      "14:00",
      "15:00",
      "16:00",
      "17:00",
      "18:00",
      "19:00",
      "20:00",
      "21:00",
      "22:00",
      "23:00",
    ],
  },
];

export const timeSlots = {
  morning: ["08:00", "09:00", "10:00", "11:00"],
  afternoon: ["12:00", "13:00", "14:00", "15:00"],
  evening: ["16:00", "17:00", "18:00", "19:00"],
  night: ["20:00", "21:00", "22:00", "23:00"],
};

export function isDateFullyBooked(date: string): boolean {
  const slot = bookedSlots.find((slot) => slot.date === date);
  if (!slot) return false;

  const totalAvailableSlots = Object.values(timeSlots).flat().length;
  return slot.times.length >= totalAvailableSlots;
}

export function isTimeSlotBooked(date: string, time: string): boolean {
  const slot = bookedSlots.find((slot) => slot.date === date);
  if (!slot) return false;
  return slot.times.includes(time);
}

export function hasAvailableSlots(date: string): boolean {
  const slot = bookedSlots.find((slot) => slot.date === date);
  if (!slot) return true;

  const totalSlots = Object.values(timeSlots).flat().length;
  return slot.times.length < totalSlots;
}
