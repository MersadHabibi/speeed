export type IconSvgProps = React.SVGProps<SVGSVGElement> & {
  size?: number;
};

export type TPosition = {
  top: number;
  bottom: number;
  left: number;
  right: number;
  width: number;
  height: number;
};

export type TCarLine = "left" | "center" | "right";

export type TCarStyle = {
  id: number;
  name: string;
  src: string;
  price: number;
  bonus: number;
};

export type TPlayerCar = {
  position?: TPosition;
  YPosition: number;
  line: TCarLine;
  carStyle: TCarStyle;
};

export type TOtherCar = {
  id: number;
  position?: TPosition;
  line: TCarLine;
  speed: number;
  carStyle: TCarStyle;
};
