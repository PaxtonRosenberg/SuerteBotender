import { createContext } from 'react';
import type { Drinks } from '../lib/api';

export type AppContextValues = {
  drinks: Drinks[] | undefined;
  ingredients: string;
  measurements: string | undefined;
  instructions: string | undefined;
  ingredientsList: string[];
  randomDrink: Drinks[] | undefined;
  setIngredients: (x: string) => void;
  setMeasurements: (x: string) => void;
  setInstructions: (x: string) => void;
  setIngredientsList: (x: string[]) => void;
  setRandomDrink: (x: Drinks[]) => void;
  getRecipe: () => void;
};

export const AppContext = createContext<AppContextValues>({
  drinks: undefined,
  ingredients: '',
  measurements: undefined,
  instructions: undefined,
  ingredientsList: [],
  randomDrink: undefined,
  setIngredients: () => undefined,
  setMeasurements: () => undefined,
  setInstructions: () => undefined,
  setIngredientsList: () => undefined,
  getRecipe: () => undefined,
  setRandomDrink: () => undefined,
});
