'use client';
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

export default function Slider() {
  const { theme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const slides = [
    {
      lightImage: "/assets/banner1.jpg",
      darkImage: "/assets/darkbanner1.jpg",
    },
    {
      lightImage: "/assets/banner2.jpg",
      darkImage: "/assets/darkbanner2.jpg",
    },
    {
      lightImage: "/assets/banner3.jpg",
      darkImage: "/assets/darkbanner3.jpg",
    },
    {
      lightImage: "/assets/banner4.jpg",
      darkImage: "/assets/darkbanner4.jpg",
    },
  ];

  if (!isMounted) {
    return null;
  }

  return (
    <div className="w-full py-8">
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        spaceBetween={30}
        slidesPerView={1}
        autoplay={{ delay: 3000 }}
        pagination={{ clickable: true }}
        navigation
        loop={true}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-64 md:h-96 rounded-lg overflow-hidden">
              <img
                src={theme === "dark" ? slide.darkImage : slide.lightImage}
                alt={`Slide ${index + 1}`}
                className="w-full h-full object-cover transition-opacity duration-500"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white p-4">
                
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
