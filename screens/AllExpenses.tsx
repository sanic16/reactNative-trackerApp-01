import { Text, View } from "react-native";
import ExpensesOutput from "../components/expenses-output/ExpensesOutput";
import { DUMMY_EXPENSES } from "../utils/data";

const AllExpenses = () => {
  return <ExpensesOutput expenses={DUMMY_EXPENSES} periodName="Total" />;
};

export default AllExpenses;
