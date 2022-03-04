import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import styles from "./Header.module.css";
import { LanguageSelector } from "./LanguageSelector";
import { Text } from "./Text";

import backIcon from "../../medias/images/UGT_Asset_UI_Back.svg";
import shareIcon from "../../medias/images/UGT_Asset_UI_Share_Icon.svg";
import { Spacer } from "./Spacer";

export interface HeaderProps {
  hasBackButton?: boolean;
  hasAbout?: boolean;
  hasShare?: boolean;
  handleAbout?: () => void;
}

export interface HeaderProps {}

export const Header: React.FunctionComponent<HeaderProps> = ({
  hasBackButton = false,
  hasAbout = false,
  hasShare = false,
  handleAbout,
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <nav className={styles.wrapper}>
      {hasAbout && (
        <div className={styles.headerCard} onClick={handleAbout}>
          <Text>About us</Text>
        </div>
      )}
      <div>
        {hasBackButton && (
          <div className={styles.headerItem} onClick={() => navigate(-1)}>
            <img src={backIcon} alt={t("back")} className={styles.backIcon} />
            {t("back")}
          </div>
        )}
      </div>
      <Spacer flex={1} />
      <div className={styles.headerCard}>
        <LanguageSelector />
      </div>
      {hasShare && (
        <div className={styles.headerCard}>
          <img className={styles.shareIcon} src={shareIcon} alt={t("share")} />
        </div>
      )}
    </nav>
  );
};
