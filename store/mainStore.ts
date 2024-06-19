"use client";

import { GameStatusEnum } from "@/enums";
import { create } from "zustand";

export type State = {
  gameStatus: GameStatusEnum;
  speed: number;
  maxSpeed: number;
  traffic: number;
  maxTraffic: number;
};

export type Actions = {
  setGameStatus: (gameStatus: GameStatusEnum) => void;
  setSpeed: (speed: number) => void;
  setTraffic: (traffic: number) => void;
};

export const useMainStore = create<State & Actions>()((set) => ({
  gameStatus: GameStatusEnum.NotStarted,
  speed: 30, // less number == high speed
  maxSpeed: 10,
  traffic: 2000, // less number == more traffic
  maxTraffic: 1000,
  setGameStatus(gameStatus) {
    set({ gameStatus: gameStatus });
  },
  setSpeed(speed) {
    set({ speed });
  },
  setTraffic(traffic) {
    set({ traffic });
  },
}));
