"use client";

import { GameStatusEnum } from "@/enums";
import { cn } from "@/lib/utils";
import {
  DEFAULT_SPEED,
  DEFAULT_TRAFFIC,
  useMainStore,
} from "@/store/mainStore";
import { Button } from "@nextui-org/button";
import { memo, useCallback } from "react";
import { RotateCWWIcon } from "../modules/icons";
import { useOtherCarsStore } from "./otherCars/otherCarsStore";
import { usePlayerCarStore } from "./playerCar/playerCarStore";

export default memo(function AccidentPage() {
  const gameStatus = useMainStore((state) => state.gameStatus);
  const setGameStatus = useMainStore((state) => state.setGameStatus);

  const resetPlayerCar = usePlayerCarStore((state) => state.resetPlayerCar);

  const setOtherCars = useOtherCarsStore((state) => state.setOtherCars);

  const setSpeed = useMainStore((state) => state.setSpeed);
  const setTraffic = useMainStore((state) => state.setTraffic);

  const onReStartGame = useCallback(() => {
    setGameStatus(GameStatusEnum.NotStarted);
    resetPlayerCar();
    setOtherCars([]);
    setSpeed(DEFAULT_SPEED);
    setTraffic(DEFAULT_TRAFFIC);
  }, [setGameStatus, setOtherCars, resetPlayerCar, setSpeed, setTraffic]);

  return (
    <div
      className={cn(
        "invisible fixed inset-0 z-10 flex size-full items-center justify-center bg-black/40 opacity-0 backdrop-blur-md transition",
        gameStatus === GameStatusEnum.Accident && "visible opacity-100",
      )}>
      <div className="flex flex-col items-center gap-y-10">
        <Button
          radius="full"
          variant="light"
          isIconOnly
          className="z-10 !size-14 animate-pulse rounded-sm !bg-transparent text-white"
          onClick={onReStartGame}>
          <RotateCWWIcon className="size-12" />
        </Button>
      </div>
    </div>
  );
});
