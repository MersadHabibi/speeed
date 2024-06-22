"use client";

import Car from "@/components/modules/Car";
import { GameStatusEnum } from "@/enums";
import { cn } from "@/lib/utils";
import { useMainStore } from "@/store/mainStore";
import { memo } from "react";
import { useOtherCarsStore } from "./otherCarsStore";
import useLoadOtherCars from "./useLoadOtherCars";
import useSetOtherCarsInStore from "./useSetOtherCarsInStore";

export default memo(function OtherCars() {
  const otherCars = useOtherCarsStore((state) => state.otherCars);

  const gameStatus = useMainStore((state) => state.gameStatus);
  const speed = useMainStore((state) => state.speed);

  // add other cars
  useLoadOtherCars();

  // set cars positions in store
  useSetOtherCarsInStore();

  if (gameStatus === GameStatusEnum.NotStarted) return null;

  return (
    <div className="absolute bottom-0 left-2 right-2 top-0 h-full">
      <div className="relative h-full">
        {otherCars?.map((car) => {
          // console.log(car);
          return (
            <div
              key={car.id}
              className={cn(
                "absolute inset-0 flex h-full w-full pb-10 transition-all",
                car.line === "left" && "justify-start",
                car.line === "center" && "justify-center",
                car.line === "right" && "justify-end",
              )}>
              <div
                className={`other-car w-4/12 translate-y-[120%] px-4 transition-all`}
                // style={{
                //   animationDuration: speed / 7 + car.speed + "s",
                // }}
                onAnimationStart={(event) => {
                  event.currentTarget.style.animationDuration =
                    speed / 10 + car.speed + "s";
                }}>
                <Car
                  carStyle={car.carStyle}
                  className={`other-car-${car.id}`}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
});
