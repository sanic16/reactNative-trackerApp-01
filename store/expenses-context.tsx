import { createContext, useContext, useEffect, useReducer } from "react";
import { fetchAllExpenses } from "../utils/http";

const ExpensesContext = createContext<ExpenseContext>({
  expenses: [],
  addExpense: (expense: Expense) => {},
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
      if (isExpense(action.payload)) {
        return [...state, { ...action.payload }];
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
      return state.filter((expense) => expense.id !== action.payload);
    default:
      return state;
  }
};

const initialState: Expense[] = [];
export const ExpensesContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [expensesState, dispatch] = useReducer(expensesReducer, initialState);
  const addExpense = (expense: Expense) => {
    dispatch({ type: "ADD", payload: expense });
  };
  const deleteExpense = (id: string) => {
    console.log("deleteExpense", id);
    dispatch({ type: "DELETE", payload: id });
  };

  const updateExpense = (expense: Expense) => {
    dispatch({ type: "UPDATE", payload: expense });
  };

  useEffect(() => {
    const fetchExpenses = async () => {
      const expenses = await fetchAllExpenses();
      expenses.map((expense) => {
        const transformedExpense: Expense = {
          id: expense.id.toString(),
          amount: expense.amount,
          date: new Date(expense.date),
          description: expense.description,
        };
        dispatch({ type: "ADD", payload: transformedExpense });
      });
    };
    fetchExpenses();
  }, []);

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
