"use client";

import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";
import { useOtherCarsStore } from "./otherCarsStore";
import { TCarPosition, TPosition } from "@/types";

type TMovingY = "back" | "front" | undefined;

export default function MyCar() {
  const myCarRef = useRef(null);
  const [carPosition, setCarPosition] = useState<TCarPosition>("center");
  const [carYPosition, setCarYPosition] = useState(85);

  const [isMovingY, setIsMovingY] = useState<TMovingY>();

  const otherCarsPositions = useOtherCarsStore(
    (state) => state.otherCarsPositions,
  );
  const setOtherCarsPositions = useOtherCarsStore(
    (state) => state.setOtherCarsPositions,
  );

  // On move car position
  useEffect(() => {
    const onMoveCarPosition = (event: KeyboardEvent) => {
      // On move to left
      if (event.key === "a" || event.key === "A" || event.key === "ArrowLeft") {
        setCarPosition(
          carPosition === "right"
            ? "center"
            : carPosition === "center"
              ? "left"
              : "left",
        );
      }
      // On move to right
      else if (
        event.key === "d" ||
        event.key === "D" ||
        event.key === "ArrowRight"
      ) {
        setCarPosition(
          carPosition === "left"
            ? "center"
            : carPosition === "center"
              ? "right"
              : "right",
        );
      }
    };

    window.addEventListener("keydown", onMoveCarPosition);

    return () => {
      window.removeEventListener("keydown", onMoveCarPosition);
    };
  }, [carPosition]);

  // on move Y position
  useEffect(() => {
    let interval: any;

    const onMoveCarYPosition = (event: KeyboardEvent) => {
      if (event.key === "w" || event.key === "W" || event.key === "ArrowUp") {
        setIsMovingY("front");
      } else if (
        event.key === "s" ||
        event.key === "S" ||
        event.key === "ArrowBottom"
      ) {
        setIsMovingY("back");
      }
    };

    const onStopMoveCarYPosition = (event: KeyboardEvent) => {
      if (
        event.key === "w" ||
        event.key === "W" ||
        event.key === "ArrowUp" ||
        event.key === "s" ||
        event.key === "S" ||
        event.key === "ArrowBottom"
      ) {
        clearInterval(interval);
        setIsMovingY(undefined);
      }
    };

    if (carYPosition < 5 || carYPosition > 85) {
      clearInterval(interval);
      setIsMovingY(undefined);
      setCarYPosition((prev) => (carYPosition < 5 ? prev + 1 : prev - 1));
    } else {
      if (isMovingY === "front") {
        interval = setInterval(() => {
          setCarYPosition((prev) => prev - 1);
        }, 30);
      } else if (isMovingY === "back") {
        interval = setInterval(() => {
          setCarYPosition((prev) => prev + 1);
        }, 30);
      }
    }

    window.addEventListener("keydown", onMoveCarYPosition);
    window.addEventListener("keyup", onStopMoveCarYPosition);

    return () => {
      clearInterval(interval);
    };
  }, [isMovingY, carYPosition]);

  // on Accident
  useEffect(() => {
    const interval = setInterval(() => {
      const myCar = myCarRef.current as unknown as React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLDivElement>,
        HTMLDivElement
      >;

      // console.log(otherCarsPositions);

      const myCarPositions: TPosition = {
        // @ts-ignore
        right: myCar.getBoundingClientRect().right,
        // @ts-ignore
        left: myCar.getBoundingClientRect().left,
        // @ts-ignore
        top: myCar.getBoundingClientRect().top,
        // @ts-ignore
        bottom: myCar.getBoundingClientRect().bottom,
        // @ts-ignore
        height: myCar.getBoundingClientRect().height,
        // @ts-ignore
        width: myCar.getBoundingClientRect().width,
      };

      // console.log(myCarPositions);

      // console.log("object1");

      let isAccident = otherCarsPositions?.some((otherCar) => {
        if (
          ((otherCar.bottom >= myCarPositions.top &&
            otherCar.bottom <= myCarPositions.bottom) ||
            (otherCar.top >= myCarPositions.top &&
              otherCar.top <= myCarPositions.bottom)) &&
          ((otherCar.left <= myCarPositions.right &&
            otherCar.left >= myCarPositions.left) ||
            (otherCar.right >= myCarPositions.left &&
              otherCar.right <= myCarPositions.right))
        ) {
          console.log("accident");
        }
      });
    }, 50);

    return () => {
      clearInterval(interval);
    };
  }, [otherCarsPositions, setOtherCarsPositions]);

  // console.log(otherCarsPositions);

  return (
    <div
      className={cn(
        "flex h-full w-full justify-center px-5 py-4 transition-all",
      )}>
      <div
        className={cn("px-[18px] transition-all ease-linear")}
        style={{
          transform: `translateY(${carYPosition}%) translateX(${
            carPosition === "left"
              ? "-100%"
              : carPosition === "center"
                ? "0px"
                : carPosition === "right"
                  ? "100%"
                  : "0px"
          })`,
        }}>
        <div
          ref={myCarRef}
          className="h-16 w-16 rounded-md bg-black transition-all"></div>
      </div>
    </div>
  );
}
