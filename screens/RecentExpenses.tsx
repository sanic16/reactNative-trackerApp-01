import { Text, View } from "react-native";
import ExpensesOutput from "../components/expenses-output/ExpensesOutput";
import { DUMMY_EXPENSES } from "../utils/data";
import useExpenseContext from "../store/expenses-context";
import { getDateMinusDays } from "../utils/date";

const RecentExpenses = () => {
  const { expenses } = useExpenseContext();
  const recentExpenses = expenses.filter((expense) => {
    const today = new Date();
    const today7DaysAgo = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() - 7
    );
    // console.log(today7DaysAgo, new Date(expense.date));
    // console.log(today7DaysAgo < new Date(expense.date));
    return today7DaysAgo < new Date(expense.date);
  });
  return (
    <ExpensesOutput
      expenses={recentExpenses}
      periodName="Last 7 Days"
      fallbackText="No hay gastos recientes"
    />
  );
};

export default RecentExpenses;
