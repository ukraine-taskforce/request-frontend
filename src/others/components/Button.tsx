import React from "react";
import styles from "./Button.module.css";
import { Spacer } from "./Spacer";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "normal" | "highlight" | "white";
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
  className,
  variant = "normal",
  ...props
}) => {
  return (
    <button
      className={`${className} ${styles.button} ${variant !== "normal" ? styles[variant] : ""}`}
      style={{ width: fullWidth ? "100%" : "auto" }}
      {...props}
    >
      <span className={styles.label}>{children}</span>
      <div className={styles.iconsContainer}>
        {Boolean(leadingIcon) && <span className={styles.leadingIcon}>{leadingIcon}</span>}
        <Spacer flex={1}></Spacer>
        {Boolean(trailingIcon) && <span className={styles.trailingIcon}>{trailingIcon}</span>}
      </div>
    </button>
  );
};
