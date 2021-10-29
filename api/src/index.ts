import express, { Request, Response } from 'express';
import { json, urlencoded } from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
require("dotenv").config();
import routes from './routes';
import { seedCustomerData } from './resources/customer/services/seed';
import { seedTransactionData } from './resources/transaction/services/seed';

const { MONGO_CONNECTION_STRING } = process.env;

const app = express();

app.disable('x-powered-by');
app.use(cors());
app.use(urlencoded({ extended: true }));
app.use(json({ type: ['application/json', 'text/*', 'json'] }));
app.use(routes);

const start = async () => {
  try {
    await mongoose.connect(MONGO_CONNECTION_STRING as string)
    console.log('############################')
    console.log('#   *   *   ****   ****    #')
    console.log('#    * *    *      *  *    #')
    console.log('#     *     *      *  *    #')
    console.log('#     *     ****   * **    #')
    console.log('#     *     *      *       #')
    console.log('#     *     *      *       #')
    console.log('#     *     ****   *       #')
    console.log('############################')

    await seedCustomerData()
    await seedTransactionData()
  } catch (error) {
    console.error(error)
  }

  app.listen(4000, () => {
    console.log(`Server running on port 4000`);
  });
}

start()


app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    hello: "Justt"
  })
})