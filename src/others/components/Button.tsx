import React from "react";
import styles from "./Button.module.css";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  fullWidth?: boolean;
  icon?: React.ReactChild;
}

export const Button: React.FunctionComponent<ButtonProps> = ({ fullWidth, children, icon, ...props }) => {
  return (
    <button className={styles.button} style={{ width: fullWidth ? "100%" : "auto" }} {...props}>
      {children}
      {Boolean(icon) && <span className={styles.icon}>{icon}</span>}
    </button>
  );
};
