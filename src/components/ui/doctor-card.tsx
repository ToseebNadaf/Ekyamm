/* eslint-disable @next/next/no-img-element */
interface DoctorCardProps {
  name: string;
  specialty: string;
  fee: string;
  imageUrl: string;
  onBookNow: () => void;
}

export function DoctorCard({
  name,
  specialty,
  fee,
  imageUrl,
  onBookNow,
}: DoctorCardProps) {
  return (
    <div className="overflow-hidden rounded-[20px] bg-white p-4">
      <div className="aspect-square overflow-hidden rounded-[20px]">
        <img
          src={imageUrl || "/placeholder.svg"}
          alt={name}
          className="h-full w-full object-cover rounded-[20px]"
        />
      </div>
      <div className="mt-2 space-y-1 text-center">
        <h3 className="text-[14px] font-semibold leading-none text-[#262626]">
          {name}
        </h3>
        <p className="text-[12px] leading-normal text-[#7d7d7d]">{specialty}</p>
        <p className="text-[12px] leading-normal text-[#7d7d7d]">
          Session Fee: <span className="text-[#7d7d7d] font-bold">{fee}</span>
        </p>
      </div>
      <button
        onClick={onBookNow}
        className="mt-2 w-full rounded-[8px] bg-gradient-to-r from-[#BBA3E4] to-[#E7A1A0] py-3.5 text-[15px] font-medium text-white"
      >
        Book Now
      </button>
    </div>
  );
}
