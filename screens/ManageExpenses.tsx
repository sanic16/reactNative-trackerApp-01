import { useLayoutEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import IconButton from "../components/ui/IconButton";
import { GlobalStyles } from "../utils/constants";
import Button from "../components/ui/Button";
import useExpenseContext from "../store/expenses-context";

const ManageExpenses = ({
  route,
  navigation,
}: {
  route: any;
  navigation: any;
}) => {
  const editedExpenseId = route.params?.expenseId;
  const isEditing = !!editedExpenseId;

  const { deleteExpense, updateExpense, addExpense } = useExpenseContext();

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
  const confirmHandler = () => {
    if (isEditing) {
      updateExpense({
        id: "a1",
        description: "un helado para la angela",
        amount: 24,
        date: new Date(),
      });
    } else {
      addExpense({
        description: "un iphone",
        amount: 9999,
        date: new Date(),
      });
    }

    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonsContiner}>
        <Button flat onPress={cancelHandler} style={styles.button}>
          Cancel
        </Button>
        <Button onPress={confirmHandler} style={styles.button}>
          {isEditing ? "Update" : "Add"}
        </Button>
      </View>
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
  buttonsContiner: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 16,
  },
  button: {
    minWidth: 120,
  },
  deleteContainers: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderBottomColor: GlobalStyles.colors.primary200,
    alignItems: "center",
  },
});
