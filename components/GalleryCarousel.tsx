"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination, Navigation, Autoplay } from "swiper/modules";
import Image from "next/image";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";

type GalleryItem = { filename: string; title: string; uploadedAt: string };

export default function GalleryCarousel({ gallery }: { gallery: GalleryItem[] }) {
  if (!gallery || gallery.length === 0) return null;

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
              src={`/gallery/${item.filename}`}
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
