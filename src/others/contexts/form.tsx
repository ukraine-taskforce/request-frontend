import React from "react";

export interface FormData {
  people: {
    adults: number;
    children: number;
    infants: number;
  }
  location?: number;
  supplies: number[]
}

export interface FormContextValue {
  currentValue: FormData;
  updateValue: (values: { [x: string]: any }) => void;
  clearStore: () => void;
}

const defaultValue: FormData = {
  people: {
    adults: 0,
    children: 0,
    infants: 0,
  },
  supplies: []
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
        people: {
          ...currentValue.people,
          ...values.people,
        },
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
