import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

// Import Images
import banner1 from "../assets/banner.jpg";
import banner2 from "../assets/banner1.jpg";
import banner3 from "../assets/banner2.jpg";
import banner4 from "../assets/banner3.jpg";
import banner5 from "../assets/banner4.jpg";

const Banner = () => {
  const slides = [
    { id: 1, image: banner1, text: "Unforgettable Events, Seamlessly Planned" },
    { id: 2, image: banner2, text: "Make Memories That Last a Lifetime" },
    { id: 3, image: banner3, text: "Elegant & Exquisite Event Planning" },
    { id: 4, image: banner4, text: "Turning Your Vision Into Reality" },
    { id: 5, image: banner5, text: "Your Dream Event, Our Passion" },
  ];

  return (
    <div className="w-full h-[90vh] z-0">
      <Swiper
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        modules={[Autoplay, Pagination]}
        className="w-full h-full"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id} className="relative">
            <img
              src={slide.image}
              alt={`Banner ${slide.id}`}
              className="w-full h-[90vh] object-cover"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <h2 className="text-white text-3xl md:text-5xl font-bold p-2 text-center max-w-2xl">
                {slide.text}
              </h2>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;
