export type TransactionType = {
  uuid: string,
  total_price: number,
  currency: string,
  cerdit_card_type: string,
  cerdit_card_number: number
}

export enum FormType {
  EDIT = "edit",
  CREATE = "create",
  DELETE = "delete",
}

export interface ITransactionCardProps {
  transactionData?: TransactionType;
  toggleTransactionModal: any;
}