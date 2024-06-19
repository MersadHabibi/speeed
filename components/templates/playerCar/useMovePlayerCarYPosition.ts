import { GameStatusEnum } from "@/enums";
import { useMainStore } from "@/store/mainStore";
import { useEffect, useState } from "react";
import { usePlayerCarStore } from "./playerCarStore";

type TMovingY = "back" | "front" | "stop";

export default function useMovePlayerCarYPosition() {
  const [isMovingY, setIsMovingY] = useState<TMovingY>("stop");

  const [startTouchYPosition, setStartTouchYPosition] = useState<number | null>(
    null,
  );

  const gameStatus = useMainStore((state) => state.gameStatus);

  const playerCar = usePlayerCarStore((state) => state.playerCar);
  const setPlayerCarYPosition = usePlayerCarStore(
    (state) => state.setPlayerCarYPosition,
  );

  useEffect(() => {
    if (gameStatus === GameStatusEnum.Started) {
      const moveCarHandler = (direction: "front" | "back", speed = 1) => {
        if (direction === "front") {
          setPlayerCarYPosition(playerCar.YPosition - speed);
        } else if (direction === "back") {
          setPlayerCarYPosition(playerCar.YPosition + speed);
        }
      };

      // Desktop

      let interval: any;

      const onMoveCarYPositionWithKeyboard = (event: KeyboardEvent) => {
        if (event.key === "w" || event.key === "W" || event.key === "ArrowUp") {
          setIsMovingY("front");
        } else if (
          event.key === "s" ||
          event.key === "S" ||
          event.key === "ArrowBottom"
        ) {
          setIsMovingY("back");
        }
      };

      const onStopMoveCarYPositionWithKeyboard = (event: KeyboardEvent) => {
        if (
          event.key === "w" ||
          event.key === "W" ||
          event.key === "ArrowUp" ||
          event.key === "s" ||
          event.key === "S" ||
          event.key === "ArrowBottom"
        ) {
          clearInterval(interval);
          setIsMovingY("stop");
        }
      };

      if (isMovingY !== "stop") {
        if (playerCar.YPosition < 5 || playerCar.YPosition > 85) {
          clearInterval(interval);
          setIsMovingY("stop");
          setPlayerCarYPosition(
            playerCar.YPosition < 5
              ? playerCar.YPosition + 1
              : playerCar.YPosition - 1,
          );
        } else {
          interval = setInterval(() => {
            moveCarHandler(isMovingY);
          }, 30);
        }
      }

      // Mobile

      const onTouchStart = (event: TouchEvent) => {
        setStartTouchYPosition(() => event.touches[0].clientY);
      };

      const onTouchMove = (event: TouchEvent) => {
        let clientY = event.changedTouches[0].clientY;

        if (
          !startTouchYPosition ||
          playerCar.YPosition < 5 ||
          playerCar.YPosition > 85
        ) {
          setPlayerCarYPosition(
            playerCar.YPosition < 5
              ? playerCar.YPosition + 1
              : playerCar.YPosition - 1,
          );

          return;
        }

        if (startTouchYPosition > clientY) {
          moveCarHandler(
            "front",
            (startTouchYPosition - clientY) / 7 > 1.7
              ? 1.7
              : (startTouchYPosition - clientY) / 7,
          );

          console.log((startTouchYPosition - clientY) / 7);

          setStartTouchYPosition(clientY);
        } else if (startTouchYPosition < clientY) {
          moveCarHandler(
            "back",
            (clientY - startTouchYPosition) / 7 > 1.7
              ? 1.7
              : (clientY - startTouchYPosition) / 7,
          );

          setStartTouchYPosition(clientY);
        }
      };

      window.addEventListener("keydown", onMoveCarYPositionWithKeyboard);
      window.addEventListener("keyup", onStopMoveCarYPositionWithKeyboard);
      window.addEventListener("touchstart", onTouchStart);
      window.addEventListener("touchmove", onTouchMove);

      return () => {
        window.removeEventListener("touchstart", onTouchStart);
        window.removeEventListener("touchmove", onTouchMove);
        window.removeEventListener("keydown", onMoveCarYPositionWithKeyboard);
        window.removeEventListener("keyup", onStopMoveCarYPositionWithKeyboard);
        clearInterval(interval);
      };
    }
  }, [
    gameStatus,
    isMovingY,
    playerCar.YPosition,
    setPlayerCarYPosition,
    startTouchYPosition,
  ]);
}
