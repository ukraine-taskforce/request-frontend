import styles from "./Checkmark.module.css";

import { ImgConfirmation } from "../../medias/images/UGT_Asset_UI_Confirmation";

export interface CheckmarkProps {
  checked: boolean;
  className?: string;
}

export const Checkmark: React.FunctionComponent<CheckmarkProps> = ({ checked, className }) => {
  return (
    <span className={`${styles.checkmark} ${checked ? styles.checked : ""} ${className ? className : ""}`}>
      {checked && <ImgConfirmation alt="checkmar" className={styles.img} />}
    </span>
  );
};
