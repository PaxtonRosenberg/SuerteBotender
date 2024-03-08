import { createContext } from 'react';
import type { Drink } from '../lib/api';

export type AppContextValues = {
  pantryInput: string;
  generatedDrink: Drink;
  tequila: string;
  isLoading: boolean;
  setPantryInput: (x: string) => void;
  setGeneratedDrink: (x: Drink) => void;
  setTequila: (x: string) => void;
  setIsLoading: (x: boolean) => void;
  getRecipe: () => void;
};

export const AppContext = createContext<AppContextValues>({
  pantryInput: '',
  generatedDrink: { name: '', ingredients: [], instructions: [] },
  tequila: '',
  isLoading: true,
  setPantryInput: () => undefined,
  setGeneratedDrink: () => undefined,
  setTequila: () => undefined,
  setIsLoading: () => undefined,
  getRecipe: () => undefined,
});
