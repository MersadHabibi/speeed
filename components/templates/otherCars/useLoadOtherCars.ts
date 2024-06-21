import { GameStatusEnum } from "@/enums";
import { rand } from "@/lib/utils";
import { useMainStore } from "@/store/mainStore";
import { TOtherCar } from "@/types";
import { useEffect, useState } from "react";
import { useOtherCarsStore } from "./otherCarsStore";
import { carStyles } from "@/data/carStyles";

export default function useLoadOtherCars() {
  const [prevRandomNumber, setPrevRandomNumber] = useState<number>();

  const gameStatus = useMainStore((state) => state.gameStatus);
  const traffic = useMainStore((state) => state.traffic);

  const otherCars = useOtherCarsStore((state) => state.otherCars);
  const setOtherCars = useOtherCarsStore((state) => state.setOtherCars);

  useEffect(() => {
    const addCar = () => {
      let speedNumber = rand(1, 3);

      // Get random line

      let rnd = rand(0, 2);

      const randomNumber =
        prevRandomNumber === 0
          ? rand(1, 2)
          : prevRandomNumber === 1
            ? rnd === 1
              ? rand(0, 2)
              : rnd
            : rand(0, 1);

      setPrevRandomNumber(randomNumber);

      // Get random carStyle

      const randomNumberForCarStyle = rand(1, carStyles.length);

      console.log(
        carStyles[randomNumberForCarStyle - 1],
        carStyles[randomNumberForCarStyle - 1],
        carStyles,
        carStyles.length,
      );

      setOtherCars([
        ...(otherCars as TOtherCar[]),
        {
          id: otherCars?.length ? otherCars.length + 1 : 1,
          position: undefined,
          line:
            randomNumber === 0
              ? "left"
              : randomNumber === 1
                ? "center"
                : "right",
          speed: speedNumber,
          carStyle: carStyles[randomNumberForCarStyle - 1],
        },
      ]);
    };

    if (gameStatus === GameStatusEnum.Started) {
      const addCarInterval = setInterval(() => addCar(), traffic);

      return () => {
        clearInterval(addCarInterval);
      };
    }
  }, [gameStatus, prevRandomNumber, otherCars, setOtherCars, traffic]);
}
