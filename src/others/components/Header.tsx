import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import styles from "./Header.module.css";
import { LanguageSelector } from "./LanguageSelector";

import backIcon from "../../medias/images/UGT_Asset_UI_Back.svg";

export interface HeaderProps {
  hasBackButton?: boolean;
}

export const Header: React.FunctionComponent<HeaderProps> = ({ hasBackButton = false }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <nav className={styles.wrapper}>
      <div>
        {hasBackButton && (
          <span className={styles.backButton} onClick={() => navigate(-1)}>
            <img src={backIcon} alt={t("back")} className={styles.backIcon} />
            {t("back")}
          </span>
        )}
      </div>
      <LanguageSelector />
    </nav>
  );
};
