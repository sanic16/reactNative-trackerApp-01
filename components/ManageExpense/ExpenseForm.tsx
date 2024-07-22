import { Alert, StyleSheet, Text, View } from "react-native";
import Input from "./Input";
import { useState } from "react";
import Button from "../ui/Button";
import { GlobalStyles } from "../../utils/constants";

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
  const [inputs, setInputs] = useState({
    quantity: {
      value: defaultValues ? defaultValues?.amount : 12,
      isValid: true,
    },
    date: {
      value: defaultValues
        ? new Date(defaultValues.date).toISOString()
        : new Date().toISOString().slice(0, 10),
      isValid: true,
    },
    description: {
      value: defaultValues
        ? defaultValues.description
        : "Un pantalón marca patito",
      isValid: true,
    },
  });

  const inputChangeHandler = (
    inputIdentifier: "quantity" | "date" | "description",
    value: string
  ) => {
    setInputs((prev) => {
      //   console.log(inputValue);
      return {
        ...prev,
        [inputIdentifier]: { value: value, isValid: true },
      };
    });
  };

  const confirmHandler = () => {
    const expenseData = {
      quantity: +inputs.quantity.value,
      date: new Date(inputs.date.value),
      description: inputs.description.value,
    };

    const amountIsValid =
      !isNaN(expenseData.quantity) && expenseData.quantity > 0;
    const dateIsValid = expenseData.date.toString() !== "Invalid Date";
    const descriptionIsValid = expenseData.description.trim().length > 0;

    if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
      setInputs((prev) => {
        return {
          quantity: {
            value: prev.quantity.value,
            isValid: amountIsValid,
          },
          description: {
            value: prev.description.value,
            isValid: descriptionIsValid,
          },
          date: {
            value: prev.date.value,
            isValid: dateIsValid,
          },
        };
      });
      // Alert.alert(
      //   "Tipos de datos incorrectos",
      //   "Por favor verifica los campos"
      // );
      return;
    }

    onSubmit(expenseData);
  };

  const formIsInvalid =
    !inputs.quantity.isValid ||
    !inputs.date.isValid ||
    !inputs.description.isValid;

  return (
    <View style={styles.formContainer}>
      <Text style={styles.title}>Agregar Gasto</Text>
      <View style={styles.inputsRow}>
        <Input
          label="Cantidad"
          textInputConfig={{
            keyboardType: "decimal-pad",
            onChangeText: (value) => inputChangeHandler("quantity", value),
            value: inputs.quantity.value.toString(),
          }}
          style={styles.rowInput}
          invalid={!inputs.quantity.isValid}
        />
        <Input
          label="Fecha"
          textInputConfig={{
            placeholder: "YYYY-MM-DD",
            maxLength: 10,
            onChangeText: (value) => inputChangeHandler("date", value),
            value: inputs.date.value,
            // defaultValue: new Date().toISOString().slice(0, 10),
          }}
          style={styles.rowInput}
          invalid={!inputs.date.isValid}
        />
      </View>

      <Input
        label="Descripción"
        textInputConfig={{
          multiline: true,
          //   autoCorrect: false, // true is the default
          //   autoCapitalize: "sentences", // sentences is the default
          onChangeText: (value) => inputChangeHandler("description", value),
          value: inputs.description.value,
        }}
        invalid={!inputs.description.isValid}
      />
      {formIsInvalid && (
        <Text style={styles.errorText}>
          Datos incorrectos - Por favor verifica los campos
        </Text>
      )}
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
  errorText: {
    textAlign: "center",
    color: GlobalStyles.colors.error500,
    margin: 8,
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
