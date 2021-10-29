import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

// An inteface that describes the properties that a Transaction Document has
interface TransactionDoc extends mongoose.Document {
  uuid: string;
  _customer_id: string,
  total_price: number,
  currency: string,
  cerdit_card_type: string,
  cerdit_card_number: number
}

// An inteface that describes the properties that a Transaction Model has
interface TransactionModel extends mongoose.Model<TransactionDoc> {}

const transactionSchema = new mongoose.Schema(
  {
    uuid: {
      type: String,
      default: () => uuidv4(),
      unique: true, 
      index: true
    },
    _customer_id: {
      type: mongoose.Schema.Types.ObjectId, ref: 'Customer',
    },
    total_price: {
      type: Number,
      required: true
    },
    currency: {
      type: String,
      required: true
    },
    cerdit_card_type: {
      type: String,
      required: true
    },
    cerdit_card_number: {
      type: Number,
      required: true
    }
  },
  {
    toJSON: {
      transform(dec, ret) {
        delete ret._id;
      },
      versionKey: false,
    },
  }
);

const Transaction = mongoose.model<TransactionDoc, TransactionModel>("Transaction", transactionSchema);

export { Transaction };