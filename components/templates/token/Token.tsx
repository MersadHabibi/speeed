"use client";

import { VT323Font } from "@/config/fonts";
import { GameStatusEnum } from "@/enums";
import { cn } from "@/lib/utils";
import { useMainStore } from "@/store/mainStore";
import Image from "next/image";
import useIncreaseTokenByOtherCars from "./useIncreaseTokenByOtherCars";
import { useEffect, useState } from "react";

export default function Token() {
  const [prevTokens, setPrevTokens] = useState(0);
  const [howManyIncreaseToken, setHowManyIncreaseToken] = useState(0);

  const gameStatus = useMainStore((state) => state.gameStatus);

  const tokens = useMainStore((state) => state.tokens);
  const setTokens = useMainStore((state) => state.setTokens);

  // Get tokens from localStorage
  useEffect(() => {
    const savedTokens = +(localStorage.getItem("tokens") || 0);

    if (!savedTokens) return;

    setTokens(savedTokens);
    setPrevTokens(tokens); // for disable animation
  }, [setTokens, tokens]);

  // Increase token
  useIncreaseTokenByOtherCars();

  // Set token to localStorage when gameStatus is accident
  useEffect(() => {
    if (gameStatus === GameStatusEnum.Accident) {
      localStorage.setItem("tokens", tokens.toString());
    }
  }, [gameStatus, tokens]);

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
        "pointer-events-none fixed inset-0 bottom-auto z-50 flex select-none items-center justify-center transition-all duration-300 ease-in md:justify-start",
        gameStatus === GameStatusEnum.Started &&
          "bg-black/20 shadow-md backdrop-blur-md",
      )}>
      <div className="flex h-12 w-full items-center justify-between px-3">
        <div className="relative flex items-center gap-x-2">
          <Image
            src={"/images/coin.png"}
            width={50}
            height={50}
            alt="Token"
            className="size-8 md:size-10"
          />
          <span
            className={cn(
              "text-2xl font-bold text-yellow-400 md:text-4xl",
              VT323Font.className,
            )}>
            {tokens}
          </span>
          {howManyIncreaseToken ? (
            <div
              className={cn(
                "increase-token-animation-element absolute bottom-0 left-full top-0 mt-auto h-fit pl-1 font-bold text-green-500 opacity-0 md:text-4xl",
                VT323Font.className,
              )}
              onAnimationEnd={() => {
                setHowManyIncreaseToken(0);
              }}>
              <span>+{howManyIncreaseToken}</span>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
