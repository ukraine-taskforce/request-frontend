import styles from "./Button.module.css";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  fullWidth?: boolean;
}

export const Button: React.FunctionComponent<ButtonProps> = ({ fullWidth, ...props }) => {
  return <button className={styles.button} style={{ width: fullWidth ? "100%" : "auto" }} {...props} />;
};
