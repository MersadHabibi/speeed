"use client";

import { CheckIcon, ShoppingCartIcon } from "@/components/modules/icons";
import { addShoppingHistory } from "@/lib/utils";
import { useMainStore } from "@/store/mainStore";
import { TCarStyle } from "@/types";
import Image from "next/image";
import { memo, useCallback, useMemo } from "react";
import toast from "react-hot-toast";
import { usePlayerCarStore } from "../playerCar/playerCarStore";
import { useCarStyleStore } from "./carStyleStore";

export default memo(function CarStyleCard({
  carStyle,
}: {
  carStyle: TCarStyle;
}) {
  const purchasedCarStyles = useCarStyleStore(
    (state) => state.purchasedCarStyles,
  );
  const buyCarStyle = useCarStyleStore((state) => state.buyCarStyle);

  const playerCar = usePlayerCarStore((state) => state.playerCar);
  const setPlayerCarStyle = usePlayerCarStore(
    (state) => state.setPlayerCarStyle,
  );

  const tokens = useMainStore((state) => state.tokens);
  const setTokens = useMainStore((state) => state.setTokens);

  const isPurchased = useMemo(
    () =>
      purchasedCarStyles.some(
        (purchasedCarStyle) => purchasedCarStyle.id === carStyle.id,
      ),
    [purchasedCarStyles, carStyle.id],
  );

  const isSelected = useMemo(
    () => playerCar.carStyle.id === carStyle.id,
    [carStyle.id, playerCar.carStyle.id],
  );

  const onBuyCarStyle = useCallback(() => {
    if (tokens > carStyle.price) {
      buyCarStyle(carStyle);
      setTokens(tokens - carStyle.price);
      toast("The car was bought.");

      addShoppingHistory(carStyle);
    } else {
      toast.error("Your token is not enough.");
    }
  }, [buyCarStyle, carStyle, tokens, setTokens]);

  const onSelectCarStyle = useCallback(() => {
    setPlayerCarStyle(carStyle);
    toast("The car is selected.");
  }, [carStyle, setPlayerCarStyle]);

  return (
    <div className="card bg-neutral-900">
      <div className="mx-auto max-w-16">
        <Image
          src={carStyle.src}
          width={200}
          height={200}
          alt={carStyle.name}
          className="object-contain"
        />
      </div>
      <div className="mt-2 flex flex-col gap-y-1">
        <div className="card-title">{carStyle.name}</div>
        <p className="text-center text-gray-300">
          Bonus for each car :{" "}
          <span className="text-green-500">${carStyle.bonus}</span>
        </p>
      </div>

      <hr className="card-divider" />
      <div className="card-footer">
        <div className="card-price">
          <span>$</span>{" "}
          {carStyle.price ? carStyle.price.toLocaleString("EN") : "FREE"}
        </div>
        {isPurchased ? (
          isSelected ? (
            <button className="card-btn border-blue-500 text-blue-500">
              <CheckIcon className="size-6 fill-none !transition-none" />
            </button>
          ) : (
            <button className="card-btn" onClick={onSelectCarStyle}>
              <CheckIcon className="size-6 fill-none !transition-none" />
            </button>
          )
        ) : (
          <button
            className="card-btn hover:!border-blue-500 hover:text-blue-500"
            onClick={onBuyCarStyle}>
            <ShoppingCartIcon className="size-6 fill-none !transition-none" />
          </button>
        )}
      </div>
    </div>
  );
});
