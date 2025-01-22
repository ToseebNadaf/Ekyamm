"use client";

import * as React from "react";
import { X } from "lucide-react";

interface SheetProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

export function Sheet({ open, onClose, title, children }: SheetProps) {
  React.useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [open]);

  if (!open) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/25 z-50 backdrop-blur-sm"
        onClick={onClose}
      />
      <div
        className={`fixed left-0 right-0 bottom-0 z-50 transform transition-transform duration-300 ease-in-out bg-custom-gradient rounded-t-2xl max-h-[90vh] overflow-hidden ${
          open ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="flex items-center justify-center px-6 pt-6 pb-6">
          <h2 className="text-[16px] font-semibold text-gray-900">{title}</h2>
          <button
            onClick={onClose}
            className="absolute right-4 top-6 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="h-5 w-5 text-black" />
          </button>
        </div>
        <div className="overflow-auto px-6 pb-6">{children}</div>
      </div>
    </>
  );
}
