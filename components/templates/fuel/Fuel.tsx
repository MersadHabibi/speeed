import { FuelIcon } from "@/components/modules/icons";
import { GameStatusEnum } from "@/enums";
import { cn } from "@/lib/utils";
import { useMainStore } from "@/store/mainStore";
import { memo } from "react";
import { useFuelStore } from "./fuelStore";
import { useAddFuel } from "./useAddFuel";

export default memo(function Fuel() {
  const gameStatus = useMainStore((state) => state.gameStatus);

  const fuel = useFuelStore((state) => state.fuel);

  useAddFuel();

  return (
    <div
      className={cn(
        "fixed inset-0 bottom-0 top-auto z-20 flex h-14 w-full items-center gap-x-4 bg-neutral-900 px-4 transition-all",
        gameStatus === GameStatusEnum.Started && "-bottom-14",
        gameStatus === GameStatusEnum.Shop && "-bottom-14",
      )}>
      <div className="flex items-center justify-center">
        <FuelIcon className="size-6" />
      </div>
      <div className="mr-2 w-full">
        <div className="relative flex h-2 w-full items-center justify-evenly overflow-hidden rounded-full bg-yellow-600/30">
          <div
            className="absolute inset-0 -z-10 bg-yellow-600 transition-all"
            style={{
              width: fuel + "%",
            }}></div>
          <div className="h-full w-0.5 bg-white/80"></div>
          <div className="h-full w-0.5 bg-white/80"></div>
          <div className="h-full w-0.5 bg-white/80"></div>
          <div className="h-full w-0.5 bg-white/80"></div>
        </div>
      </div>
    </div>
  );
});
