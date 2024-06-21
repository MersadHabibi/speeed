"use client";

import { CheckIcon, ShoppingCartIcon } from "@/components/modules/icons";
import { TCarStyle } from "@/types";
import Image from "next/image";
import { memo, useEffect, useMemo } from "react";
import { usePlayerCarStore } from "../playerCar/playerCarStore";
import { useCarStyleStore } from "./carStyleStore";
import toast from "react-hot-toast";
import { useMainStore } from "@/store/mainStore";

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
  const setPlayerCar = usePlayerCarStore((state) => state.setPlayerCar);
  const setPlayerCarStyle = usePlayerCarStore(
    (state) => state.setPlayerCarStyle,
  );

  const tokens = useMainStore((state) => state.tokens);
  const setTokens = useMainStore((state) => state.setTokens);

  console.log("render");

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

  const onBuyCarStyle = () => {
    if (tokens > carStyle.price) {
      buyCarStyle(carStyle);
      setTokens(tokens - carStyle.price);
      toast("The car was bought.");
    } else {
      toast.error("Your token is not enough.");
    }
  };

  const onSelectCarStyle = () => {
    setPlayerCarStyle(carStyle);
    toast("The car is selected.");
  };

  return (
    <div className="card">
      <div className="mx-auto max-w-16">
        <Image
          src={carStyle.src}
          width={200}
          height={200}
          alt={carStyle.name}
          className="object-contain"
        />
      </div>
      <div className="card-title my-1">{carStyle.name}</div>

      <hr className="card-divider" />
      <div className="card-footer">
        <div className="card-price">
          <span>$</span> {carStyle.price.toLocaleString("EN")}
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
