import React from "react";
import { ID } from "./api";

export interface FormData {
  location?: ID;
  supplies: ID[];
  name: string;
  phoneNumber: string;
  comments: string;
}

export interface FormContextValue {
  currentValue: FormData;
  updateValue: (values: { [x: string]: any }) => void;
  clearStore: () => void;
}

const defaultValue: FormData = {
  name: '',
  phoneNumber: '',
  supplies: [],
  comments: '',
};

const FormContext = React.createContext<FormContextValue>({
  currentValue: defaultValue,
  updateValue: () => {},
  clearStore: () => {},
});

export function useFormValue() {
  return React.useContext(FormContext);
}

export const FormContextProvider: React.FunctionComponent = ({ children }) => {
  const [currentValue, setCurrentValue] = React.useState<FormData>(defaultValue);

  const updateValue = React.useCallback(
    (values: { [x: string]: any }) => {
      setCurrentValue({
        ...currentValue,
        ...values,
      });
    },
    [currentValue, setCurrentValue]
  );

  const clearStore = React.useCallback(() => {
    setCurrentValue(defaultValue);
  }, [setCurrentValue]);

  return (
    <FormContext.Provider
      value={{
        currentValue,
        updateValue,
        clearStore,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};
