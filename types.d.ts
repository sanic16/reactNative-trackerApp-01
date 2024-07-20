type Expense = {
  id: string;
  description: string;
  date: date;
  amount: number;
};

type ExpenseWithoutId = Omit<Expense, "id">;

type ExpenseContext = {
  expenses: Expense[];
  addExpense: (expense: ExpenseWithoutId) => void;
  deleteExpense: (id: string) => void;
  updateExpense: (expense: Expense) => void;
};
