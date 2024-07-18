import { Text, View } from "react-native";

const ExpensesSummary = ({
  expenses,
  periodName,
}: {
  expenses: Expense[];
  periodName: string;
}) => {
  const expensesSum = expenses.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );

  return (
    <View>
      <Text>{periodName}</Text>
      <Text>${expensesSum.toFixed(2)}</Text>
    </View>
  );
};

export default ExpensesSummary;
