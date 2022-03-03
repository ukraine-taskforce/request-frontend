export interface ButtonProps {
}
  
export const Button: React.FunctionComponent<ButtonProps> = ({children}) => {
    return <button>{children}</button>
}