type Expense = {
  id: string;
  description: string;
  date: Date;
  amount: number;
};

type fetchedExpense = {
  id: number;
  description: string;
  date: string;
  amount: number;
};

type ExpenseWithoutId = Omit<Expense, "id">;

type ExpenseContext = {
  expenses: Expense[];
  addExpense: (expense: Expense) => void;
  deleteExpense: (id: string) => void;
  updateExpense: (expense: Expense) => void;
};
