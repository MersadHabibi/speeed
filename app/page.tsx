"use client";

import AccidentComponent from "@/components/templates/AccidentComponent";
import MyCar from "@/components/templates/MyCar";
import OtherCars from "@/components/templates/OtherCars";
import StartComponent from "@/components/templates/StartComponent";
import StreetLines from "@/components/templates/StreetLines";
import { GameStatusEnum } from "@/enums";
import { useMainStore } from "@/store/mainStore";
import { useEffect } from "react";

export default function Home() {
  const traffic = useMainStore((state) => state.traffic);
  const maxTraffic = useMainStore((state) => state.maxTraffic);
  const speed = useMainStore((state) => state.speed);
  const maxSpeed = useMainStore((state) => state.maxSpeed);
  const setSpeed = useMainStore((state) => state.setSpeed);
  const setTraffic = useMainStore((state) => state.setTraffic);
  const gameStatus = useMainStore((state) => state.gameStatus);

  // increase speed and traffic
  useEffect(() => {
    if (gameStatus !== GameStatusEnum.Started) return;
    const increaseSpeedAndTrafficInterval = setInterval(() => {
      if (maxSpeed < speed) setSpeed(speed - 1);

      if (maxTraffic < traffic) setTraffic(traffic - 50);

      console.log(traffic, speed);
    }, 5000);

    return () => {
      clearInterval(increaseSpeedAndTrafficInterval);
    };
  }, [setSpeed, setTraffic, speed, traffic, gameStatus, maxTraffic, maxSpeed]);

  return (
    <div className="flex size-full justify-center bg-neutral-300">
      <StartComponent />
      <div className="relative h-full w-80 overflow-y-hidden bg-zinc-600 px-2">
        <StreetLines />
        <MyCar />
        <OtherCars />
      </div>
      <AccidentComponent />
    </div>
  );
}
