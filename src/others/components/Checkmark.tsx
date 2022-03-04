import styles from "./Checkmark.module.css";

import checkmarkIcon from "../../medias/images/UGT_Asset_UI_Confirmation.svg";

export interface CheckmarkProps {
  checked: boolean;
  className?: string;
}

export const Checkmark: React.FunctionComponent<CheckmarkProps> = ({ checked, className }) => {
  return (
    <span className={`${styles.checkmark} ${checked ? styles.checked : ""} ${className ? className : ""}`}>
      {checked && <img alt="checkmar" src={checkmarkIcon} className={styles.img} />}
    </span>
  );
};
