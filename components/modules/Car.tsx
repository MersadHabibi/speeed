import { cn } from "@/lib/utils";
import { TCarStyle } from "@/types";
import Image from "next/image";
import { forwardRef } from "react";

type TProps = {
  className?: string;
  carStyle: TCarStyle;
  onAnimationEnd?: () => void;
};

export default forwardRef(function Car(
  props: TProps,
  ref: React.LegacyRef<HTMLDivElement> | undefined,
) {
  return (
    <div
      ref={ref}
      className={cn("h-fit w-full rounded-md transition-all", props.className)}>
      <Image
        src={props.carStyle.src}
        width={70}
        height={100}
        alt={props.carStyle.name}
        className="size-full object-contain"
        priority={true}
      />
    </div>
  );
});
