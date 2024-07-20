import { useLayoutEffect } from "react";
import { StyleSheet, View } from "react-native";
import IconButton from "../components/ui/IconButton";
import { GlobalStyles } from "../utils/constants";
import Button from "../components/ui/Button";
import useExpenseContext from "../store/expenses-context";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";

const ManageExpenses = ({
  route,
  navigation,
}: {
  route: any;
  navigation: any;
}) => {
  const editedExpenseId = route.params?.expenseId;
  const isEditing = !!editedExpenseId;

  const { expenses, deleteExpense, updateExpense, addExpense } =
    useExpenseContext();

  const selectedExpense = expenses.find(
    (expense) => expense.id === editedExpenseId
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Editar registro" : "Crear registro",
    });
  }, [navigation, isEditing]);

  const deleteExpenseHandler = () => {
    if (editedExpenseId) {
      deleteExpense(editedExpenseId);
    }
    navigation.goBack();
  };
  const cancelHandler = () => {
    navigation.goBack();
  };
  const confirmHandler = (expenseData: {
    quantity: number;
    date: Date;
    description: string;
  }) => {
    if (isEditing) {
      updateExpense({
        id: editedExpenseId,
        amount: expenseData.quantity,
        description: expenseData.description,
        date: expenseData.date,
      });
    } else {
      addExpense({
        description: expenseData.description,
        amount: expenseData.quantity,
        date: expenseData.date,
      });
    }

    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <ExpenseForm
        submitButtonLabel={isEditing ? "Actualizar" : "Agregar"}
        onCancel={cancelHandler}
        onSubmit={confirmHandler}
        defaultValues={selectedExpense!}
      />

      {isEditing && (
        <View style={styles.deleteContainers}>
          <IconButton
            icon="trash"
            color={GlobalStyles.colors.error500}
            size={36}
            onPress={deleteExpenseHandler}
          />
        </View>
      )}
    </View>
  );
};

export default ManageExpenses;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },

  deleteContainers: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderBottomColor: GlobalStyles.colors.primary200,
    alignItems: "center",
  },
});
