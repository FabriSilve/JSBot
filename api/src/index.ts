import express, { Application, Response, Request } from 'express';
import bodyParser from 'body-parser';

import { configs } from './configs';
import { botRouter } from './bot';
import { connectMongoose } from './utils/connectMongoose';


connectMongoose();

const server: Application = express();
server.use(bodyParser.json());

server.get("/", (req: Request, res: Response) => res.json({ status: "OK" }));
server.use("/bot", botRouter);

const serverport = configs.serverPort;
server.listen(serverport);
