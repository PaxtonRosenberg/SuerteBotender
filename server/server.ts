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
            You are a bartender specializing in making drinks with Suerte brand tequila and specific, household ingredients.

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
          content: `I have ${tequila} tequila and the following ingredients: ${ingredients}. Can you provide me with a drink name, ingredients, measurements and instructions to make a tasty cocktail only using all of the ingredients listed. Try to make the best tasting cocktail using only the tequila and ingredients specified. If the input is not a food item or the food item might be unsafe to consume, please let the user know.`,
        },
      ],
      model: 'gpt-3.5-turbo-0125',
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
