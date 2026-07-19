"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import AppointmentForm from "./AppointmentForm";

export default function AppointmentModal({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const modalContent = (
    <div 
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm transition-opacity" 
      onClick={() => setIsOpen(false)}
    >
      <div 
        className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden relative animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
        style={{ border: "1px solid #E8E8E8" }}
      >
        <div className="flex justify-between items-center p-5 border-b border-gray-100 bg-gray-50/50">
          <h3 className="font-heading text-lg font-bold text-gray-900">
            Book an Appointment
          </h3>
          <button 
            type="button" 
            onClick={() => setIsOpen(false)} 
            className="text-gray-400 hover:text-gray-700 transition-colors p-1"
            aria-label="Close"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        <div>
          <AppointmentForm isModal={true} />
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div onClick={(e) => { e.preventDefault(); setIsOpen(true); }} className="cursor-pointer inline-block">
        {children}
      </div>
      {isOpen && mounted && createPortal(modalContent, document.body)}
    </>
  );
}
