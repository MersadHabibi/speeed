import { GameStatusEnum } from "@/enums";
import { useMainStore } from "@/store/mainStore";
import { useEffect } from "react";

const INCREASE_TIME = 5000;

export default function useIncreaseSpeedAndTrafficByTime() {
  const traffic = useMainStore((state) => state.traffic);
  const maxTraffic = useMainStore((state) => state.maxTraffic);
  const speed = useMainStore((state) => state.speed);
  const maxSpeed = useMainStore((state) => state.maxSpeed);
  const setSpeed = useMainStore((state) => state.setSpeed);
  const setTraffic = useMainStore((state) => state.setTraffic);
  const gameStatus = useMainStore((state) => state.gameStatus);

  useEffect(() => {
    if (gameStatus !== GameStatusEnum.Started) return;
    const increaseSpeedAndTrafficInterval = setInterval(() => {
      if (maxSpeed < speed) setSpeed(speed - 1);

      if (maxTraffic < traffic) setTraffic(traffic - 50);

      console.log(traffic, speed);
    }, INCREASE_TIME);

    return () => {
      clearInterval(increaseSpeedAndTrafficInterval);
    };
  }, [setSpeed, setTraffic, speed, traffic, gameStatus, maxTraffic, maxSpeed]);
}
