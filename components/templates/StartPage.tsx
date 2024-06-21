"use client";

import { VT323Font } from "@/config/fonts";
import { GameStatusEnum } from "@/enums";
import { cn } from "@/lib/utils";
import { useMainStore } from "@/store/mainStore";
import { Button } from "@nextui-org/button";
import { useState } from "react";
import { PlayIcon } from "../modules/icons";
import Fuel from "./fuel/Fuel";
import { useFuelStore } from "./fuel/fuelStore";
import toast from "react-hot-toast";

export default function StartPage() {
  const [isStarted, setIsStarted] = useState(false);
  const [counter, setCounter] = useState(3);

  const gameStatus = useMainStore((state) => state.gameStatus);
  const setGameStatus = useMainStore((state) => state.setGameStatus);

  const fuel = useFuelStore((state) => state.fuel);
  const setFuel = useFuelStore((state) => state.setFuel);

  const onStartGame = () => {
    if (fuel < 20) {
      return toast.error("Your fuel is not enough");
    }

    setFuel(fuel - 20);

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
        "invisible fixed inset-0 z-10 h-full w-full bg-black/40 opacity-0 backdrop-blur-md",
        gameStatus === GameStatusEnum.NotStarted && "visible opacity-100",
      )}>
      {isStarted ? (
        <div
          className={cn(
            "flex size-full items-center justify-center text-8xl font-semibold text-white",
            counter === 3 && "text-green-500",
            counter === 2 && "text-yellow-500",
            counter === 1 && "text-orange-500",
            counter === 0 && "text-red-500",
            VT323Font.className,
          )}>
          {counter}
        </div>
      ) : (
        <div className="relative flex size-full flex-col items-center justify-center">
          <Button
            radius="full"
            variant="light"
            isIconOnly
            className="z-10 !size-14 animate-pulse rounded-sm !bg-transparent text-white"
            onClick={onStartGame}>
            <PlayIcon className="size-12" />
          </Button>
        </div>
      )}
    </div>
  );
}
