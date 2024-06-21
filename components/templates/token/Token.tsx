"use client";

import { VT323Font } from "@/config/fonts";
import { GameStatusEnum } from "@/enums";
import { cn } from "@/lib/utils";
import { useMainStore } from "@/store/mainStore";
import Image from "next/image";
import useIncreaseTokenByOtherCars from "./useIncreaseTokenByOtherCars";
import { useEffect, useState } from "react";
import { Button } from "@nextui-org/button";
import { ShoppingCartIcon } from "@/components/modules/icons";
import Link from "next/link";
import Shop from "../shop/Shop";

export default function Token() {
  const [prevTokens, setPrevTokens] = useState(0);
  const [howManyIncreaseToken, setHowManyIncreaseToken] = useState(0);

  const gameStatus = useMainStore((state) => state.gameStatus);

  const tokens = useMainStore((state) => state.tokens);
  const setTokens = useMainStore((state) => state.setTokens);
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
    if (prevTokens < tokens) {
      setHowManyIncreaseToken(tokens - prevTokens);
      setPrevTokens(tokens);
    }
  }, [tokens, prevTokens]);

  return (
    <div
      className={cn(
        "fixed inset-0 bottom-auto z-20 flex h-12 select-none items-center justify-center transition-all duration-300 ease-in md:h-16 md:justify-start",
        gameStatus === GameStatusEnum.Started &&
          "bg-black/20 shadow-md backdrop-blur-md",
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
        {gameStatus !== GameStatusEnum.Started ? <Shop /> : null}
      </div>
    </div>
  );
}
