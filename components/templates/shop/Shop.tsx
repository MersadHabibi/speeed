"use client";

import { ShoppingCartIcon } from "@/components/modules/icons";
import { carStyles } from "@/data/carStyles";
import { GameStatusEnum } from "@/enums";
import { cn } from "@/lib/utils";
import { useMainStore } from "@/store/mainStore";
import { Button } from "@nextui-org/button";
import { memo, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";

import { Navigation } from "swiper/modules";
import CarStyleCard from "./CarStyleCard";
import { useCarStyleStore } from "./carStyleStore";
import { usePlayerCarStore } from "../playerCar/playerCarStore";

export default memo(function Shop() {
  const [prevGameStatus, setPrevGameStatus] = useState<GameStatusEnum>();

  const gameStatus = useMainStore((state) => state.gameStatus);
  const setGameStatus = useMainStore((state) => state.setGameStatus);

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
    <>
      <Button
        radius="full"
        variant="flat"
        isIconOnly
        className="z-10 !size-8 !min-w-0 rounded-md !bg-transparent !p-0 text-white md:!size-9"
        onClick={() => {
          if (gameStatus === GameStatusEnum.Shop) {
            setGameStatus(
              prevGameStatus ? prevGameStatus : GameStatusEnum.Started,
            );
          } else {
            setPrevGameStatus(gameStatus);
            setGameStatus(GameStatusEnum.Shop);
          }
        }}>
        <ShoppingCartIcon className="size-6 md:size-8" />
      </Button>
      <div
        className={cn(
          "invisible fixed inset-0 -z-10 flex h-full items-center justify-center bg-black/40 opacity-0 backdrop-blur-md",
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
    </>
  );
});
