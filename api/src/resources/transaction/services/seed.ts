import { Transaction } from '../model';

const seedData = [
  {
    total_price: 1329.12,
    currency: "NIO",
    cerdit_card_type: "mastercard",
    cerdit_card_number: 5010126046192324
  },
  {
    total_price: 4257.95,
    currency: "problem",
    cerdit_card_type: "visa-electron",
    cerdit_card_number: 4508672811329403
  },
  {
    total_price: 4213.02,
    currency: "CUP",
    cerdit_card_type: "jcb",
    cerdit_card_number: 3537300561420746
  },
  {
    total_price: 847.10,
    currency: "CNY",
    cerdit_card_type: "visa",
    cerdit_card_number: 4041371907379
  },
  {
    total_price: 3420.94,
    currency: "EUR",
    cerdit_card_type: "switch",
    cerdit_card_number: 633110643696828708 
  },
  {
    total_price: 8799.10,
    currency: "AFN",
    cerdit_card_type: "jcb",
    cerdit_card_number: 3555799617754676
  },
  {
    total_price: 2396.21,
    currency: "UZS",
    cerdit_card_type: "jcb",
    cerdit_card_number: 3570774585323755
  }
]

export const seedTransactionData = async () => {
  try {
    const transactions = await Transaction.find({});

  if (transactions?.length) {
    console.log('Transactions found no seed needed');
    return;
  }

  const seedResult = await Transaction.insertMany(seedData);
  console.log('Seed result', seedResult);

  } catch (error) {
    console.error('failed to seed transactions');
  }
}