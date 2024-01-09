import { create } from "zustand";

type SearchKeywordState = {
  keyword: string;
  setKeyword: (keyword: string) => void;
};

export const useSearchKeywordStore = create<SearchKeywordState>((set) => ({
  keyword: "",
  setKeyword: (keyword) => set({ keyword }),
}));
