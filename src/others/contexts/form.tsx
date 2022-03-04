import React from "react";

export interface FormData {
  adults: number;
  children: number;
  infants: number;
  location?: number;
}

export interface FormContextValue {
  currentValue: FormData;
  updateValue: (values: { [x: string]: any }) => void;
  clearStore: () => void;
}

const defaultValue = {
  adults: 0,
  children: 0,
  infants: 0,
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
