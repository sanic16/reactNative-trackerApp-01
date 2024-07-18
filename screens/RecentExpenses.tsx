import { Text, View } from "react-native";
import ExpensesOutput from "../components/expenses-output/ExpensesOutput";
import { DUMMY_EXPENSES } from "../utils/data";

const RecentExpenses = () => {
  return <ExpensesOutput expenses={DUMMY_EXPENSES} periodName="Last 7 Days" />;
};

export default RecentExpenses;
