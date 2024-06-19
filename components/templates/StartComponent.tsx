"use client";

import { VT323Font } from "@/config/fonts";
import { GameStatusEnum } from "@/enums";
import { cn } from "@/lib/utils";
import { useMainStore } from "@/store/mainStore";
import { Button } from "@nextui-org/button";
import { useState } from "react";

export default function StartComponent() {
  const [isStarted, setIsStarted] = useState(false);
  const [counter, setCounter] = useState(3);

  const gameStatus = useMainStore((state) => state.gameStatus);
  const setGameStatus = useMainStore((state) => state.setGameStatus);

  const onStartGame = () => {
    setIsStarted(true);

    const interval = setInterval(() => {
      setCounter((prev) => {
        if (prev === 0) {
          setGameStatus(GameStatusEnum.Started);
          setCounter(3);
          setIsStarted(false);

          clearInterval(interval);
          return 0;
        }

        return prev - 1;
      });
    }, 1000);
  };

  // on Restart Game

  return (
    <div
      className={cn(
        "invisible fixed inset-0 z-10 flex size-full items-center justify-center bg-black/40 opacity-0 backdrop-blur-md transition",
        gameStatus === GameStatusEnum.NotStarted && "visible opacity-100",
      )}>
      {isStarted ? (
        <div
          className={cn(
            "text-8xl font-semibold text-white",
            counter === 3 && "text-green-500",
            counter === 2 && "text-yellow-500",
            counter === 1 && "text-orange-500",
            counter === 0 && "text-red-500",
            VT323Font.className,
          )}>
          {counter}
        </div>
      ) : (
        <Button
          size="lg"
          color="success"
          className="z-10 font-medium tracking-wide text-white shadow-xl"
          onClick={onStartGame}>
          Start game
        </Button>
      )}
    </div>
  );
}
