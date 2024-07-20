import { StyleSheet, Text, View } from "react-native";
import Input from "./Input";

const ExpenseForm = () => {
  const amountChangeHandler = () => {};
  const dateChangeHandler = () => {};
  return (
    <View style={styles.formContainer}>
      <Text style={styles.title}>Agregar Gasto</Text>
      <View style={styles.inputsRow}>
        <Input
          label="Cantidad"
          textInputConfig={{
            keyboardType: "decimal-pad",
            onChangeText: amountChangeHandler,
          }}
          style={styles.rowInput}
        />
        <Input
          label="Fecha"
          textInputConfig={{
            placeholder: "YYYY-MM-DD",
            maxLength: 10,
            onChangeText: dateChangeHandler,
          }}
          style={styles.rowInput}
        />
      </View>

      <Input
        label="Descripción"
        textInputConfig={{
          multiline: true,
          //   autoCorrect: false, // true is the default
          //   autoCapitalize: "sentences", // sentences is the default
        }}
      />
    </View>
  );
};

export default ExpenseForm;

const styles = StyleSheet.create({
  formContainer: {
    marginTop: 40,
  },
  inputsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rowInput: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginVertical: 24,
    textAlign: "center",
  },
});
