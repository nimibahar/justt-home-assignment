
import { Request, Response } from 'express';
import { Transaction } from './model';
import { getDefaultCustomer } from '../customer/services/getDefaultCustomer';

export const createTransaction = async (req: Request, res: Response) => {
  try {
    const { cerdit_card_number, cerdit_card_type, currency, total_price } = req.body;
    if (!cerdit_card_number || !cerdit_card_type || !currency || !total_price) {
      res.status(400).send('failed validation');
      return;
    }

    const customer = await getDefaultCustomer();
    if (!customer) {
      res.status(400).send('failed');
      return;
    }

    const transaction = new Transaction({
      _customer_id: customer._id,
      total_price: req.body.total_price,
      currency: req.body.currency,
      cerdit_card_type: req.body.cerdit_card_type,
      cerdit_card_number: req.body.cerdit_card_number,
    });
  
    await transaction.save();
    
    res.status(201).send(transaction.toJSON());
  } catch (error) {
    console.error('failed to create a transaction');
    res.status(400).send('failed');
  }
}

export const getTransaction = async (req: Request, res: Response) => {
  try {
    const { uuid } = req.params;
    if(!uuid) {
      res.status(400).send('failed');
      return;
    }

    const transaction = await Transaction.findOne({ uuid });

    if (!transaction) {
      console.error(`failed to get a transaction for uuid`);
      return;
    }
    
    res.status(200).send(transaction.toJSON());  
  } catch (error) {
    console.error(`failed to get a transaction`);
    res.status(400).send('failed');
  }
}

export const getAllTransactions = async (req: Request, res: Response) => {
  try {
    const transactions = await Transaction.find({});
    const mappedTransactions = transactions.map(transaction => transaction.toJSON());
    
    res.status(200).send(mappedTransactions);
  } catch (error) {
    console.error(`failed to create a get transaction list`);
    res.status(400).send('failed');
  }
}

export const updateTransaction = async (req: Request, res: Response) => {
  try {
    const { uuid, ...toUpdate } = req.body;
    if (!uuid) {
      res.status(400).send('failed');
      return;
    }

    const filter = { uuid };
    const transaction = await Transaction.findOneAndUpdate(filter, toUpdate, {
      new: true
    });

    if (!transaction) {
      console.error(`failed to update a transaction for uuid ${uuid}`);
      return;
    }

    res.status(203).send(transaction.toJSON());
  } catch (error) {
    console.error(`failed to update transaction`);
    res.status(400).send('failed');
  }
}

export const deleteTransaction = async (req: Request, res: Response) => {
  try {
    const { uuid } = req.body;
    if (!uuid) {
      res.status(400).send('failed');
      return;
    }

    await Transaction.findOneAndDelete({ uuid });

    res.status(201).send('success');
  } catch (error) {
    console.error(`failed to delete transaction with uuid`);
    res.status(400).send('failed');
  }
}
  
