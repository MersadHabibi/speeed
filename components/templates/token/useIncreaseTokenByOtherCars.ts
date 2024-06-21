import { useEffect, useState } from "react";
import { useOtherCarsStore } from "../otherCars/otherCarsStore";
import { useMainStore } from "@/store/mainStore";
import { GameStatusEnum } from "@/enums";

const HOW_MANY_TOKEN_FOR_EACH_CAR = 5;

const speedsToken = [
  {
    speed: 25,
    token: 5,
  },
  {
    speed: 20,
    token: 7,
  },
  {
    speed: 15,
    token: 9,
  },
  {
    speed: 10,
    token: 11,
  },
];

export default function useIncreaseTokenByOtherCars() {
  const [tokensWhenStart, setTokensWhenStart] = useState(0);

  const tokens = useMainStore((state) => state.tokens);
  const setTokens = useMainStore((state) => state.setTokens);
  const gameStatus = useMainStore((state) => state.gameStatus);
  const speed = useMainStore((state) => state.speed);

  const otherCars = useOtherCarsStore((state) => state.otherCars);

  useEffect(() => {
    if (gameStatus === GameStatusEnum.Started && !tokensWhenStart) {
      setTokensWhenStart(tokens);
    }

    const tokensByCar = speedsToken.find((item) => item.speed === speed);

    let sumTokens = 0;

    otherCars?.forEach((otherCar) => {
      if (!otherCar.position) return;

      if (otherCar.position.top > window.innerHeight)
        sumTokens += tokensByCar?.token || 5;
    });

    if (!sumTokens) return;

    setTokens(sumTokens + tokensWhenStart);
  }, [otherCars, setTokens, tokens, gameStatus, tokensWhenStart, speed]);
}
