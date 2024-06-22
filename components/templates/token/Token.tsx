"use client";

import { ChevronLeftIcon, ShoppingCartIcon } from "@/components/modules/icons";
import { GameStatusEnum } from "@/enums";
import { cn } from "@/lib/utils";
import { useMainStore } from "@/store/mainStore";
import { Button } from "@nextui-org/button";
import Image from "next/image";
import { memo, useEffect, useState } from "react";
import useIncreaseTokenByOtherCars from "./useIncreaseTokenByOtherCars";

export default memo(function Token() {
  const [prevGameStatus, setPrevGameStatus] = useState<GameStatusEnum>();

  const [prevTokens, setPrevTokens] = useState(0);
  const [howManyIncreaseToken, setHowManyIncreaseToken] = useState(0);

  const gameStatus = useMainStore((state) => state.gameStatus);
  const setGameStatus = useMainStore((state) => state.setGameStatus);

  const tokens = useMainStore((state) => state.tokens);
  const getTokensFromLocalStorage = useMainStore(
    (state) => state.getTokensFromLocalStorage,
  );

  // Get tokens from localStorage
  useEffect(() => {
    getTokensFromLocalStorage();
  }, [getTokensFromLocalStorage]);

  // Increase token
  useIncreaseTokenByOtherCars();

  // Animation when increase token
  useEffect(() => {
    if (prevTokens != tokens) {
      setHowManyIncreaseToken(tokens - prevTokens);
      setPrevTokens(tokens);
    }
  }, [tokens, prevTokens]);

  return (
    <div
      className={cn(
        "fixed inset-0 bottom-auto z-20 flex h-12 select-none items-center justify-center bg-neutral-900 shadow-md backdrop-blur-md transition-all duration-300 ease-in md:h-16 md:justify-start",
        gameStatus === GameStatusEnum.Started && "bg-black/20",
      )}>
      <div className="flex w-full items-center justify-between px-3">
        <div className="relative flex items-center gap-x-1.5">
          <Image
            src={"/images/token.png"}
            width={50}
            height={50}
            alt="Token"
            className="size-8 md:size-12"
          />
          <span
            className={cn("text-2xl font-bold text-yellow-400 md:text-4xl")}>
            {tokens}
          </span>
          {howManyIncreaseToken ? (
            <div
              className={cn(
                "increase-token-animation-element absolute bottom-0 left-full top-0 mt-auto h-fit pl-1 font-bold opacity-0 md:text-4xl",
                howManyIncreaseToken > 0 ? "text-green-500" : "text-red-500",
              )}
              onAnimationEnd={() => {
                setHowManyIncreaseToken(0);
              }}>
              <span>
                {howManyIncreaseToken > 0 ? "+" : "-"}
                {howManyIncreaseToken}
              </span>
            </div>
          ) : null}
        </div>
        {gameStatus !== GameStatusEnum.Started ? (
          <Button
            radius="full"
            variant="flat"
            isIconOnly
            className="z-10 !size-8 !min-w-0 rounded-md !bg-transparent !p-0 text-white md:!size-9"
            onClick={() => {
              if (gameStatus === GameStatusEnum.Shop) {
                setGameStatus(
                  prevGameStatus ? prevGameStatus : GameStatusEnum.Started,
                );
              } else {
                setPrevGameStatus(gameStatus);
                setGameStatus(GameStatusEnum.Shop);
              }
            }}>
            {gameStatus === GameStatusEnum.Shop ? (
              <ChevronLeftIcon className="size-7 md:size-8" />
            ) : (
              <ShoppingCartIcon className="size-6 md:size-8" />
            )}
          </Button>
        ) : null}
      </div>
    </div>
  );
});
