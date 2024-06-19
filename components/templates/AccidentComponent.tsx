"use client";

import { GameStatusEnum } from "@/enums";
import { cn } from "@/lib/utils";
import { useMainStore } from "@/store/mainStore";
import { Button } from "@nextui-org/button";
import { useMyCarStore } from "./myCarStore";
import { useOtherCarsStore } from "./otherCarsStore";

export default function AccidentComponent() {
  const gameStatus = useMainStore((state) => state.gameStatus);
  const setGameStatus = useMainStore((state) => state.setGameStatus);

  const setMyCar = useMyCarStore((state) => state.setMyCar);

  const setOtherCars = useOtherCarsStore((state) => state.setOtherCars);

  const onReStartGame = () => {
    setGameStatus(GameStatusEnum.NotStarted);
    setMyCar({
      line: "center",
      YPosition: 85,
      position: {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        height: 0,
        width: 0,
      },
    });
    setOtherCars([]);
  };

  return (
    <div
      className={cn(
        "invisible fixed inset-0 z-10 flex size-full items-center justify-center bg-black/40 opacity-0 backdrop-blur-md transition",
        gameStatus === GameStatusEnum.Accident && "visible opacity-100",
      )}>
      <div className="flex flex-col items-center gap-y-10">
        <p className="text-3xl font-medium text-white">You had an accident</p>
        <Button
          size="lg"
          color="success"
          className="z-10 font-medium tracking-wide text-white shadow-xl"
          onClick={onReStartGame}>
          Restart game
        </Button>
      </div>
    </div>
  );
}
