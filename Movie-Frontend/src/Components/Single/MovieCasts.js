import React from "react";
import { FaUserFriends } from "react-icons/fa";
import { Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import Title from "./../Title";
import { UsersData } from "../../Data/UsersData";

export default function MovieCasts({ movie }) {
  //  console.log("check movie", movie);
  const castLength = movie?.casts?.length;
  // console.log("check length", castLength);
  

  return (
    movie?.casts?.length > 0 && (
      <div className="my-12 ">
        <Title title="Cast" Icon={FaUserFriends} />
        <div className="mt-10">
          <Swiper
            autoplay={{
              delay: 1000,
              disableOnInteraction: false,
            }}
            loop={true}
            speed={1000}
            modules={[Autoplay]}
            spaceBetween={10}
            breakpoints={{
              0: {
                slidesPerView: 1,
              },
              400: {
                slidesPerView: 2,
              },
              768: {
                slidesPerView: 3,
              },
              1024: {
                slidesPerView: movie?.casts?.length,
              },
              1280: {
                slidesPerView: movie?.casts?.length,
                spaceBetween: 30,
              },
            }}
          >
            {movie?.casts?.map((cast) => (
              <SwiperSlide key={cast?._id}>
                <div className="w-full p-3 italic text-xs text-text rounded flex-colo bg-dry border-gray-800">
                  <img
                    src={cast?.image ? cast?.image : "/images/user.png"}
                    alt={cast?.name}
                    className="w-full h-64 object-scale-down rounded mb-4"
                  />
                  <p>{cast?.name}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    )
  );
}
