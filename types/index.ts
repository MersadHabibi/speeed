export type TPosition = {
  top: number;
  bottom: number;
  left: number;
  right: number;
  width: number;
  height: number;
};

export type TCarLine = "left" | "center" | "right";

export type TMyCar = {
  position?: TPosition;
  YPosition: number;
  line: TCarLine;
};

export type TOtherCar = {
  id: number;
  position?: TPosition;
  line: TCarLine;
  speed: number;
};
