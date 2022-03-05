import React from "react";
import styles from "./Button.module.css";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "normal" | "highlight";
  fullWidth?: boolean;
  focus?: boolean;
  leadingIcon?: React.ReactChild;
  trailingIcon?: React.ReactChild;
}

export const Button: React.FunctionComponent<ButtonProps> = ({
  fullWidth,
  focus,
  children,
  leadingIcon,
  trailingIcon,
  variant = "normal",
  ...props
}) => {
  return (
    <button
      className={`${styles.button} ${variant === "highlight" ? styles.highlight : ""}`}
      style={{ width: fullWidth ? "100%" : "auto", backgroundColor: focus ? "var(--color-focus)" : "black" }}
      {...props}
    >
      {Boolean(leadingIcon) && <span className={styles.leadingIcon}>{leadingIcon}</span>}
      <span className={styles.label}>{children}</span>
      {Boolean(trailingIcon) && <span className={styles.trailingIcon}>{trailingIcon}</span>}
    </button>
  );
};
