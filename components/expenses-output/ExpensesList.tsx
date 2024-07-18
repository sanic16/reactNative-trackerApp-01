import { FlatList, View } from "react-native";
import ExpenseItem from "./ExpenseItem";

const ExpensesList = ({ expenses }: { expenses: Expense[] }) => {
  return (
    <FlatList
      data={expenses}
      renderItem={({ item }) => <ExpenseItem expense={item} />}
      keyExtractor={(item) => item.id}
    />
  );
};

export default ExpensesList;
