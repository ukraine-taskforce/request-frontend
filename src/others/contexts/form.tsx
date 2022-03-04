import React from "react";

export interface FormData {
  children?: number;
  location?: number;
}

export interface FormContextValue {
  currentValue: FormData;
  udpateKeyValue: (key: keyof FormData, value: any) => void;
  clearStore: () => void;
}

const FormContext = React.createContext<FormContextValue>({
  currentValue: {},
  udpateKeyValue: () => {},
  clearStore: () => {},
});

export function useFormValue() {
  return React.useContext(FormContext);
}

export const FormContextProvider: React.FunctionComponent = ({ children }) => {
  const [currentValue, setCurrentValue] = React.useState<FormData>({});

  const udpateKeyValue = React.useCallback(
    (key: keyof FormData, value: any) => {
      setCurrentValue({
        ...currentValue,
        [key]: value,
      });
    },
    [currentValue, setCurrentValue]
  );

  const clearStore = React.useCallback(() => {
    setCurrentValue({});
  }, [setCurrentValue]);

  return (
    <FormContext.Provider
      value={{
        currentValue,
        udpateKeyValue,
        clearStore,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};
