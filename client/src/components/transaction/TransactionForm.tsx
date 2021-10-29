import React, { FC, ReactElement } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Form, Label, Button, Container, Spinner } from 'reactstrap';
import { TransactionType, FormType } from './types';
import { createTransaction, updateTransaction, deleteTransaction } from '../../api/transaction/actions';
import styles from './style.module.scss';

interface ITransactionFormProps {
  defaultValues?: TransactionType;
  formType: FormType | undefined;
  onSuccessfullAction: (value: React.SetStateAction<boolean>) => void;
}

type FormInputs = {
  total_price: number;
  currency: string;
  cerdit_card_type: string;
  cerdit_card_number: number;
  uuid: string;
};


const TransactionForm: FC<ITransactionFormProps> = ({ 
  defaultValues,
  formType,
  onSuccessfullAction: showModal
}): ReactElement => { 
  const { register, handleSubmit } = useForm<FormInputs>();
  const queryClient = useQueryClient()
  const { 
    mutateAsync: createMutation, 
    status: createStatus 
  } = useMutation(createTransaction, {
    onSuccess: () => {
      queryClient.invalidateQueries('tx-list');
      showModal(false);
    },
  })
  const { 
    mutateAsync: updateMutation, 
    status: updateStatus 
  } = useMutation(updateTransaction, {
    onSuccess: () => {
      queryClient.invalidateQueries('tx-list');
      showModal(false);
    },
  })
  const { 
    mutateAsync: deleteMutation, 
    status: deleteStatus 
  } = useMutation(deleteTransaction, {
    onSuccess: () => {
      queryClient.invalidateQueries('tx-list');
      showModal(false);
    },
  })

  const onSubmit: SubmitHandler<FormInputs> = (formValues) => {
    try {
      if (formType === FormType.DELETE && defaultValues?.uuid) {
        return deleteMutation(defaultValues?.uuid);
      }
      if (formType === FormType.EDIT && formValues && defaultValues?.uuid) {
        return updateMutation({ ...formValues, uuid: defaultValues?.uuid });
      }
      if (formType === FormType.CREATE && formValues) {
        return createMutation({ ...formValues });
      }
    } catch (error) {
      console.error(error)
    }
  }

  if ([createStatus, updateStatus, deleteStatus].includes('loading')) {
    return <div className={styles.centered}><Spinner /></div>
  }

  return (
    <Container>
      <Form onSubmit={handleSubmit(onSubmit)}>
        {formType === FormType.DELETE ? (
          <>
            <div className={styles.section}>
              If you're sure of what you're doing, hit the delete button...
            </div>
            <div className={styles.section}>
              <Button type="submit" color="danger">
                Delete 
              </Button>
            </div>  
          </>
        ): (
          <>
            <div className={styles.section}>
              <Label>Total Price</Label>
              <input className="form-control" {...register("total_price")} defaultValue={defaultValues?.total_price || 0} />
            </div>
            <div className={styles.section}>
              <Label>Currency</Label>
              <input className="form-control" {...register("currency")} defaultValue={defaultValues?.currency || ''} />
            </div>
            <div className={styles.section}>
              <Label>Credit Card Type</Label>
              <input className="form-control" {...register("cerdit_card_type")} defaultValue={defaultValues?.cerdit_card_type || ''} />
            </div>
            <div className={styles.section}>
              <Label>Credit Card Number</Label>
              <input className="form-control" {...register("cerdit_card_number")} defaultValue={defaultValues?.cerdit_card_number || 0} />
            </div>
            <div className={styles.section}>
              <Button type="submit" color="primary">
                {formType === FormType.EDIT ? 'Update' : 'Submit'}
              </Button>
            </div>
          </>
        )}
        </Form>
    </Container>
  )
}
  
export default TransactionForm;