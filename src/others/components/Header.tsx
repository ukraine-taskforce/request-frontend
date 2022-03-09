import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import styles from "./Header.module.css";
import { LanguageSelector } from "./LanguageSelector";
import { Spacer } from "./Spacer";
import { Text } from "./Text";

import { ImgBack } from "../../medias/images/UGT_Asset_UI_Back";
import { ImgShare } from "../../medias/images/UGT_Asset_UI_Share_Icon";

import { isShareSupported, useShare } from "../helpers/share";

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
    <div {...props} className={`${styles.headerCard} ${className ?? ""}`}>
      {children}
    </div>
  );
};

export const Header: React.FunctionComponent<HeaderProps> = ({ backLink, hasAbout = false, hasShare = false, handleAbout }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { share } = useShare();

  return (
    <nav className={styles.wrapper}>
      {hasAbout && (
        <HeaderCard onClick={handleAbout}>
          <Text>{t("about_button")}</Text>
        </HeaderCard>
      )}
      {Boolean(backLink) && (
        <div className={styles.headerItem} onClick={() => backLink && navigate(backLink)}>
          <ImgBack alt={t("back")} className={styles.backIcon} />
          {t("back")}
        </div>
      )}
      <Spacer flex={1} />
      <LanguageSelector />
      {hasShare && isShareSupported() && (
        <HeaderCard onClick={share}>
          <ImgShare className={styles.shareIcon} alt={t("share")} />
        </HeaderCard>
      )}
    </nav>
  );
};
