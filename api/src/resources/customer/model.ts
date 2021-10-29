import mongoose from "mongoose";
import { v4 as uuidv4 } from 'uuid';

// An inteface that describes the properties that a customer-small.json Document has
interface CustomerDoc extends mongoose.Document {
  uuid: string;
  merchant_customer_id: string;
  first_name: string,
  last_name: string,
  email: string,
  gender: string,
  country: string,
  city: string,
  street: string,
  phone: string,
}

// An inteface that describes the properties that a customer-small.json Model has
interface CustomerModel extends mongoose.Model<CustomerDoc> {}

const customerSchema = new mongoose.Schema(
  {
    uuid: {
      type: String,
      default: () => uuidv4(), 
      index: true
    },
    merchant_customer_id: {
      type: String,
      required: true,
      index: true
    },
    first_name: {
      type: String,
      required: true
    },
    last_name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    gender: {
      type: String,
      required: true
    },
    country: {
      type: String,
      required: true
    },
    city: {
      type: String,
      required: true
    },
    street: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      required: true
    },
  },
  {
    toJSON: {
      transform(dec, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
      versionKey: false,
    },
  }
);

const Customer = mongoose.model<CustomerDoc, CustomerModel>("Customer", customerSchema);

export { Customer };