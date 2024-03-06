import { createContext } from 'react';
import type { Drinks } from '../lib/api';

export type AppContextValues = {
  drinks: Drinks[] | undefined;
  ingredients: string;
  ingredientsList: string[];
  randomDrink: Record<string, string>;
  tequila: string;
  setIngredients: (x: string) => void;
  setIngredientsList: (x: string[]) => void;
  setRandomDrink: (x: Record<string, string>) => void;
  setTequila: (x: string) => void;
  getRecipe: () => void;
};

export const AppContext = createContext<AppContextValues>({
  drinks: undefined,
  ingredients: '',
  ingredientsList: [],
  randomDrink: {},
  tequila: '',
  setIngredients: () => undefined,
  setIngredientsList: () => undefined,
  setTequila: () => undefined,
  getRecipe: () => undefined,
  setRandomDrink: () => undefined,
});
