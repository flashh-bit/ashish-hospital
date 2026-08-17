"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination, Navigation, Autoplay } from "swiper/modules";
import Image from "next/image";
import { useEffect, useState } from "react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";

type GalleryItem = { filename?: string; url?: string; title: string; uploadedAt: string };

export default function GalleryCarousel({ gallery: initialGallery }: { gallery?: GalleryItem[] }) {
  const [gallery, setGallery] = useState<GalleryItem[]>(initialGallery || []);

  useEffect(() => {
    fetch(`/api/gallery?t=${Date.now()}`)
      .then((res) => res.json())
      .then((data) => {
        if (data && data.length > 0) {
          setGallery(data);
        }
      })
      .catch(console.error);
  }, []);

  if (!gallery || gallery.length === 0) {
    return (
      <div className="text-center" style={{ padding: "60px 0" }}>
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" className="mx-auto" style={{ marginBottom: "16px" }}>
          <path d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" stroke="#888888" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="12" cy="13" r="3" stroke="#888888" strokeWidth="1.5" />
        </svg>
        <p style={{ fontSize: "18px", color: "#888888" }}>Loading gallery...</p>
      </div>
    );
  }

  return (
    <div className="w-full relative gallery-slider-container px-4 md:px-0">
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        loop={gallery.length >= 3}
        slidesPerView={"auto"}
        coverflowEffect={{
          rotate: 30, // Angle of rotation
          stretch: 0, // Space between slides
          depth: 150, // Depth offset
          modifier: 1, // Effect multiplier
          slideShadows: true,
        }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true, dynamicBullets: true }}
        navigation={true}
        modules={[EffectCoverflow, Pagination, Navigation, Autoplay]}
        className="w-full h-[370px] md:h-[520px]"
        style={{ paddingBottom: "50px", paddingTop: "20px" }} // Space for pagination
      >
        {gallery.map((item, index) => (
          <SwiperSlide 
            key={index} 
            className="w-[70vw] sm:w-[400px] md:w-[600px] h-[300px] md:h-[450px] relative rounded-2xl overflow-hidden shadow-2xl transition-transform"
          >
            <Image
              src={item.url || `/gallery/${item.filename}`}
              alt={item.title || `Gallery Image ${index}`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 70vw, (max-width: 1200px) 50vw, 33vw"
              priority={index === 0}
            />
            {/* Title Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end justify-center pb-6 md:pb-8 px-4">
              <h3 className="text-white text-lg md:text-2xl font-bold text-center tracking-wide drop-shadow-md font-heading">
                {item.title || "Ashish Hospital Gallery"}
              </h3>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      
    </div>
  );
}
