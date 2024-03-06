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
          content: `You are a bartender specializing in making drinks with Suerte brand tequila and specific, household ingredients.`,
        },
        {
          role: 'user',
          content: `I have ${tequila} tequila and following ingredients: ${ingredients}. Can you provide me with both ingredients, measurements and directions to make a tasty cocktail with the ingredients listed? Output the results with drinkName, ingredients, and instructions.`,
        },
      ],
      model: 'gpt-3.5-turbo',
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
