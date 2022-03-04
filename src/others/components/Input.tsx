import React from "react";
import styles from "./Input.module.css";

import crossIcon from "../../medias/images/UGT_Asset_UI_Close.svg";

export interface InputProps {
  icon?: React.ReactChild;
  value: string;
  label: string;
  placeholder: string;
  onChange: (value: string) => void;
}

export const Input: React.FunctionComponent<InputProps> = ({ icon, value, placeholder, label, onChange }) => {
  return (
    <div className={styles.wrapper}>
      {Boolean(icon) && <span className={styles.icon}>{icon}</span>}
      <input
        className={styles.input}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        aria-label={label}
      />
      {value.length > 0 && <img className={styles.clear} onClick={() => onChange("")} src={crossIcon} alt="clear value" />}
    </div>
  );
};
