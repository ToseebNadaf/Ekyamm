/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface DoctorListItemProps {
  name: string;
  specialty: string;
  fee: string;
  phone: string;
  imageUrl: string;
  onBookNow: () => void;
}

export function DoctorListItem({
  name,
  specialty,
  fee,
  phone,
  imageUrl,
  onBookNow,
}: DoctorListItemProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div
      className="rounded-[12px] bg-white shadow-sm 
    w-full sm:max-w-[400px] md:max-w-[600px] lg:max-w-[800px] xl:max-w-[1000px] mx-auto"
    >
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex w-full items-center gap-3 p-4 text-left"
      >
        <img
          src={imageUrl || "/placeholder.svg"}
          alt={name}
          className="h-12 w-12 rounded-full object-cover"
        />
        <div className="flex-1">
          <h3 className="text-black font-semibold text-[14px]">{name}</h3>
          <p className="text-[#6D6A5D] text-[12px]">{phone}</p>
          <p className="text-[#565555] text-[12px] font-bold">{specialty}</p>
        </div>
        <ChevronDown
          className={cn(
            "h-5 w-5 text-gray-400 transition-transform",
            isExpanded && "rotate-180"
          )}
        />
      </button>

      {isExpanded && (
        <div className="px-4 pb-4">
          <hr />
          <div className="mb-4 grid grid-cols-2 gap-4 mt-5">
            <div>
              <p className="text-sm font-semibold text-black">Expertise</p>
              <p className="text-[12px] font-medium text-gray-500">
                {specialty}
              </p>
            </div>
            <div>
              <p className="text-sm font-semibold text-black">Gender</p>
              <p className="text-[12px] font-medium text-gray-800">Male</p>
            </div>
            <div>
              <p className="text-sm font-semibold  text-black">Session mode</p>
              <p className="text-[12px] font-medium text-gray-500">
                In-Person & Online
              </p>
            </div>
            <div>
              <p className="text-sm font-semibold  text-black">Session Fee</p>
              <p className="text-[12px] font-medium text-gray-500">{fee}</p>
            </div>
          </div>
          <hr />
          <button
            onClick={(e) => {
              e.stopPropagation();
              onBookNow();
            }}
            className="w-full rounded-[8px] bg-gradient-to-r from-[#BBA3E4] to-[#E7A1A0] px-4 py-3 text-sm font-medium text-white hover:opacity-90 transition-opacity mt-4"
          >
            Book Now
          </button>
        </div>
      )}
    </div>
  );
}
