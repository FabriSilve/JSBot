import { Router, Response, Request } from 'express';

const botRouter : Router = Router();

botRouter.get('/', (req : Request, res : Response) => res.send('BOT'));

export default botRouter;