import { useTranslation } from "react-i18next";

import { Card } from "./Card";
import styles from "./Modal.module.css";

import { ImgClose } from "../../medias/images/UGT_Asset_UI_Close";

export interface ModalProps {
  handleClose: () => void;
  show: boolean;
}

export const Modal: React.FunctionComponent<ModalProps> = ({ handleClose, show, children }) => {
  const { t } = useTranslation();

  const modalOuter = (show ? styles.displayBlock : styles.displayNone) + " " + styles.modal;
  return (
    <div className={modalOuter}>
      <section className={styles.modalInner}>
        <Card>
          {children}
          <button className={styles.closeButton} onClick={handleClose}>
            <ImgClose alt={t("close")} />
          </button>
        </Card>
      </section>
    </div>
  );
};
