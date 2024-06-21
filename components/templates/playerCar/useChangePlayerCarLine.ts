import { GameStatusEnum } from "@/enums";
import { useMainStore } from "@/store/mainStore";
import { useEffect, useState } from "react";
import { usePlayerCarStore } from "./playerCarStore";

export default function useChangePlayerCarLine() {
  const [startTouchXPosition, setStartTouchXPosition] = useState<number | null>(
    null,
  );

  const playerCar = usePlayerCarStore((state) => state.playerCar);
  const setPlayerCarLine = usePlayerCarStore((state) => state.setPlayerCarLine);

  const gameStatus = useMainStore((state) => state.gameStatus);

  useEffect(() => {
    if (gameStatus === GameStatusEnum.Started) {
      const changeCarLineHandler = (direction: "left" | "right") => {
        console.log(direction);
        // On move to left
        if (direction === "left") {
          setPlayerCarLine(
            playerCar.line === "right"
              ? "center"
              : playerCar.line === "center"
                ? "left"
                : "left",
          );
        }
        // On move to right
        else if (direction === "right") {
          setPlayerCarLine(
            playerCar.line === "left"
              ? "center"
              : playerCar.line === "center"
                ? "right"
                : "right",
          );
        }
      };

      // Desktop

      const onChangeCarLineWithKeyboard = (event: KeyboardEvent) => {
        // On move to left
        if (
          event.key === "a" ||
          event.key === "A" ||
          event.key === "ArrowLeft"
        ) {
          changeCarLineHandler("left");
        }
        // On move to right
        else if (
          event.key === "d" ||
          event.key === "D" ||
          event.key === "ArrowRight"
        ) {
          changeCarLineHandler("right");
        }
      };

      // Mobile

      const onTouchUp = (event: TouchEvent) => {
        if (!startTouchXPosition) return;

        setStartTouchXPosition(null);
      };

      const onTouchStart = (event: TouchEvent) => {
        setStartTouchXPosition(() => event.touches[0].clientX);
      };

      const onTouchMove = (event: TouchEvent) => {
        let clientX = event.changedTouches[0].clientX;
        if (!startTouchXPosition) {
          return;
        }

        if (startTouchXPosition < clientX - 50) {
          setStartTouchXPosition(() => clientX);

          changeCarLineHandler("right");
        } else if (startTouchXPosition > clientX + 50) {
          setStartTouchXPosition(() => clientX);

          changeCarLineHandler("left");
        }
      };

      window.addEventListener("keydown", onChangeCarLineWithKeyboard);
      window.addEventListener("touchend", onTouchUp);
      window.addEventListener("touchstart", onTouchStart);
      window.addEventListener("touchmove", onTouchMove);

      return () => {
        window.removeEventListener("keydown", onChangeCarLineWithKeyboard);
        window.removeEventListener("touchend", onTouchUp);
        window.removeEventListener("touchstart", onTouchStart);
        window.removeEventListener("touchmove", onTouchMove);
      };
    }
  }, [gameStatus, playerCar.line, setPlayerCarLine, startTouchXPosition]);
}
