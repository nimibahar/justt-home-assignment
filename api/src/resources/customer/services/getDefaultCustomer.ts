import { Customer } from '../model';
import { DEFAULT_MERCHANT_CUSTOMER_ID } from './seed';

export const getDefaultCustomer = async () => {
  try {
    const customer = await Customer.findOne({
      merchant_customer_id: DEFAULT_MERCHANT_CUSTOMER_ID
    })

    return customer;
  } catch (error) {
    console.error(`Failed to get default customer: ${error}`);
    throw error;
  }
}