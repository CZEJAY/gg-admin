import { create } from "zustand";

export type PriceContext = {
  originalPrice: number;
  percentage: number;
  isDiscounted: boolean;
  setOriginalPrice: (value: number) => void;
  setPercentage: (value: number) => void;
  setIsDiscounted: (value: boolean) => void;
};

export const usePriceStore = create<PriceContext>((set) => ({
  isDiscounted: false,
  originalPrice: 0,
  percentage: 0,
  setIsDiscounted: (value) => set((state) => ({ isDiscounted: value })),
  setOriginalPrice: (value) =>
    set((state) => ({ originalPrice: value })),
  setPercentage: (value) => set((state) => ({ percentage: value })),
}));
