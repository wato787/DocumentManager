import { create } from "zustand";

export const SortToggleType = {
  ASC: 1,
  DESC: 2,
} as const;

export type SortToggleType =
  (typeof SortToggleType)[keyof typeof SortToggleType];

type State = {
  sortToggle: SortToggleType;
  setSortToggle: (newValue: SortToggleType) => void;
};

export const useSortToggleStore = create<State>((set) => ({
  sortToggle: SortToggleType.DESC,
  setSortToggle: (newValue) => set({ sortToggle: newValue }),
}));
