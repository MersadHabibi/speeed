import { useCallback, useEffect, useState } from "react";
import { useFuelStore } from "./fuelStore";

const ONE_FUEL_FOR_HOW_MANY_TIME = 300_000;

export function useAddFuel() {
  const [totalTime, setTotalTime] = useState(0);
  const [totalTimeInLocalStorage, setTotalTimeInLocalStorage] = useState(0);
  const [timeSpentOnPage, setTimeSpentOnPage] = useState(0); // in milliseconds

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
    } else {
      setTimeSpentOnPage(0);
      setTotalTimeInLocalStorage(0);
      localStorage.setItem("totalTime", "0");
      setTotalTime(0);
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
}
