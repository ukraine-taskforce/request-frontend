export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const Button: React.FunctionComponent<ButtonProps> = (props) => {
  return <button {...props} />;
};
