"use client";

import { cn, rand } from "@/lib/utils";
import { useEffect, useState } from "react";
import { useOtherCarsStore } from "./otherCarsStore";
import { TCarPosition, TPosition } from "@/types";
import { useMainStore } from "@/stores/mainStore";
import { GameStatusEnum } from "@/enums";

type TOtherCar = { id: number; position: TCarPosition; speed: number };

export default function OtherCars() {
  const [cars, setCars] = useState<TOtherCar[]>([]);
  const [prevRandomNumber, setPrevRandomNumber] = useState<number>();

  const otherCarsPositions = useOtherCarsStore(
    (state) => state.otherCarsPositions,
  );
  const setOtherCarsPositions = useOtherCarsStore(
    (state) => state.setOtherCarsPositions,
  );

  const gameStatus = useMainStore((state) => state.gameStatus);
  const speed = useMainStore((state) => state.speed);
  const traffic = useMainStore((state) => state.traffic);

  useEffect(() => {
    if (gameStatus === GameStatusEnum.Started) {
      const addCarInterval = setInterval(() => {
        let speedNumber = rand(1, 3);

        console.log(speedNumber);

        const randomNumber =
          prevRandomNumber === 0
            ? rand(1, 2)
            : prevRandomNumber === 1
              ? rand(0, 2)
              : rand(0, 1);

        setPrevRandomNumber(randomNumber);

        setCars([
          ...cars,
          {
            id: cars.length + 1,
            position:
              randomNumber === 0
                ? "left"
                : randomNumber === 1
                  ? "center"
                  : "right",
            speed: speedNumber,
          },
        ]);
      }, traffic);

      return () => {
        clearInterval(addCarInterval);
      };
    }
  }, [
    cars,
    setCars,
    setPrevRandomNumber,
    prevRandomNumber,
    gameStatus,
    traffic,
  ]);

  useEffect(() => {
    if (gameStatus === GameStatusEnum.Started) {
      const setCarsPositions = setInterval(() => {
        let carsPositions: TPosition[] = [];

        cars.forEach((car) => {
          const carElement = document.querySelector(`.other-car-${car.id}`);
          carsPositions.push({
            top: carElement?.getBoundingClientRect().top as number,
            bottom: carElement?.getBoundingClientRect().bottom as number,
            left: carElement?.getBoundingClientRect().left as number,
            right: carElement?.getBoundingClientRect().right as number,
            width: carElement?.getBoundingClientRect().width as number,
            height: carElement?.getBoundingClientRect().height as number,
          });
        });

        setOtherCarsPositions(carsPositions);
      }, 50);

      return () => {
        clearInterval(setCarsPositions);
      };
    }
  }, [setOtherCarsPositions, cars, otherCarsPositions, gameStatus]);

  if (gameStatus === GameStatusEnum.notStarted) return null;

  return (
    <div className="absolute bottom-0 left-2 right-2 top-0 h-full">
      <div className="relative h-full">
        {cars.map((car) => {
          // console.log(car);
          return (
            <div
              key={car.id}
              className={cn(
                "absolute inset-0 flex h-full w-full pb-10 transition-all",
                car.position === "left" && "justify-start",
                car.position === "center" && "justify-center",
                car.position === "right" && "justify-end",
              )}>
              <div
                className={`other-car translate-y-[120%] px-5 transition-all`}
                style={{
                  animationDuration: speed / 7 + car.speed + "s",
                }}>
                <div
                  className={`other-car-${car.id} h-16 w-16 rounded-md bg-black transition-all`}></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
