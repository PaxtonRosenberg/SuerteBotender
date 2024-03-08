/* eslint-disable @typescript-eslint/no-unused-vars -- Remove when used */
import 'dotenv/config';
import express from 'express';
import {
  ClientError,
  defaultMiddleware,
  errorMiddleware,
} from './lib/index.js';
import OpenAI from 'openai';

const openai = new OpenAI();

const app = express();

app.use(express.json());

app.post('/api/botender', async (req, res) => {
  try {
    if (!(req.body.tequila && req.body.ingredients)) {
      throw new Error('Invalid Body');
    }
    const { tequila, ingredients } = req.body;
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: `
            You are a bartender specializing in making drinks with Suerte brand tequila and specific ingredients.

            Example Output:

            "Name: Pina-Lime-Suerte

            Ingredients:
            - 2 oz Suerte Tequila Blanco
            - 1/2 cup chopped pineapple
            - Juice of 1 lime
            - Ice

            Instructions:
            1. In a cocktail shaker, muddle the chopped pineapple to extract its juices.
            2. Add the Suerte Tequila Blanco, lime juice, and a handful of ice to the shaker.
            3. Shake well to chill the mixture and combine the ingredients.
            4. Strain the cocktail into a glass filled with ice.
            5. Garnish with a slice of pineapple or lime, if desired.
            6. Enjoy your refreshing Pina-Lime Suerte cocktail!" End output immediately after the instructions.
            `,
        },
        {
          role: 'user',
          content: `I have Suerte Tequila Resposado and the following ingredients:
          lemon, beef, chicken, lamb, pineapple, mint, orange, grapefruit.
          Create a fun and unqiue drink name that
          incorporates both the ingredients and Suerte branding, ingredients needed to make the drink,
          measurements for the ingredients and instructions to make a tasty cocktail. If you cannot use the some of the listed ingredients, omit the ingredients you cannot use and return the example output. `,
        },
        {
          role: 'assistant',
          content: `
            "Name: Citrus-Mint Suerte

            Ingredients:
            - 2 oz Suerte Tequila Reposado
            - Juice of 1/2 lemon
            - Juice of 1/4 grapefruit
            - Juice of 1/2 orange
            - 4-5 fresh mint leaves
            - Ice

            Instructions:
            1. In a cocktail shaker, muddle the fresh mint leaves to release their oils.
            2. Add Suerte Tequila Reposado, lemon juice, grapefruit juice, orange juice, and a handful of ice to the shaker.
            3. Shake vigorously to combine the ingredients and chill the mixture.
            4. Strain the cocktail into a glass filled with ice.
            5. Garnish with a mint sprig or a citrus slice, if desired.
            6. Enjoy your refreshing Citrus-Mint Suerte cocktail!" End output immediately after the instructions.
            `,
        },
        {
          role: 'user',
          content: `I have ${tequila} tequila and the following ingredients:
          ${ingredients}. Create a fun and unqiue drink name that
          incorporates both the ingredients and Suerte branding, ingredients needed,
          measurements for the ingredients and instructions to make a tasty cocktail.
          Make the best tasting cocktail using only the tequila and ingredients specified,
          do not add extra ingredients. If the ingredients are not edible, like socks or mold,
          let the user know with a response that begins with I'm sorry, otherwise, create a tasty cocktail.`,
        },
      ],
      model: 'gpt-4',
    });
    res.status(200).json(completion);
  } catch (err) {
    console.log(err);
    res.status(500).send();
  }
});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  process.stdout.write(`\n\napp listening on port ${process.env.PORT}\n\n`);
});
