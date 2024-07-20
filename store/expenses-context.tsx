import { createContext, useContext, useReducer, useState } from "react";
import { DUMMY_EXPENSES } from "../utils/data";

const ExpensesContext = createContext<ExpenseContext>({
  expenses: [],
  addExpense: (expense: ExpenseWithoutId) => {},
  deleteExpense: (id: string) => {},
  updateExpense: (expense: Expense) => {},
});

function isExpenseWithoutId(obj: any): obj is ExpenseWithoutId {
  return "description" in obj && "date" in obj && "amount" in obj;
}

function isExpense(obj: any): obj is Expense {
  return (
    "id" in obj && "description" in obj && "date" in obj && "amount" in obj
  );
}

const expensesReducer = (
  state: Expense[],
  action: {
    type: "ADD" | "UPDATE" | "DELETE";
    payload: Expense | string | ExpenseWithoutId;
  }
) => {
  switch (action.type) {
    case "ADD":
      if (isExpenseWithoutId(action.payload)) {
        return [
          ...state,
          { ...action.payload, id: `a-${Math.random() * 100}` },
        ];
      }
    case "UPDATE":
      if (isExpense(action.payload)) {
        const currentExpense = action.payload;

        const updatableExpenseIndex = state.findIndex(
          (expense) => expense.id === currentExpense.id
        );

        console.log(updatableExpenseIndex);

        const updatableExpense = state[updatableExpenseIndex];
        const updatedItem = { ...updatableExpense, ...action.payload };
        // console.log(updatedItem);
        const updatedExpenses = [...state];
        updatedExpenses[updatableExpenseIndex] = updatedItem;

        return updatedExpenses;
      }
    case "DELETE":
      if (typeof action.payload === "string") {
        return state.filter((expense) => expense.id !== action.payload);
      }
    default:
      return state;
  }
};

const initialState: Expense[] = DUMMY_EXPENSES;

export const ExpensesContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [expensesState, dispatch] = useReducer(expensesReducer, initialState);
  const addExpense = (expense: ExpenseWithoutId) => {
    dispatch({ type: "ADD", payload: expense });
  };
  const deleteExpense = (id: string) => {
    dispatch({ type: "DELETE", payload: id });
  };

  const updateExpense = (expense: Expense) => {
    dispatch({ type: "UPDATE", payload: expense });
  };

  return (
    <ExpensesContext.Provider
      value={{
        expenses: expensesState,
        addExpense,
        deleteExpense,
        updateExpense,
      }}
    >
      {children}
    </ExpensesContext.Provider>
  );
};

const useExpenseContext = () => useContext(ExpensesContext);
export default useExpenseContext;
