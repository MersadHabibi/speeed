import { useEffect, useState } from "react";
import { useOtherCarsStore } from "../otherCars/otherCarsStore";
import { useMainStore } from "@/store/mainStore";
import { GameStatusEnum } from "@/enums";

const HOW_MANY_TOKEN_FOR_EACH_CAR = 5;

export default function useIncreaseTokenByOtherCars() {
  const [tokensWhenStart, setTokensWhenStart] = useState(0);

  const tokens = useMainStore((state) => state.tokens);
  const setTokens = useMainStore((state) => state.setTokens);
  const gameStatus = useMainStore((state) => state.gameStatus);

  const otherCars = useOtherCarsStore((state) => state.otherCars);

  useEffect(() => {
    if (gameStatus === GameStatusEnum.Started && !tokensWhenStart) {
      setTokensWhenStart(tokens);
    }

    let sumTokens = 0;

    otherCars?.forEach((otherCar) => {
      if (!otherCar.position) return;

      if (otherCar.position.top > window.innerHeight)
        sumTokens += HOW_MANY_TOKEN_FOR_EACH_CAR;
    });

    if (!sumTokens) return;

    setTokens(sumTokens + tokensWhenStart);
  }, [otherCars, setTokens, tokens, gameStatus, tokensWhenStart]);
}
