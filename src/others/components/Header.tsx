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

export interface HeaderCardProps extends React.AllHTMLAttributes<HTMLDivElement> {}

// in same file as tightly bound
export const HeaderCard: React.FunctionComponent<HeaderCardProps> = ({ children, className, ...props }) => {
  return (
    <React.Fragment>
      <div {...props} className={`${styles.headerCard} ${className ?? ""}`}>
        {children}
      </div>
    </React.Fragment>
  );
};

export const Header: React.FunctionComponent<HeaderProps> = ({ backLink, hasAbout = false, hasShare = false, handleAbout }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleShare = React.useCallback(() => {
    share(t("ugt"));
  }, [t]);

  return (
    <nav className={styles.wrapper}>
      {hasAbout && (
        <HeaderCard onClick={handleAbout}>
          <Text>{t("about_button")}</Text>
        </HeaderCard>
      )}
      {Boolean(backLink) && (
        <div className={styles.headerItem} onClick={() => backLink && navigate(backLink)}>
          <img src={backIcon} alt={t("back")} className={styles.backIcon} />
          {t("back")}
        </div>
      )}
      <Spacer flex={1} />
      <LanguageSelector />
      {hasShare && isShareSupported() && (
        <HeaderCard onClick={handleShare}>
          <img className={styles.shareIcon} src={shareIcon} alt={t("share")} />
        </HeaderCard>
      )}
    </nav>
  );
};
