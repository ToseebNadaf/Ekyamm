/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SessionScheduler } from "./session-scheduler";

interface BookingFormProps {
  patientName: string;
  patientPhone: string;
  doctorName: string;
  doctorPhone: string;
  onCancel: () => void;
  onConfirm: (data: unknown) => void;
}

export function BookingForm({
  patientName,
  patientPhone,
  doctorName,
  doctorPhone,
  onCancel,
  onConfirm,
}: BookingFormProps) {
  const [sessionType, setSessionType] = useState("counselling");
  const [sessionMode, setSessionMode] = useState("in-person");
  const [date, setDate] = useState<Date>();
  const [sessionTime, setSessionTime] = useState("");
  const [sessionDetails, setSessionDetails] = useState("");
  const [onlineLink, setOnlineLink] = useState("");

  const handleSchedulerChange = (data: {
    date: Date | undefined;
    sessionTime: string;
  }) => {
    setDate(data.date);
    setSessionTime(data.sessionTime);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="space-y-6">
        <div>
          <h3 className="mb-2 text-sm font-medium text-gray-500">Patient</h3>
          <div className="rounded-[12px] bg-white bg-opacity-80 p-3 shadow-sm">
            <div className="flex items-center gap-3">
              <img
                src="https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                alt=""
                className="h-10 w-10 rounded-full"
              />
              <div>
                <p className="text-[14px] font-semibold text-gray-900">
                  {patientName}
                </p>
                <p className="text-[11px] font-medium text-gray-500">
                  {patientPhone}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h3 className="mb-2 text-sm font-medium text-gray-500">
            Assign Practitioner
          </h3>
          <div className="rounded-[12px] bg-white p-3 shadow-sm">
            <div className="flex items-center gap-3">
              <img
                src="https://png.pngtree.com/png-vector/20230928/ourmid/pngtree-young-indian-man-png-image_10149659.png"
                alt=""
                className="h-10 w-10 rounded-full"
              />
              <div>
                <p className="text-[14px] font-semibold text-gray-900">
                  {doctorName}
                </p>
                <p className="text-[11px] font-medium text-gray-500">
                  {doctorPhone}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h3 className="mb-2 text-sm font-medium text-gray-500">
            Session Type
          </h3>
          <Select value={sessionType} onValueChange={setSessionType}>
            <SelectTrigger className="w-full rounded-[7.26px] bg-white">
              <SelectValue placeholder="Select session type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="intro">
                Intro (15 mins - Free Session)
              </SelectItem>
              <SelectItem value="counselling">
                Counselling (15 mins - Free Session)
              </SelectItem>
              <SelectItem value="renewal">Renewal of Prescription</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <h3 className="mb-2 text-sm font-medium text-gray-500">
            Session Mode
          </h3>
          <RadioGroup
            value={sessionMode}
            onValueChange={setSessionMode}
            className="flex gap-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="in-person" id="in-person" />
              <Label htmlFor="in-person">In-Person</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="online" id="online" />
              <Label htmlFor="online">Online</Label>
            </div>
          </RadioGroup>
        </div>

        <div>
          <SessionScheduler onChange={handleSchedulerChange} />
        </div>

        {sessionMode === "online" && (
          <div>
            <h3 className="mb-2 text-sm font-medium text-gray-500">
              Online Session Link
            </h3>
            <Input
              value={onlineLink}
              onChange={(e) => setOnlineLink(e.target.value)}
              placeholder="Add Online Session Link or WhatsApp Number"
              className="rounded-[7.26px] bg-white text-[12px] font-medium"
            />
          </div>
        )}

        <div>
          <h3 className="mb-2 text-sm font-medium text-gray-500">
            Session Details (Optional)
          </h3>
          <textarea
            value={sessionDetails}
            onChange={(e) => setSessionDetails(e.target.value)}
            className="w-full rounded-[7.26px] border-gray-200 bg-white focus:border-[#E17CFD] focus:ring-[#E17CFD] p-3 text-[12px] font-medium"
            rows={4}
            placeholder="Enter session details here"
          />
        </div>

        <div className="flex gap-4">
          <Button
            variant="outline"
            onClick={onCancel}
            className="flex-1 rounded-[8px] border-[#CC627B] bg-[#FFE5EB]/50 hover:bg-white text-[14px] font-medium text-[#CC627B]"
          >
            Cancel
          </Button>
          <Button
            onClick={() =>
              onConfirm({
                sessionType,
                sessionMode,
                date,
                sessionTime,
                onlineLink,
                sessionDetails,
              })
            }
            className="flex-1 rounded-[8px] bg-gradient-to-r from-[#BBA3E4] to-[#E7A1A0] text-white hover:opacity-90 text-[14px] font-medium"
          >
            Confirm
          </Button>
        </div>
      </div>
    </div>
  );
}
