import React, { FC, ReactElement } from 'react';
import { Button } from 'reactstrap';
import styles from './style.module.scss';
import { TransactionType, FormType } from './types';

interface ITransactionCardProps {
  transactionData?: TransactionType;
  toggleTransactionModal: (value: React.SetStateAction<string>) => void;
  setTargetTransactionUuid: (value: React.SetStateAction<string>) => void;
}

const TransactionCard: FC<ITransactionCardProps> = ({ 
  transactionData, 
  toggleTransactionModal, 
  setTargetTransactionUuid
}): ReactElement => {
  const toggler = (type: FormType): void => {
    setTargetTransactionUuid(transactionData?.uuid || '');
    toggleTransactionModal(type);
  }
  
  if (!transactionData) {
    return (
      <div className={styles.card} onClick={() => toggler(FormType.CREATE)}>
        <h5>Create a new transaction</h5>
        <div className={styles.circle}></div>
      </div>
    )
  }

  return  (
    <div key={transactionData?.uuid} className={styles.card}>
      {Object.entries(transactionData).map(([key, value]) => (
        <div key={key} className={styles.cardDataRow}>
          <span>{key}: </span>
          {value ? <span>{value}</span> : null}
        </div>
      ))}
      <div className="d-flex justify-content-between w-100">
        <Button 
          onClick={() => toggler(FormType.EDIT)} 
          color="primary">
            Update Transaction Data
        </Button>
        <Button 
          onClick={() => toggler(FormType.DELETE)} 
          color="danger">
            Delete
        </Button>
      </div>
    </div>
  )
}

export default TransactionCard;