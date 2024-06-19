"use client";

import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";
import { useOtherCarsStore } from "./otherCarsStore";
import { TCarLine, TPosition } from "@/types";
import { useMainStore } from "@/store/mainStore";
import { GameStatusEnum } from "@/enums";
import { useMyCarStore } from "./myCarStore";

type TMovingY = "back" | "front" | "stop";

export default function MyCar() {
  const myCarRef = useRef(null);

  const [isMovingY, setIsMovingY] = useState<TMovingY>("stop");
  const [startTouchXPosition, setStartTouchXPosition] = useState<number | null>(
    null,
  );
  const [startTouchYPosition, setStartTouchYPosition] = useState<number | null>(
    null,
  );

  const otherCars = useOtherCarsStore((state) => state.otherCars);
  const setOtherCars = useOtherCarsStore((state) => state.setOtherCars);

  const setGameStatus = useMainStore((state) => state.setGameStatus);
  const gameStatus = useMainStore((state) => state.gameStatus);

  const myCar = useMyCarStore((state) => state.myCar);
  const setMyCar = useMyCarStore((state) => state.setMyCar);
  const setCarLine = useMyCarStore((state) => state.setCarLine);
  const setCarYPosition = useMyCarStore((state) => state.setCarYPosition);

  // On change car Line
  useEffect(() => {
    if (gameStatus === GameStatusEnum.Started) {
      const changeCarLineHandler = (direction: "left" | "right") => {
        console.log(direction);
        // On move to left
        if (direction === "left") {
          setCarLine(
            myCar.line === "right"
              ? "center"
              : myCar.line === "center"
                ? "left"
                : "left",
          );
        }
        // On move to right
        else if (direction === "right") {
          setCarLine(
            myCar.line === "left"
              ? "center"
              : myCar.line === "center"
                ? "right"
                : "right",
          );
        }
      };

      const onChangeCarLineWithKeyboard = (event: KeyboardEvent) => {
        // On move to left
        if (
          event.key === "a" ||
          event.key === "A" ||
          event.key === "ArrowLeft"
        ) {
          changeCarLineHandler("left");
        }
        // On move to right
        else if (
          event.key === "d" ||
          event.key === "D" ||
          event.key === "ArrowRight"
        ) {
          changeCarLineHandler("right");
        }
      };

      const onTouchUp = (event: TouchEvent) => {
        if (!startTouchXPosition) return;

        setStartTouchXPosition(null);
      };

      const onTouchStart = (event: TouchEvent) => {
        setStartTouchXPosition(() => event.touches[0].clientX);
      };

      const onTouchMove = (event: TouchEvent) => {
        let clientX = event.changedTouches[0].clientX;
        if (!startTouchXPosition) {
          return;
        }

        if (startTouchXPosition < clientX - 50) {
          changeCarLineHandler("right");

          setStartTouchXPosition(clientX);
        } else if (startTouchXPosition > clientX + 50) {
          changeCarLineHandler("left");

          setStartTouchXPosition(clientX);
        }
      };

      window.addEventListener("keydown", onChangeCarLineWithKeyboard);
      window.addEventListener("touchend", onTouchUp);
      window.addEventListener("touchstart", onTouchStart);
      window.addEventListener("touchmove", onTouchMove);

      return () => {
        window.removeEventListener("keydown", onChangeCarLineWithKeyboard);
        window.removeEventListener("touchend", onTouchUp);
        window.removeEventListener("touchstart", onTouchStart);
        window.removeEventListener("touchmove", onTouchMove);
      };
    }
  }, [gameStatus, myCar.line, setCarLine, startTouchXPosition]);

  // on move Y position
  useEffect(() => {
    if (gameStatus === GameStatusEnum.Started) {
      const moveCarHandler = (direction: "front" | "back", speed = 1) => {
        if (direction === "front") {
          setCarYPosition(myCar.YPosition - speed);
        } else if (direction === "back") {
          setCarYPosition(myCar.YPosition + speed);
        }
      };

      // Desktop

      let interval: any;

      const onMoveCarYPositionWithKeyboard = (event: KeyboardEvent) => {
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

      const onStopMoveCarYPositionWithKeyboard = (event: KeyboardEvent) => {
        if (
          event.key === "w" ||
          event.key === "W" ||
          event.key === "ArrowUp" ||
          event.key === "s" ||
          event.key === "S" ||
          event.key === "ArrowBottom"
        ) {
          clearInterval(interval);
          setIsMovingY("stop");
        }
      };

      if (isMovingY !== "stop") {
        if (myCar.YPosition < 5 || myCar.YPosition > 85) {
          clearInterval(interval);
          setIsMovingY("stop");
          setCarYPosition(
            myCar.YPosition < 5 ? myCar.YPosition + 1 : myCar.YPosition - 1,
          );
        } else {
          interval = setInterval(() => {
            moveCarHandler(isMovingY);
          }, 30);
        }
      }

      // Mobile

      const onTouchStart = (event: TouchEvent) => {
        setStartTouchYPosition(() => event.touches[0].clientY);
      };

      const onTouchMove = (event: TouchEvent) => {
        let clientY = event.changedTouches[0].clientY;

        if (
          !startTouchYPosition ||
          myCar.YPosition < 5 ||
          myCar.YPosition > 85
        ) {
          setCarYPosition(
            myCar.YPosition < 5 ? myCar.YPosition + 1 : myCar.YPosition - 1,
          );

          return;
        }

        if (startTouchYPosition > clientY) {
          moveCarHandler("front", (startTouchYPosition - clientY) / 7);

          setStartTouchYPosition(clientY);
        } else if (startTouchYPosition < clientY) {
          moveCarHandler("back", (clientY - startTouchYPosition) / 7);

          setStartTouchYPosition(clientY);
        }
      };

      window.addEventListener("keydown", onMoveCarYPositionWithKeyboard);
      window.addEventListener("keyup", onStopMoveCarYPositionWithKeyboard);
      window.addEventListener("touchstart", onTouchStart);
      window.addEventListener("touchmove", onTouchMove);

      return () => {
        window.removeEventListener("touchstart", onTouchStart);
        window.removeEventListener("touchmove", onTouchMove);
        window.removeEventListener("keydown", onMoveCarYPositionWithKeyboard);
        window.removeEventListener("keyup", onStopMoveCarYPositionWithKeyboard);
        clearInterval(interval);
      };
    }
  }, [
    isMovingY,
    myCar.YPosition,
    setCarYPosition,
    gameStatus,
    startTouchYPosition,
  ]);

  // on Accident AND set myCar to store
  // useEffect(() => {
  //   if (gameStatus === GameStatusEnum.Started) {
  //     const interval = setInterval(() => {
  //       const myCarElement =
  //         myCarRef.current as unknown as React.DetailedHTMLProps<
  //           React.HTMLAttributes<HTMLDivElement>,
  //           HTMLDivElement
  //         >;

  //       const myCarPositions: TPosition = {
  //         // @ts-ignore
  //         right: myCarElement.getBoundingClientRect().right,
  //         // @ts-ignore
  //         left: myCarElement.getBoundingClientRect().left,
  //         // @ts-ignore
  //         top: myCarElement.getBoundingClientRect().top,
  //         // @ts-ignore
  //         bottom: myCarElement.getBoundingClientRect().bottom,
  //         // @ts-ignore
  //         height: myCarElement.getBoundingClientRect().height,
  //         // @ts-ignore
  //         width: myCarElement.getBoundingClientRect().width,
  //       };

  //       setMyCar({
  //         line: myCar.line,
  //         position: myCarPositions,
  //         YPosition: myCar.YPosition,
  //       });

  //       otherCars?.some((otherCar) => {
  //         if (otherCar.position) {
  //           if (
  //             ((otherCar.position?.bottom >= myCarPositions.top &&
  //               otherCar.position?.bottom <= myCarPositions.bottom) ||
  //               (otherCar.position?.top >= myCarPositions.top &&
  //                 otherCar.position?.top <= myCarPositions.bottom)) &&
  //             ((otherCar.position?.left <= myCarPositions.right &&
  //               otherCar.position?.left >= myCarPositions.left) ||
  //               (otherCar.position?.right >= myCarPositions.left &&
  //                 otherCar.position?.right <= myCarPositions.right))
  //           ) {
  //             // if (gameStatus === GameStatusEnum.Restart) return null;
  //             setGameStatus(GameStatusEnum.Accident);
  //           }
  //         }
  //       });
  //     }, 25);

  //     return () => {
  //       clearInterval(interval);
  //     };
  //   }
  // }, [otherCars, setOtherCars, setGameStatus, myCar, setMyCar, gameStatus]);

  // on Restart game
  // useEffect(() => {
  //   if (gameStatus === GameStatusEnum.Restart) {
  //     setCarYPosition(85);
  //     setCarLine("center");
  //   }
  // }, [gameStatus, setCarLine]);

  return (
    <div
      className={cn("flex h-full w-full justify-center py-4 transition-all")}>
      <div
        className={cn("w-4/12 px-4 transition-all")}
        style={{
          transform: `translateY(${myCar.YPosition}%) translateX(${
            myCar.line === "left"
              ? "-100%"
              : myCar.line === "center"
                ? "0px"
                : myCar.line === "right"
                  ? "100%"
                  : "0px"
          })`,

          transitionTimingFunction: "linear",
        }}>
        <div
          ref={myCarRef}
          className="h-20 w-full rounded-md bg-black transition-all"></div>
      </div>
    </div>
  );
}
