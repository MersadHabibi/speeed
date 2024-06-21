import { GameStatusEnum } from "@/enums";
import { useMainStore } from "@/store/mainStore";
import { TPosition } from "@/types";
import { useEffect } from "react";
import { useOtherCarsStore } from "../otherCars/otherCarsStore";
import { usePlayerCarStore } from "./playerCarStore";

type TProps = {
  playerCarRef: React.MutableRefObject<null>;
};

export default function useAccident(props: TProps) {
  const gameStatus = useMainStore((state) => state.gameStatus);
  const setGameStatus = useMainStore((state) => state.setGameStatus);

  const playerCar = usePlayerCarStore((state) => state.playerCar);
  const setPlayerCarPositions = usePlayerCarStore(
    (state) => state.setPlayerCarPositions,
  );

  const otherCars = useOtherCarsStore((state) => state.otherCars);

  useEffect(() => {
    if (gameStatus === GameStatusEnum.Started) {
      const interval = setInterval(() => {
        const playerCarElement = props.playerCarRef
          .current as unknown as React.DetailedHTMLProps<
          React.HTMLAttributes<HTMLDivElement>,
          HTMLDivElement
        >;

        const playerCarPositions: TPosition = {
          // @ts-ignore
          right: playerCarElement.getBoundingClientRect().right,
          // @ts-ignore
          left: playerCarElement.getBoundingClientRect().left,
          // @ts-ignore
          top: playerCarElement.getBoundingClientRect().top,
          // @ts-ignore
          bottom: playerCarElement.getBoundingClientRect().bottom,
          // @ts-ignore
          height: playerCarElement.getBoundingClientRect().height,
          // @ts-ignore
          width: playerCarElement.getBoundingClientRect().width,
        };

        setPlayerCarPositions(playerCarPositions);

        otherCars?.some((otherCar) => {
          if (otherCar.position) {
            if (
              ((otherCar.position?.bottom >= playerCarPositions.top &&
                otherCar.position?.bottom <= playerCarPositions.bottom) ||
                (otherCar.position?.top >= playerCarPositions.top &&
                  otherCar.position?.top <= playerCarPositions.bottom)) &&
              ((otherCar.position?.left <= playerCarPositions.right &&
                otherCar.position?.left >= playerCarPositions.left) ||
                (otherCar.position?.right >= playerCarPositions.left &&
                  otherCar.position?.right <= playerCarPositions.right))
            ) {
              // if (gameStatus === GameStatusEnum.Restart) return null;
              setGameStatus(GameStatusEnum.Accident);
            }
          }
        });
      }, 2);

      return () => {
        clearInterval(interval);
      };
    }
  }, [gameStatus, otherCars, setGameStatus, setPlayerCarPositions, props]);
}
