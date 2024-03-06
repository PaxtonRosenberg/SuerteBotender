import { createContext } from 'react';
import type { Drink } from '../lib/api';

export type AppContextValues = {
  pantryInput: string;
  pantry: string[];
  generatedDrink: Record<string, string>;
  tequila: string;
  isLoading: boolean;
  setPantryInput: (x: string) => void;
  setPantry: (x: string[]) => void;
  setGeneratedDrink: (x: Drink) => void;
  setTequila: (x: string) => void;
  setIsLoading: (x: boolean) => void;
  getRecipe: () => void;
};

export const AppContext = createContext<AppContextValues>({
  pantryInput: '',
  pantry: [],
  generatedDrink: {},
  tequila: '',
  isLoading: true,
  setPantryInput: () => undefined,
  setPantry: () => undefined,
  setGeneratedDrink: () => undefined,
  setTequila: () => undefined,
  setIsLoading: () => undefined,
  getRecipe: () => undefined,
});
