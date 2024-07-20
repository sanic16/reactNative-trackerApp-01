import { Text, View } from "react-native";
import ExpensesOutput from "../components/expenses-output/ExpensesOutput";
import { DUMMY_EXPENSES } from "../utils/data";
import useExpenseContext from "../store/expenses-context";

const AllExpenses = () => {
  const { expenses } = useExpenseContext();
  return (
    <ExpensesOutput
      expenses={expenses}
      periodName="Total"
      fallbackText="No hay gastos"
    />
  );
};

export default AllExpenses;
