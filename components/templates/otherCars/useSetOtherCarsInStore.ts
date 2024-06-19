import { GameStatusEnum } from "@/enums";
import { useMainStore } from "@/store/mainStore";
import { TOtherCar } from "@/types";
import { useEffect } from "react";
import { useOtherCarsStore } from "./otherCarsStore";

export default function useSetOtherCarsInStore() {
  const otherCars = useOtherCarsStore((state) => state.otherCars);
  const setOtherCars = useOtherCarsStore((state) => state.setOtherCars);

  const gameStatus = useMainStore((state) => state.gameStatus);

  useEffect(() => {
    if (gameStatus === GameStatusEnum.Started) {
      const setCarsPositions = setInterval(() => {
        let carsPositions: TOtherCar[] = otherCars || [];

        otherCars?.forEach((car, index) => {
          const carElement = document.querySelector(`.other-car-${car.id}`);
          carsPositions[index].position = {
            top: (carElement?.getBoundingClientRect().top as number) + 5, // add 5px for delay
            bottom: (carElement?.getBoundingClientRect().bottom as number) + 5, // add 5px for delay
            left: carElement?.getBoundingClientRect().left as number,
            right: carElement?.getBoundingClientRect().right as number,
            width: carElement?.getBoundingClientRect().width as number,
            height: carElement?.getBoundingClientRect().height as number,
          };
        });

        setOtherCars(carsPositions);
        // changeCarsSpeedWhenReachBehindCar();
      }, 25);

      return () => {
        clearInterval(setCarsPositions);
      };
    }
  }, [setOtherCars, otherCars, gameStatus]);
}
