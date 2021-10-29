import { API_BASE_URL } from '../util';
import { TransactionType } from '../../components/transaction/types'

export async function getTransactions() {
  try {
    const response = await fetch(`${API_BASE_URL}/transaction`);
    if (!response.ok) {
      throw new Error("Problem fetching data");
    }
    const transactions = await response.json();
    return transactions
  } catch (error) {
    console.error(error);
  }
}

export async function createTransaction(transactionData: TransactionType) {
  try {
    const response = await fetch(`${API_BASE_URL}/transaction/create`, {
      method: "POST",
      body: JSON.stringify(transactionData)
    });
    if (!response.ok) {
      throw new Error("Problem fetching data");
    }
    const transaction = await response.json();
    return transaction
  } catch (error) {
    console.error(error);
  }
}

export async function updateTransaction(transactionData: TransactionType) {
  try {
    const response = await fetch(`${API_BASE_URL}/transaction/update`, {
      method: "PUT",
      body: JSON.stringify(transactionData)
    });
    if (!response.ok) {
      throw new Error("Problem fetching data");
    }
    const transaction = await response.json();
    return transaction
  } catch (error) {
    console.error(error);
  }
}

export async function deleteTransaction(uuid: string) {
  try {
    const response = await fetch(`${API_BASE_URL}/transaction/delete`, {
      method: "DELETE",
      body: JSON.stringify({ uuid })
    });
    if (!response.ok) {
      throw new Error("Problem fetching data");
    }
    const transaction = await response.json();
    return transaction
  } catch (error) {
    console.error(error);
  }
}