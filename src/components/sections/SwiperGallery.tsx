import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import { FreeMode, Navigation, Thumbs } from "swiper";
import { Image } from "theme-ui";

export default function SwiperGallery({ slides }: { slides?: string[] }) {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);

  return (
    <div
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: "6px",
      }}
    >
      <Swiper
        sx={{
          "--swiper-navigation-color": "#fff",
          "--swiper-pagination-color": "#fff",
          height: [360, 360, 440, 600],
          width: "100%",
        }}
        spaceBetween={10}
        navigation={true}
        thumbs={{
          swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
        }}
        modules={[FreeMode, Navigation, Thumbs]}
      >
        {slides?.map((slide) => {
          return (
            <SwiperSlide key={slide}>
              <Image
                src={slide}
                sx={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
      {slides && slides?.length > 1 && (
        <Swiper
          onSwiper={setThumbsSwiper}
          spaceBetween={6}
          slidesPerView={6}
          freeMode={true}
          watchSlidesProgress={true}
          modules={[FreeMode, Navigation, Thumbs]}
          sx={{
            "--swiper-navigation-color": "#fff",
            "--swiper-pagination-color": "#fff",
            width: "100%",
          }}
          className="gigSwiperThumb"
        >
          {slides?.map((slide) => {
            return (
              <SwiperSlide key={slide}>
                <Image
                  src={slide}
                  sx={{
                    display: "block",
                    width: "100%",
                    objectFit: "cover",
                    height: 100,
                  }}
                />
              </SwiperSlide>
            );
          })}
        </Swiper>
      )}
      <style jsx global>{`
        .gigSwiperThumb .swiper-slide {
          opacity: 0.4;
          cursor: pointer;
        }
        .gigSwiperThumb .swiper-slide img {
          border-radius: 2px;
        }

        .gigSwiperThumb .swiper-slide-thumb-active {
          opacity: 1;
        }

        .swiper-slide {
          user-select: none;
        }
      `}</style>
    </div>
  );
}
