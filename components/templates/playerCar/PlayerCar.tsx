"use client";

import Car from "@/components/modules/Car";
import { cn } from "@/lib/utils";
import { memo, useRef } from "react";
import { usePlayerCarStore } from "./playerCarStore";
import useAccident from "./useAccident";
import useChangePlayerCarLine from "./useChangePlayerCarLine";
import useMovePlayerCarYPosition from "./useMovePlayerCarYPosition";

export default memo(function PlayerCar() {
  const playerCarRef = useRef(null);

  const playerCar = usePlayerCarStore((state) => state.playerCar);

  // On change car Line
  useChangePlayerCarLine();

  // On move Y position
  useMovePlayerCarYPosition();

  // on Accident AND set playerCar to store
  useAccident({ playerCarRef });

  return (
    <div
      className={cn("flex h-full w-full justify-center py-4 transition-all")}>
      <div
        className={cn("w-4/12 px-4 transition-all duration-150")}
        style={{
          transform: `translateY(${playerCar.YPosition}%) translateX(${
            playerCar.line === "left"
              ? "-100%"
              : playerCar.line === "center"
                ? "0px"
                : playerCar.line === "right"
                  ? "100%"
                  : "0px"
          })`,

          transitionTimingFunction: "linear",
        }}>
        <Car ref={playerCarRef} carStyle={playerCar.carStyle} />
      </div>
    </div>
  );
});
