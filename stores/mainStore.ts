"use client";

import { GameStatusEnum } from "@/enums";
import { create } from "zustand";

export type State = {
  gameStatus: GameStatusEnum;
  speed: number;
  traffic: number;
};

export type Actions = {
  setGameStatus: (gameStatus: GameStatusEnum) => void;
};

export const useMainStore = create<State & Actions>()((set) => ({
  gameStatus: GameStatusEnum.Started,
  speed: 20,
  traffic: 1000,
  setGameStatus(gameStatus) {
    set({ gameStatus: gameStatus });
  },
}));
