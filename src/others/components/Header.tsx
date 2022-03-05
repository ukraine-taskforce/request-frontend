import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import styles from "./Header.module.css";
import { LanguageSelector } from "./LanguageSelector";
import { Text } from "./Text";

import backIcon from "../../medias/images/UGT_Asset_UI_Back.svg";
import shareIcon from "../../medias/images/UGT_Asset_UI_Share_Icon.svg";
import { Spacer } from "./Spacer";
import React from "react";
import { isShareSupported, share } from "../helpers/share";

export interface HeaderProps {
  backLink?: string;
  hasAbout?: boolean;
  hasShare?: boolean;
  handleAbout?: () => void;
}

export interface HeaderProps {}

export const Header: React.FunctionComponent<HeaderProps> = ({
  backLink,
  hasAbout = false,
  hasShare = false,
  handleAbout,
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleShare = React.useCallback(() => {
    share(t("ugt"));
  }, [t]);

  return (
    <nav className={styles.wrapper}>
      {hasAbout && (
        <div className={styles.headerCard} onClick={handleAbout}>
          <Text>{t("about_button")}</Text>
        </div>
      )}
      {Boolean(backLink) && (
        <div className={styles.headerItem} onClick={() => backLink && navigate(backLink)}>
          <img src={backIcon} alt={t("back")} className={styles.backIcon} />
          {t("back")}
        </div>
      )}
      <Spacer flex={1} />
      <div className={styles.headerCard}>
        <LanguageSelector />
      </div>
      {hasShare && (
        <div className={`${styles.headerCard} ${!isShareSupported() ? "hide" : ""}`} onClick={handleShare}>
          <img className={styles.shareIcon} src={shareIcon} alt={t("share")} />
        </div>
      )}
    </nav>
  );
};
