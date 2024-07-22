import { useLayoutEffect } from "react";
import { StyleSheet, View } from "react-native";
import IconButton from "../components/ui/IconButton";
import { GlobalStyles } from "../utils/constants";
import useExpenseContext from "../store/expenses-context";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";
import {
  storeExpense,
  deleteExpense as removeExpense,
  updateExpense as upgradeExpense,
} from "../utils/http";

const ManageExpenses = ({
  route,
  navigation,
}: {
  route: any;
  navigation: any;
}) => {
  const editedExpenseId = route.params?.expenseId as string;
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

  const deleteExpenseHandler = async () => {
    if (editedExpenseId) {
      deleteExpense(editedExpenseId);

      await removeExpense(editedExpenseId);
    }
    navigation.goBack();
  };
  const cancelHandler = () => {
    navigation.goBack();
  };
  const confirmHandler = async (expenseData: {
    quantity: number;
    date: Date;
    description: string;
  }) => {
    if (isEditing) {
      await upgradeExpense(editedExpenseId, {
        amount: expenseData.quantity,
        description: expenseData.description,
        date: expenseData.date,
      });

      updateExpense({
        id: editedExpenseId,
        amount: expenseData.quantity,
        description: expenseData.description,
        date: expenseData.date,
      });
    } else {
      const id = await storeExpense({
        amount: expenseData.quantity,
        description: expenseData.description,
        date: expenseData.date,
      });
      if (id) {
        addExpense({
          id: id,
          description: expenseData.description,
          amount: expenseData.quantity,
          date: expenseData.date,
        });
      }
    }

    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <ExpenseForm
        submitButtonLabel={isEditing ? "Actualizar" : "Agregar"}
        onCancel={cancelHandler}
        onSubmit={confirmHandler}
        defaultValues={selectedExpense}
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
