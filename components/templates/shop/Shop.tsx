"use client";

import { carStyles } from "@/data/carStyles";
import { GameStatusEnum } from "@/enums";
import { cn } from "@/lib/utils";
import { useMainStore } from "@/store/mainStore";
import { memo, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";

import { Navigation } from "swiper/modules";
import { usePlayerCarStore } from "../playerCar/playerCarStore";
import CarStyleCard from "./CarStyleCard";
import { useCarStyleStore } from "./carStyleStore";

export default memo(function Shop() {
  const gameStatus = useMainStore((state) => state.gameStatus);

  const getPurchasedCarStylesFromLocalStorage = useCarStyleStore(
    (state) => state.getPurchasedCarStylesFromLocalStorage,
  );

  const getPlayerCarStyleFromLocalStorage = usePlayerCarStore(
    (state) => state.getPlayerCarStyleFromLocalStorage,
  );

  useEffect(() => {
    getPurchasedCarStylesFromLocalStorage();
    getPlayerCarStyleFromLocalStorage();
  }, [
    getPurchasedCarStylesFromLocalStorage,
    getPlayerCarStyleFromLocalStorage,
  ]);

  return (
    <div
      className={cn(
        "invisible fixed inset-0 z-10 flex h-full items-center justify-center bg-black/40 opacity-0 backdrop-blur-md",
        gameStatus === GameStatusEnum.Shop && "visible opacity-100",
      )}>
      <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
        {carStyles.map((carStyle) => (
          <SwiperSlide
            key={carStyle.id}
            className="!flex items-center justify-center">
            <CarStyleCard carStyle={carStyle} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
});
