"use client";

import { carStyles } from "@/data/carStyles";
import { GameStatusEnum } from "@/enums";
import { cn } from "@/lib/utils";
import { useMainStore } from "@/store/mainStore";
import { memo, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";

import { Navigation } from "swiper/modules";
import { usePlayerCarStore } from "../playerCar/playerCarStore";
import CarStyleCard from "./CarStyleCard";
import { useCarStyleStore } from "./carStyleStore";
import { Button } from "@nextui-org/button";
import { CarFrontIcon, FuelIcon } from "@/components/modules/icons";
import FuelCard from "./FuelCard";
import { fuelItems } from "@/data/fuelItems";

export default memo(function Shop() {
  const [shop, setShop] = useState<"carStyle" | "fuel">("carStyle");
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
        "invisible fixed inset-0 z-10 flex h-full bg-black/40 opacity-0 backdrop-blur-md",
        gameStatus === GameStatusEnum.Shop && "visible opacity-100",
      )}>
      <div className="relative flex size-full items-center justify-center">
        <div className="absolute left-0 right-0 top-24 flex items-center justify-center gap-x-2 self-start">
          <Button
            isIconOnly
            variant="solid"
            className={cn(
              "border-2 border-white bg-neutral-800 text-white",
              shop === "fuel" && "bg-neutral-700",
            )}
            onClick={() => setShop("fuel")}>
            <FuelIcon className="size-5" />
          </Button>
          <Button
            isIconOnly
            variant="solid"
            className={cn(
              "border-2 border-white bg-neutral-800 text-white",
              shop === "carStyle" && "bg-neutral-700",
            )}
            onClick={() => setShop("carStyle")}>
            <CarFrontIcon className="size-5" />
          </Button>
        </div>
        <div className="grid">
          {shop === "carStyle" ? (
            <Swiper
              navigation={true}
              modules={[Navigation]}
              className="mySwiper w-full">
              {carStyles.map((carStyle) => (
                <SwiperSlide
                  key={carStyle.id}
                  className="!flex items-center justify-center">
                  <CarStyleCard carStyle={carStyle} />
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <Swiper
              navigation={true}
              modules={[Navigation]}
              className="mySwiper w-full">
              {fuelItems.map((fuelItem) => (
                <SwiperSlide
                  key={fuelItem.id}
                  className="!flex items-center justify-center">
                  <FuelCard fuelItem={fuelItem} />
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>
      </div>
    </div>
  );
});
