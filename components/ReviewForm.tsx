"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";

export default function ReviewForm() {
  const [name, setName] = useState("");
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [text, setText] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [success, setSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!name.trim()) newErrors.name = "Name is required";
    if (rating < 1 || rating > 5)
      newErrors.rating = "Please select a star rating";
    if (text.trim().length < 20)
      newErrors.text = "Review must be at least 20 characters";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    try {
      const res = await fetch("/api/submit-review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          rating,
          text,
          date: new Date().toISOString(),
        }),
      });

      if (res.ok) {
        setSuccess(true);
        setName("");
        setRating(0);
        setText("");
        setErrors({});
        setTimeout(() => setSuccess(false), 5000);
      }
    } catch {
      setErrors({ submit: "Something went wrong. Please try again." });
    } finally {
      setSubmitting(false);
    }
  };

  const modalContent = (
    <div 
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm transition-opacity" 
      onClick={() => setIsOpen(false)}
    >
      <div 
        className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden relative animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
        style={{ 
          border: "1px solid #E8E8E8", 
        }}
      >
        {/* Modal Header */}
        <div className="flex justify-between items-center p-5 border-b border-gray-100 bg-gray-50/50">
          <h3 className="font-heading text-lg font-bold text-gray-900">
            Write a Review
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

        <form
          onSubmit={handleSubmit}
          className="p-5 md:p-6 space-y-5"
          id="review-form"
        >
          {success && (
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm font-medium">
              ✓ Thank you for your review!
            </div>
          )}

          {errors.submit && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
              {errors.submit}
            </div>
          )}

          {/* Patient Name */}
          <div className={success || errors.submit ? "mt-2" : "mt-0"}>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Your Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple/30 focus:border-purple transition-all"
              placeholder="Enter your name"
              id="input-review-name"
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name}</p>
            )}
          </div>

          {/* Star Rating */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Rating
            </label>
            <div className="star-rating flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className={`text-3xl transition-colors ${
                    star <= (hoverRating || rating)
                      ? "text-yellow-400"
                      : "text-gray-200"
                  }`}
                  aria-label={`Rate ${star} star${star > 1 ? "s" : ""}`}
                >
                  ★
                </button>
              ))}
            </div>
            {errors.rating && (
              <p className="text-red-500 text-xs mt-1">{errors.rating}</p>
            )}
          </div>

          {/* Review Text */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Your Review
            </label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={4}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple/30 focus:border-purple transition-all resize-none"
              placeholder="Share your experience (minimum 20 characters)"
              id="input-review-text"
            />
            <div className="flex justify-between items-center mt-1">
              {errors.text ? (
                <p className="text-red-500 text-xs">{errors.text}</p>
              ) : (
                <span />
              )}
              <span
                className={`text-xs ${
                  text.length >= 20 ? "text-green-600" : "text-gray-400"
                }`}
              >
                {text.length}/20
              </span>
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full text-white py-3 rounded-lg font-semibold text-sm disabled:opacity-60 transition-colors mt-2"
            style={{ background: "#16A34A" }}
            id="btn-submit-review"
          >
            {submitting ? "Submitting..." : "Submit Review"}
          </button>
        </form>
      </div>
    </div>
  );

  return (
    <>
      <button 
        type="button"
        onClick={() => setIsOpen(true)} 
        className="flex items-center gap-1.5 px-3 py-1.5 sm:px-6 sm:py-3 rounded-full text-white font-medium transition-all hover:-translate-y-0.5 active:translate-y-0 shadow-md hover:shadow-lg text-[10px] sm:text-base whitespace-nowrap flex-shrink-0"
        style={{ background: "linear-gradient(135deg, #16A34A 0%, #15803D 100%)" }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="sm:w-[18px] sm:h-[18px]">
          <path d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5l13.732-13.732z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        Write a Review
      </button>

      {isOpen && mounted && createPortal(modalContent, document.body)}
    </>
  );
}
