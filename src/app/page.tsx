"use client";

import { useState } from "react";
import { DoctorCard } from "@/components/ui/doctor-card";
import { DoctorListItem } from "@/components/ui/doctor-list-item";
import { BookingForm } from "@/components/booking-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ChevronLeft,
  Search,
  SlidersHorizontal,
  LayoutGrid,
  List,
} from "lucide-react";

const MOCK_DOCTORS = [
  {
    id: 1,
    name: "Dr. Tejas Sharma",
    specialty: "Gynaecology",
    fee: "₹1,500/-",
    phone: "+91 98765 43210",
    imageUrl:
      "https://s3-alpha-sig.figma.com/img/1c4d/7c45/0fe6f87425abbc6c055967b55b1d6689?Expires=1738540800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=HwonJH5UQz9Ajv~2ZRceA6MqajIcw0jyPlylrj2kqkv2oi5z1h7W0RF9l3BYmRjFGkqgy3WlIs9lkHsYck-bDRsOKpCHMbN0FphibE2RjhmTwoaRSZ1316V4obGKbRpIUgXBJd3t~HDDDDq2SZ~ATpHX4p3BpI5uGQbTIjDP5~o4WMnwBmeudg4L2M5dw1foyz1Mlk1CVciR~LuAzodvjqUdB-QZxTIUthtpugAdDLcuHbnE59d0b9Vwg13ffsuCQOrUFy614SONhm6Em4hBdIKqvnjDlqiocmsVAQk-zsLq7gpwTco2ZmaPw-t0LD0IVijkCwQoFMkyqwkaPTHPiA__",
  },
  {
    id: 2,
    name: "Dr. Priya Kapoor",
    specialty: "Gynaecology",
    fee: "₹1,000/-",
    phone: "+91 98765 43210",
    imageUrl:
      "https://s3-alpha-sig.figma.com/img/8839/7fc4/bbfeae764f62321f13021d7edeae1f6d?Expires=1738540800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=mwrXHfqhCrgKVmlkgnXrz-35TixHQCwTyovHEd1FoFRdPuO9~MQNdd8kR~PzCcHXZxSJtLyspapfEIdyiL7AOfFqg-hccQT-JG-MZTSDxzIwoGlmtwdwm1f5TvnM6VvY19RX33Gk6dHV3p1F0eFeORt9jpARzKJZqfBFcynzLadiJXlJqVLg7bx4j1nVlHYlyhe60WDVvK7gciyHe3~HnlzQm9wFA9K9oF58k1UqkO6tQ-MydvkngBk71cgJKuKYEaOkhPZ02SkZWmQjmxYhb0UVUvbGg3RgOdGJ9ikznljfdURMTcudvfotjzDb5S4bEvElsMzIYGk3-WuuMFTAqA__",
  },
  {
    id: 3,
    name: "Dr. Pranav Saxena",
    specialty: "Gynaecology",
    fee: "₹2,500/-",
    phone: "+91 98765 43210",
    imageUrl:
      "https://s3-alpha-sig.figma.com/img/395d/ee16/580ee3379c0714fd58e1990e8c73f4b5?Expires=1738540800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=V6ZmIkdsVzJnDqLZyTg5QmyDIpDA0px1jcURangJGMdAAkNUheFVVVOTfC5FA-b8Fm-JluwQilcbekU1npXehpCO0EE5DNUfCbfZ3-yHkkXSKlODVJ3tfLSBV1B5kRVEEGcHB2tPqQ6fYd5B5k778iyUaFBpXwuJgO0jO3vgCMTJmhXirKWmLU1t8FH9xvMB4Dv5qqFr9dsRPah~iE-tInKtCysYxszsMUkurCc2xAPO2K0pwo8i9dU-XRq8r2h~aZ1T79wUbbr9nKbw7KFzh8jkeK-2VNnQOEvE5LsFWlQfQ0psF8yZ5dcFO-E8W6FJOpdnLx2HnPN3kCkMTvY~eQ__",
  },
  {
    id: 4,
    name: "Dr. Toshib Bagde",
    specialty: "Gynaecology",
    fee: "₹3,500/-",
    phone: "+91 98765 43210",
    imageUrl:
      "https://s3-alpha-sig.figma.com/img/dab7/9c93/0dfc2d8859b84bb69d922fd7d106e1b2?Expires=1738540800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=AHLl38BBZ1jncVELdOyVquurn1kxbB4xLVTq8zogRSibiqyP3Lm4eYPHlxqTRCLL1yECmtw7rvGKP9WZA7X9PWyTyDT~zf0Grjv4W-XiQqs1CADMN5RaHsQ-Gqak-nJtoKia-qMp1HJHOnAxIKEMbuvPNLi22EaeQKQeJwltvcMknXbysGZI5WiZfUi29utrJ-8SFJoMkGjvdqwDXs5tBQaC4Xvp8wBhynpEihTJzQpa7KUkCV487Ye2VgfVi98hO0Le7-HIQycxUKYJt4zalJCdKLJm9aB-6b7BiNiycA08xSlCJa2GfJXTTuC0zYlzpGZsZCCZgfdwfFb-GIAI5w__",
  },
];

export default function Home() {
  const [view, setView] = useState<"grid" | "list" | "booking">("grid");
  const [selectedDoctor, setSelectedDoctor] = useState<
    (typeof MOCK_DOCTORS)[0] | null
  >(null);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gradientTop to-gradientBottom">
      <header className="sticky top-0 z-10 bg-white px-4 py-3">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setView(view === "booking" ? "grid" : "grid")}
            className="text-[#262626]"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-sm font-semibold text-[#262626]">
            {view === "booking"
              ? "Schedule Session"
              : "Available Psychologists"}
          </h1>
        </div>

        {view !== "booking" && (
          <div className="mt-4 flex items-center gap-3">
            <div className="relative flex-1">
              <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#7d7d7d]" />
              <Input
                placeholder="Search Psychologists..."
                className="h-10 rounded-[10px] border-[#d9d9d9] bg-white text-[14px] placeholder:text-[#9b9b9b]"
              />
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setView(view === "grid" ? "list" : "grid")}
              className="h-10 w-10 rounded-[10px] border-[#d9d9d9]"
            >
              {view === "grid" ? (
                <List className="h-5 w-5 text-[#262626]" />
              ) : (
                <LayoutGrid className="h-5 w-5 text-[#262626]" />
              )}
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-10 w-10 rounded-[10px] border-[#d9d9d9]"
            >
              <SlidersHorizontal className="h-5 w-5 text-[#262626]" />
            </Button>
          </div>
        )}
      </header>

      <main className="p-4">
        {view === "booking" && selectedDoctor ? (
          <BookingForm
            patientName="Shubham Naik"
            patientPhone="+91 98765 43210"
            doctorName={selectedDoctor.name}
            doctorPhone={selectedDoctor.phone}
            onCancel={() => {
              setView("grid");
              setSelectedDoctor(null);
            }}
            onConfirm={(data) => {
              console.log("Booking confirmed:", data);
              setView("grid");
              setSelectedDoctor(null);
            }}
          />
        ) : view === "grid" ? (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {MOCK_DOCTORS.map((doctor) => (
              <DoctorCard
                key={doctor.id}
                {...doctor}
                onBookNow={() => {
                  setSelectedDoctor(doctor);
                  setView("booking");
                }}
              />
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {MOCK_DOCTORS.map((doctor) => (
              <DoctorListItem
                key={doctor.id}
                {...doctor}
                onBookNow={() => {
                  setSelectedDoctor(doctor);
                  setView("booking");
                }}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
