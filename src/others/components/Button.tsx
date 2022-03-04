import React from "react";
import styles from "./Button.module.css";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  fullWidth?: boolean;
  leadingIcon?: React.ReactChild;
  trailingIcon?: React.ReactChild;
}

export const Button: React.FunctionComponent<ButtonProps> = ({ fullWidth, children, leadingIcon, trailingIcon, ...props }) => {
  return (
    <button className={styles.button} style={{ width: fullWidth ? "100%" : "auto" }} {...props}>
      {Boolean(leadingIcon) && <span className={styles.leadingIcon}>{leadingIcon}</span>}
      {children}
      {Boolean(trailingIcon) && <span className={styles.trailingIcon}>{trailingIcon}</span>}
    </button>
  );
};
