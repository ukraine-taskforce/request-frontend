import { useTranslation } from "react-i18next";

export interface LanguageSelectorProps {}

export const LanguageSelector: React.FunctionComponent<LanguageSelectorProps> = () => {
  const { i18n } = useTranslation();

  return <div onClick={() => i18n.changeLanguage(i18n.language === "en" ? "uk" : "en")}>{i18n.language}</div>;
};
