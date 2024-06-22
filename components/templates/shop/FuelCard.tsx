import Image from "next/image";

import { FuelIcon } from "@/components/modules/icons";
import { addShoppingHistory } from "@/lib/utils";
import { useMainStore } from "@/store/mainStore";
import { TFuelItem } from "@/types";
import { memo, useCallback } from "react";
import toast from "react-hot-toast";
import { useFuelStore } from "../fuel/fuelStore";

export default memo(function FuelCard({ fuelItem }: { fuelItem: TFuelItem }) {
  const fuel = useFuelStore((state) => state.fuel);
  const setFuel = useFuelStore((state) => state.setFuel);

  const tokens = useMainStore((state) => state.tokens);
  const setTokens = useMainStore((state) => state.setTokens);

  const onBuyFuel = useCallback(() => {
    if (tokens < fuelItem.price)
      return toast.error("Your token is not enough.");

    if (fuel + fuelItem.amountOfFuel < 100) {
      setFuel(fuel + fuelItem.amountOfFuel);
      setTokens(tokens - fuelItem.price);
      toast("Fuel was purchased.");

      addShoppingHistory(fuelItem);
    } else {
      toast.error("Your fuel is full");
    }
  }, [fuel, setFuel, fuelItem, tokens, setTokens]);

  return (
    <div className="card bg-neutral-900">
      <div className="mx-auto max-w-16">
        <Image
          src={"/images/fuel.png"}
          width={200}
          height={200}
          alt={fuelItem.name}
          className="object-contain"
        />
      </div>
      <div className="mt-2 flex flex-col gap-y-1">
        <div className="card-title">{fuelItem.name}</div>
        <p className="text-center text-gray-300">
          amount of fuel :
          <span className="text-yellow-600"> {fuelItem.amountOfFuel / 20}</span>
        </p>
      </div>

      <hr className="card-divider" />
      <div className="card-footer">
        <div className="card-price">
          <span>$</span>{" "}
          {fuelItem.price ? fuelItem.price.toLocaleString("EN") : "FREE"}
        </div>

        <button
          className="card-btn hover:!border-blue-500 hover:text-blue-500"
          onClick={onBuyFuel}>
          <FuelIcon className="size-5 fill-none !transition-none" />
        </button>
      </div>
    </div>
  );
});
