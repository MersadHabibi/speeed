import { FuelIcon } from "@/components/modules/icons";
import { GameStatusEnum } from "@/enums";
import { cn } from "@/lib/utils";
import { useMainStore } from "@/store/mainStore";
import { useFuelStore } from "./fuelStore";
import { useCallback, useEffect, useState } from "react";

const ONE_FUEL_FOR_HOW_MANY_TIME = 300_000;

export default function Fuel() {
  const [totalTime, setTotalTime] = useState(0);
  const [totalTimeInLocalStorage, setTotalTimeInLocalStorage] = useState(0);
  const [timeSpentOnPage, setTimeSpentOnPage] = useState(0); // in milliseconds

  const gameStatus = useMainStore((state) => state.gameStatus);

  const fuel = useFuelStore((state) => state.fuel);
  const setFuel = useFuelStore((state) => state.setFuel);
  const getFuelFromLocalStorage = useFuelStore(
    (state) => state.getFuelFromLocalStorage,
  );

  const addFuel = useCallback(() => {
    if (fuel < 100) {
      setFuel(fuel + 20);
      setTimeSpentOnPage(0);
      setTotalTimeInLocalStorage(totalTime - ONE_FUEL_FOR_HOW_MANY_TIME);
      localStorage.setItem(
        "totalTime",
        (totalTime - ONE_FUEL_FOR_HOW_MANY_TIME).toString(),
      );
      setTotalTime(totalTime - ONE_FUEL_FOR_HOW_MANY_TIME);
    }
  }, [totalTime, fuel, setFuel]);

  useEffect(() => {
    getFuelFromLocalStorage();
  }, [getFuelFromLocalStorage]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeSpentOnPage((prevTime) => prevTime + 1000); // increment by 1 second

      setTotalTime(
        totalTimeInLocalStorage
          ? totalTimeInLocalStorage + timeSpentOnPage
          : timeSpentOnPage,
      );

      if (totalTime > ONE_FUEL_FOR_HOW_MANY_TIME) addFuel();
    }, 1000); // every 1 second
    return () => clearInterval(intervalId); // cleanup
  }, [totalTimeInLocalStorage, timeSpentOnPage, totalTime, addFuel]); // run only once on mount

  useEffect(() => {
    const handleUnload = () => {
      console.log("leave page");
      localStorage.setItem("pageLeaveTime", new Date().getTime().toString());

      localStorage.setItem(
        "totalTime",
        (totalTimeInLocalStorage
          ? totalTimeInLocalStorage + timeSpentOnPage
          : timeSpentOnPage
        ).toString(),
      );
    };
    window.addEventListener("beforeunload", handleUnload);
    return () => window.removeEventListener("beforeunload", handleUnload); // cleanup
  }, [totalTimeInLocalStorage, timeSpentOnPage]);

  useEffect(() => {
    const pageLeaveTime = localStorage.getItem("pageLeaveTime");
    if (pageLeaveTime) {
      const timeSpentSoFar = new Date().getTime() - Number(pageLeaveTime);
      setTimeSpentOnPage(timeSpentSoFar);
    }
  }, []);

  useEffect(() => {
    setTotalTimeInLocalStorage(+(localStorage.getItem("totalTime") || 0));
  }, []);

  console.log(totalTime);

  return (
    <div
      className={cn(
        "fixed inset-0 bottom-0 top-auto z-20 flex h-14 w-full items-center gap-x-4 bg-neutral-900 px-4 transition-all",
        gameStatus === GameStatusEnum.Started && "-bottom-14",
        gameStatus === GameStatusEnum.Shop && "-bottom-14",
      )}>
      <div className="flex items-center justify-center">
        <FuelIcon className="size-6" />
      </div>
      <div className="mr-2 w-full">
        <div className="relative flex h-2 w-full items-center justify-evenly overflow-hidden rounded-full bg-yellow-600/30">
          <div
            className="absolute inset-0 -z-10 bg-yellow-600 transition-all"
            style={{
              width: fuel + "%",
            }}></div>
          <div className="h-full w-0.5 bg-white/80"></div>
          <div className="h-full w-0.5 bg-white/80"></div>
          <div className="h-full w-0.5 bg-white/80"></div>
          <div className="h-full w-0.5 bg-white/80"></div>
        </div>
      </div>
    </div>
  );
}
