import React from "react"

const DataContext = React.createContext({})

export function useData() {
  return React.useContext(DataContext)
}

export const DataContextProvider: React.FunctionComponent = ({ children }) => {
  const [currentValue, setCurrentValue] = React.useState<Record<string, any>>({})
  const udpateKeyValue = React.useCallback(
    (key: string, value: any) => {
      setCurrentValue({
        ...currentValue,
        [key]: value,
      })
    },
    [currentValue, setCurrentValue]
  )

  const clearStore = React.useCallback(() => {
    setCurrentValue({})
  }, [setCurrentValue])

  return (
    <DataContext.Provider
      value={{
        currentValue,
        udpateKeyValue,
        clearStore,
      }}
    >
      {children}
    </DataContext.Provider>
  )
}
