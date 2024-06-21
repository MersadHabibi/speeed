"use client";

import { GameStatusEnum } from "@/enums";
import { cn } from "@/lib/utils";
import { useMainStore } from "@/store/mainStore";
import { Button } from "@nextui-org/button";
import { useOtherCarsStore } from "./otherCars/otherCarsStore";
import { usePlayerCarStore } from "./playerCar/playerCarStore";
import { RotateCWWIcon } from "../modules/icons";

export default function AccidentPage() {
  const gameStatus = useMainStore((state) => state.gameStatus);
  const setGameStatus = useMainStore((state) => state.setGameStatus);

  const resetPlayerCar = usePlayerCarStore((state) => state.resetPlayerCar);

  const setOtherCars = useOtherCarsStore((state) => state.setOtherCars);

  const onReStartGame = () => {
    setGameStatus(GameStatusEnum.NotStarted);
    resetPlayerCar();
    setOtherCars([]);
  };

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
}
