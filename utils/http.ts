import axios from "axios";
import { BASE_URL } from "./constants";

export const storeExpense = async (
  expense: ExpenseWithoutId
): Promise<string | undefined> => {
  try {
    const res = await axios.post(`${BASE_URL}/expenses`, {
      description: expense.description,
      amount: expense.amount,
      date: new Date(expense.date).toISOString().slice(0, 10),
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchAllExpenses = async (): Promise<fetchedExpense[]> => {
  try {
    const res = await axios.get(`${BASE_URL}`);
    return res.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const updateExpense = async (
  expense_id: string,
  expense: ExpenseWithoutId
) => {
  try {
    const id = parseInt(expense_id);
    await axios.put(`${BASE_URL}/expenses/${id}`, {
      description: expense.description,
      amount: expense.amount,
      date: expense.date.toISOString().slice(0, 10),
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteExpense = async (id: string) => {
  try {
    await axios.delete(`${BASE_URL}/expenses/${id}`);
  } catch (error) {
    console.log(error);
  }
};
