import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

// Import Images
import about1 from "../assets/about1.jpg";
import about2 from "../assets/about2.jpg";
import about3 from "../assets/about3.jpg";
import about4 from "../assets/about4.jpg";

const About = () => {
  const slides = [
    { id: 1, image: about1, title: "Who We Are", text: "We are a team of passionate event planners, dedicated to crafting memorable experiences that last a lifetime." },
    { id: 2, image: about2, title: "Our Vision", text: "To transform your ideas into stunning events that captivate and inspire." },
    { id: 3, image: about3, title: "Our Services", text: "From corporate events to weddings, we handle every detail with creativity and professionalism." },
    { id: 4, image: about4, title: "Why Choose Us?", text: "With years of expertise and a dedicated team, we guarantee a seamless event experience." },
  ];

  return (
    <>
    <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-8 text-yellow-500 underline" id="about">About us</h2>
      <div className="w-full rounded-md overflow-auto">
      <Swiper
        spaceBetween={50}
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        // pagination={{ clickable: true }}
        modules={[Autoplay, Pagination]}
        className="w-full"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative w-full">
              {/* Image */}
              <img src={slide.image} alt={`About ${slide.id}`} className="w-full md:hidden h-[60vh] object-cover rounded-lg shadow-lg" />

              {/* Overlay with text (Only in small screens) */}
              <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-center px-4 md:hidden">
                <h2 className="text-white text-3xl font-bold">{slide.title}</h2>
                <p className="mt-2 text-white text-lg">{slide.text}</p>
              </div>

              {/* Side text (For larger screens) */}
              <div className="hidden md:flex items-center gap-8">
                <div className="w-1/2">
                  <h2 className="text-3xl md:text-5xl font-bold text-gray-800">{slide.title}</h2>
                  <p className="mt-4 text-gray-600 text-lg">{slide.text}</p>
                </div>
                <div className="w-1/2">
                  <img src={slide.image} alt={`About ${slide.id}`} className="w-full rounded-lg shadow-lg" />
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
    </>
  );
};

export default About;
