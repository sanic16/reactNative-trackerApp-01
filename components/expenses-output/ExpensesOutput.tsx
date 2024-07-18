import { View } from "react-native";
import ExpensesSummary from "./ExpensesSummary";
import ExpensesList from "./ExpensesList";

const ExpensesOutput = ({
  expenses,
  periodName,
}: {
  expenses: Expense[];
  periodName: string;
}) => {
  return (
    <View>
      <ExpensesSummary periodName={periodName} expenses={expenses} />
      {/* <ExpensesList /> */}
    </View>
  );
};

export default ExpensesOutput;
