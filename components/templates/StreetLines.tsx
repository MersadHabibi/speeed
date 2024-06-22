"use client";

import { GameStatusEnum } from "@/enums";
import { cn } from "@/lib/utils";
import { useMainStore } from "@/store/mainStore";
import { memo } from "react";

export default memo(function StreetLines() {
  const gameStatus = useMainStore((state) => state.gameStatus);
  const speed = useMainStore((state) => state.speed);

  return (
    <div
      className={cn(
        "absolute bottom-0 left-2 right-2 flex h-[10000px] justify-evenly border-x-4 border-white",
        gameStatus === GameStatusEnum.Started && "street-line-animation",
      )}
      onAnimationStart={(event) => {
        event.currentTarget.style.animationDuration = speed + "s";
      }}>
      <div className="flex w-1.5 flex-col gap-y-6">
        {new Array(170).fill("").map((_, index) => (
          <div key={index} className="h-full w-full bg-white"></div>
        ))}
      </div>
      <div className="flex w-1.5 flex-col gap-y-6">
        {new Array(170).fill("").map((_, index) => (
          <div key={index} className="h-full w-full bg-white"></div>
        ))}
      </div>
    </div>
  );
});
