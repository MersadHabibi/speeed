"use client";

import { GameStatusEnum } from "@/enums";
import { cn, rand } from "@/lib/utils";
import { useMainStore } from "@/stores/mainStore";
import { TOtherCar } from "@/types";
import { useEffect, useState } from "react";
import { useOtherCarsStore } from "./otherCarsStore";

export default function OtherCars() {
  const [prevRandomNumber, setPrevRandomNumber] = useState<number>();

  const otherCars = useOtherCarsStore((state) => state.otherCars);
  const setOtherCars = useOtherCarsStore((state) => state.setOtherCars);

  const gameStatus = useMainStore((state) => state.gameStatus);
  const speed = useMainStore((state) => state.speed);
  const traffic = useMainStore((state) => state.traffic);

  // add other cars
  useEffect(() => {
    if (gameStatus === GameStatusEnum.Started) {
      const addCarInterval = setInterval(() => {
        let rnd = rand(0, 2);
        let speedNumber = rand(1, 3);

        const randomNumber =
          prevRandomNumber === 0
            ? rand(1, 2)
            : prevRandomNumber === 1
              ? rnd === 1
                ? rand(0, 2)
                : rnd
              : rand(0, 1);

        setPrevRandomNumber(randomNumber);

        setOtherCars([
          ...(otherCars as TOtherCar[]),
          {
            id: otherCars?.length ? otherCars.length + 1 : 1,
            position: undefined,
            line:
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
    setPrevRandomNumber,
    prevRandomNumber,
    gameStatus,
    traffic,
    otherCars,
    setOtherCars,
  ]);

  // set cars positions in store AND change cars speed when they reach behind car
  useEffect(() => {
    // change cars speed when they reach behind car
    // const changeCarsSpeedWhenReachBehindCar = () => {
    //   const otherCarsByLine = Object.groupBy(
    //     otherCars || [],
    //     ({ line }) => line,
    //   );

    //   // console.log(otherCarsByLine);

    //   for (const line in otherCarsByLine) {
    //     // @ts-expect-error
    //     const lineCars = otherCarsByLine[line] as unknown as TOtherCar[];

    //     lineCars.map((car, index) => {
    //       const behindCar = lineCars[index - 1];

    //       // console.log(
    //       //   "behind =>",
    //       //   behindCar,
    //       //   " lineCars =>",
    //       //   lineCars,
    //       //   " car => ",
    //       //   car,
    //       //   "index => ",
    //       //   index,
    //       // );

    //       if (
    //         behindCar?.position &&
    //         car?.position &&
    //         car.speed !== 1 &&
    //         car.position.bottom > 100
    //       ) {
    //         if (behindCar.position?.top - 5 < car.position?.bottom) {
    //           const editedSpeedCars = otherCars?.map((otherCar) => {
    //             if (otherCar.id === car.id) {
    //               console.log("change speed");
    //               return { ...otherCar, speed: 3 };
    //             }

    //             return otherCar;
    //           });

    //           console.log("other", otherCars, "edited", editedSpeedCars);

    //           setOtherCars(editedSpeedCars || []);
    //         }
    //       }
    //     });
    //   }
    // };

    if (gameStatus === GameStatusEnum.Started) {
      const setCarsPositions = setInterval(() => {
        let carsPositions: TOtherCar[] = otherCars || [];

        otherCars?.forEach((car, index) => {
          const carElement = document.querySelector(`.other-car-${car.id}`);
          carsPositions[index].position = {
            top: (carElement?.getBoundingClientRect().top as number) + 5, // add 5px for delay
            bottom: (carElement?.getBoundingClientRect().bottom as number) + 5, // add 5px for delay
            left: carElement?.getBoundingClientRect().left as number,
            right: carElement?.getBoundingClientRect().right as number,
            width: carElement?.getBoundingClientRect().width as number,
            height: carElement?.getBoundingClientRect().height as number,
          };
        });

        setOtherCars(carsPositions);
        // changeCarsSpeedWhenReachBehindCar();
      }, 25);

      return () => {
        clearInterval(setCarsPositions);
      };
    }
  }, [setOtherCars, otherCars, gameStatus]);

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
                style={{
                  animationDuration: speed / 7 + car.speed + "s",
                }}>
                <div
                  className={`other-car-${car.id} h-20 w-full rounded-md bg-black transition-all`}></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
