import React from "react";
import { useTranslation } from "react-i18next";
import UKRFlag from "../../medias/images/UGT_Asset_FlagSelector_UKR.svg";
import ENFlag from "../../medias/images/UGT_Asset_FlagSelector_ENG.svg";
import styles from "./LanguageSelector.module.css";
import { AvailableLang, availableLangs } from "../contexts/i18n";
import { HeaderCard } from "./Header";
import dropdownIcon from "../../medias/images/UGT_Asset_UI_Dropdown.svg"

export interface LanguageSelectorProps {}

const flagMap = {
  en: ENFlag,
  uk: UKRFlag,
};

export const LanguageSelector: React.FunctionComponent<LanguageSelectorProps> = () => {
  const { i18n } = useTranslation();

  const [expanded, setExpanded] = React.useState(false);

  const currentLang = i18n.language as AvailableLang;

  const selectLang = (lang: string) => {
    i18n.changeLanguage(lang);
    setExpanded(false);
  };

  return (
    <div className={styles.selector} onClick={() => setExpanded(!expanded)}>
      <HeaderCard>
        <img className={styles.flagIcon} src={flagMap[currentLang]} alt="" />
        <span>{currentLang.toUpperCase()}</span>
        <img className={styles.dropdownIcon} src={dropdownIcon} alt="" />
      </HeaderCard>
      {expanded && (
        <HeaderCard className={styles.dropdown}>
          {availableLangs
            .filter((lang) => lang !== currentLang)
            .map((lang) => {
              return (
                <div className={styles.dropdownItem} onClick={() => selectLang(lang)}>
                  <img className={styles.flagIcon} src={flagMap[lang as AvailableLang]} alt="" />
                  <span>{lang.toUpperCase()}</span>
                </div>
              );
            })}
        </HeaderCard>
      )}
    </div>
  );
};
