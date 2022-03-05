import { useTranslation } from "react-i18next";
import UKRFlag from "../../medias/images/UGT_Asset_FlagSelector_UKR.svg";
import ENFlag from "../../medias/images/UGT_Asset_FlagSelector_UKR.svg";
import styles from "./LanguageSelector.module.css";

export interface LanguageSelectorProps {}

const flagMap = {
  en: ENFlag,
  uk: UKRFlag,
};

export const LanguageSelector: React.FunctionComponent<LanguageSelectorProps> = () => {
  const { i18n } = useTranslation();
  const lang = i18n.language === "en" ? "uk" : "en";
  return (
    <div onClick={() => i18n.changeLanguage(lang)}>
      <img className={styles.flagIcon} src={flagMap[lang]} alt="" />
      {i18n.language.toUpperCase()}
    </div>
  );
};
