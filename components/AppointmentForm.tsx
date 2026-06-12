"use client";

import { useState } from "react";
import { doctors } from "@/data/doctors";

export default function AppointmentForm({ isModal = false }: { isModal?: boolean }) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    doctor: "",
    date: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [success, setSuccess] = useState(false);

  const today = new Date().toISOString().split("T")[0];

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!/^\d{10}$/.test(formData.phone))
      newErrors.phone = "Phone must be exactly 10 digits";
    if (!formData.doctor) newErrors.doctor = "Please select a doctor";
    if (!formData.date) newErrors.date = "Please select a date";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const message = `New Appointment%0AName: ${formData.name}%0APhone: ${formData.phone}%0ADoctor: ${formData.doctor}%0ADate: ${formData.date}%0AMessage: ${formData.message || "N/A"}`;

    window.open(
      `https://wa.me/919792133555?text=${message}`,
      "_blank"
    );

    setSuccess(true);
    setFormData({ name: "", phone: "", doctor: "", date: "", message: "" });
    setErrors({});

    setTimeout(() => {
      setSuccess(false);
    }, 5000);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={isModal ? "p-5 md:p-6 space-y-4" : "bg-white p-6 md:p-8 rounded-[20px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[#E8E8E8] h-full flex flex-col justify-center"}
    >
      {!isModal && (
        <h3 className="font-heading" style={{ fontSize: "20px", fontWeight: 600, color: "#1A1A1A", marginBottom: "24px" }}>
          Book an Appointment
        </h3>
      )}

      {success && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm font-medium mb-4">
          ✓ Redirecting to WhatsApp...
        </div>
      )}

      <div className={isModal ? "grid grid-cols-1 md:grid-cols-2 gap-4" : "space-y-4"}>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Full Name
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple/30 focus:border-purple transition-all"
            placeholder="John Doe"
          />
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
        </div>

        <div className={!isModal ? "mt-4" : ""}>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Phone Number
          </label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple/30 focus:border-purple transition-all"
            placeholder="10-digit number"
          />
          {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
        </div>
      </div>

      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          Select Doctor
        </label>
        <select
          value={formData.doctor}
          onChange={(e) => setFormData({ ...formData, doctor: e.target.value })}
          className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple/30 focus:border-purple transition-all bg-white"
        >
          <option value="" disabled>Select a doctor...</option>
          {doctors.map((d) => (
            <option key={d.id} value={d.name}>
              {d.name} — {d.speciality}
            </option>
          ))}
        </select>
        {errors.doctor && <p className="text-red-500 text-xs mt-1">{errors.doctor}</p>}
      </div>

      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          Preferred Date
        </label>
        <input
          type="date"
          value={formData.date}
          min={today}
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple/30 focus:border-purple transition-all"
        />
        {errors.date && <p className="text-red-500 text-xs mt-1">{errors.date}</p>}
      </div>

      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          Message <span className="font-normal text-gray-400">(optional)</span>
        </label>
        <textarea
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          rows={isModal ? 2 : 3}
          className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple/30 focus:border-purple transition-all resize-none"
          placeholder="Any specific concern or message"
        />
      </div>

      <div className="flex flex-col mt-4">
        <button
          type="submit"
          className={`w-full text-white rounded-lg font-semibold text-sm transition-all hover:opacity-90 ${isModal ? "py-3" : "py-4"}`}
          style={{ background: "#16A34A", boxShadow: "0 4px 14px rgba(22, 163, 74, 0.25)" }}
        >
          Send via WhatsApp
        </button>

        <div className="relative flex items-center gap-4 my-1">
          <div className="flex-grow border-t border-gray-100"></div>
          <span className="text-[10px] font-bold text-gray-300 uppercase tracking-widest">Or</span>
          <div className="flex-grow border-t border-gray-100"></div>
        </div>

        <a
          href="tel:+919792133555"
          className={`w-full flex items-center justify-center gap-2 border-2 border-[#16A34A] text-[#16A34A] rounded-lg font-bold text-sm transition-all hover:bg-green-50 ${isModal ? "py-2.5" : "py-3.5"}`}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.81 12.81 0 0 0 .62 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.62A2 2 0 0 1 22 16.92z" />
          </svg>
          Directly Call Us
        </a>
      </div>
    </form>
  );
}
