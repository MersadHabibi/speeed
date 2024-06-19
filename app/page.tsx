"use client";

import AccidentPage from "@/components/templates/AccidentPage";
import OtherCars from "@/components/templates/otherCars/OtherCars";
import PlayerCar from "@/components/templates/playerCar/PlayerCar";
import StartPage from "@/components/templates/StartPage";
import StreetLines from "@/components/templates/StreetLines";
import Token from "@/components/templates/token/Token";
import useIncreaseSpeedAndTrafficByTime from "@/hooks/useIncreaseSpeedAndTrafficByTime";

export default function Home() {
  // increase speed and traffic
  useIncreaseSpeedAndTrafficByTime();

  return (
    <div className="flex size-full justify-center bg-neutral-400">
      <Token />
      <StartPage />
      <div className="relative h-full w-80 overflow-y-hidden bg-zinc-600 px-2">
        <StreetLines />
        <PlayerCar />
        <OtherCars />
      </div>
      <AccidentPage />
    </div>
  );
}
