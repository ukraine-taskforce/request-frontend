import React from "react";
import styles from "./NumberInput.module.css";

import minusIcon from "../../medias/images/UGT_Asset_UI_Quantities_Minus.svg";
import plusIcon from "../../medias/images/UGT_Asset_UI_Quantities_Plus.svg";

export interface NumberInputProps {
  value: number;
  label: string;
  minVal?: number;
  maxVal?: number;
  onChange: (value: number) => void;
}

export const NumberInput: React.FunctionComponent<NumberInputProps> = ({ value, label, minVal = 0, maxVal = 10, onChange }) => {
  return (
    <span className={styles.wrapper}>
      <img
        className={styles.button}
        onClick={() => {
          if (value <= minVal) return;
          onChange(value - 1);
        }}
        style={{ opacity: value <= minVal ? 0.5 : 1 }}
        src={minusIcon}
        alt="-"
      />
      <input 
        className={styles.input} 
        type="number"
        value={value <= minVal ? "" : value} 
        placeholder="0"
        aria-label={label}
        onChange={(event) => 
          onChange(
            Math.min(maxVal, 
              Math.max(minVal, 
                parseInt(event.target.value) || 0
          )))}
      />
      <img
        className={styles.button}
        onClick={() => {
          if (value >= maxVal) return;
          onChange(value + 1);
        }}
        style={{ opacity: value >= maxVal ? 0.5 : 1 }}
        src={plusIcon}
        alt="+"
      />
    </span>
  );
};
