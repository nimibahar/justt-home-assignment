import { Router, Request, Response } from "express";
import { transactionRouter } from './resources/transaction/routes';

const appRouter = Router();

appRouter.use('/transaction', transactionRouter)

appRouter.get('/health-check', (req: Request, res: Response) => {
  res.status(200).send("I'm Alive")
})


export default appRouter