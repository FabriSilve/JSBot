import { Router, Response, Request } from 'express';

import { configs } from '../configs';
import { Client } from './client';


export const botRouter: Router = Router();

const bot = new Client(configs.bot);
bot.loadTriggers();

botRouter.get("/", (req: Request, res: Response) => {
  res.json(bot.getMe());
});

botRouter.post("/", bot.processMessage);
