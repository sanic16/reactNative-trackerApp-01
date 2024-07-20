import { StyleSheet, Text, View } from "react-native";
import Input from "./Input";
import { useState } from "react";
import Button from "../ui/Button";

const ExpenseForm = ({
  onCancel,
  onSubmit,
  submitButtonLabel,
  defaultValues,
}: {
  onCancel: () => void;
  onSubmit: (expenseData: {
    quantity: number;
    date: Date;
    description: string;
  }) => void;
  submitButtonLabel: string;
  defaultValues: Expense | undefined;
}) => {
  const [inputValue, setInputValues] = useState({
    quantity: defaultValues ? defaultValues?.amount : 0,
    date: defaultValues ? new Date(defaultValues.date).toISOString() : "",
    description: defaultValues ? defaultValues.description : "",
  });

  const inputChangeHandler = (
    inputIdentifier: "quantity" | "date" | "description",
    value: string
  ) => {
    setInputValues((prev) => {
      //   console.log(inputValue);
      return {
        ...prev,
        [inputIdentifier]: value,
      };
    });
  };

  const confirmHandler = () => {
    const expenseData = {
      quantity: +inputValue.quantity,
      date: new Date(inputValue.date),
      description: inputValue.description,
    };

    onSubmit(expenseData);
  };

  return (
    <View style={styles.formContainer}>
      <Text style={styles.title}>Agregar Gasto</Text>
      <View style={styles.inputsRow}>
        <Input
          label="Cantidad"
          textInputConfig={{
            keyboardType: "decimal-pad",
            onChangeText: (value) => inputChangeHandler("quantity", value),
            value: inputValue.quantity.toString(),
          }}
          style={styles.rowInput}
        />
        <Input
          label="Fecha"
          textInputConfig={{
            placeholder: "YYYY-MM-DD",
            maxLength: 10,
            onChangeText: (value) => inputChangeHandler("date", value),
            value: inputValue.date,
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
          onChangeText: (value) => inputChangeHandler("description", value),
          value: inputValue.description,
        }}
      />
      <View style={styles.buttonsContiner}>
        <Button flat onPress={onCancel} style={styles.button}>
          Cancel
        </Button>
        <Button onPress={confirmHandler} style={styles.button}>
          {submitButtonLabel}
        </Button>
      </View>
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
  buttonsContiner: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 16,
  },
  button: {
    minWidth: 120,
  },
});
