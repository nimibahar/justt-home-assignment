import { Router } from 'express';
import { createTransaction, getTransaction, getAllTransactions, updateTransaction, deleteTransaction } from './controller'

const router = Router();

router.get("/", getAllTransactions);
router.get("/get", getTransaction);
router.post("/create", createTransaction);
router.put("/update", updateTransaction);
router.delete("/delete", deleteTransaction);

export { router as transactionRouter }