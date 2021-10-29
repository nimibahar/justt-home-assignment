import React,  { FC, ReactElement } from 'react';
import { useQuery } from "react-query";
import { Modal, Spinner } from 'reactstrap';
import TransactionCard from './TransactionCard';
import TransactionForm from './TransactionForm';
import { TransactionType, FormType } from './types';
import { getTransactions } from '../../api/transaction/actions';
import styles from './style.module.scss';

const TransactionList: FC = (): ReactElement => {
  const { data, isError, isLoading } = useQuery(['tx-list'], getTransactions);
  const [open, setOpen] = React.useState<boolean>(false);
  const [formType, setFormType] = React.useState<FormType | undefined>(undefined);
  const [targetTransactionUuid, setTargetTransactionUuid] = React.useState<string>('');

  if (isError) {
    return <div>Something went wrong...Please refresh and try again</div>
  }

  if (isLoading) {
    return <div className={styles.centered}><Spinner /></div>
  }

  const toggle = (mode: FormType) => {
    setFormType(open ? undefined : mode)
    setOpen(!open)
  };

  const targetTransactionData = targetTransactionUuid 
    ? data?.find(({ uuid: transactionUuid }: TransactionType) => transactionUuid === targetTransactionUuid)
    : null;

  return (
    <>
      <Modal
        isOpen={open}
        toggle={() => setOpen(!open)}
      >
        <TransactionForm 
          defaultValues={targetTransactionData} 
          formType={formType}
          onSuccessfullAction={setOpen}
        />
      </Modal>
      <div className={styles.grid}>
        {data?.map((transaction: TransactionType) => (
          <TransactionCard 
            key={transaction.uuid}
            transactionData={transaction} 
            toggleTransactionModal={toggle}
            setTargetTransactionUuid={() => setTargetTransactionUuid(transaction.uuid)}
          />
        ))}
        <TransactionCard 
          toggleTransactionModal={toggle} 
          setTargetTransactionUuid={() => setTargetTransactionUuid('')}
        />
      </div>
    </>
  )
}

export default TransactionList;