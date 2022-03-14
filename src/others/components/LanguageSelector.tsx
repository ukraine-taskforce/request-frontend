import React from "react";
import { useTranslation } from "react-i18next";

import styles from "./LanguageSelector.module.css";

import { HeaderCard } from "./Header";
import { AvailableLang, availableLangs } from "../contexts/i18n";
import { ImgFlagUk } from "../../medias/images/UGT_Asset_FlagSelector_UKR";
import { ImgFlagEn } from "../../medias/images/UGT_Asset_FlagSelector_ENG";
import { ImgDropdown } from "../../medias/images/UGT_Asset_UI_Dropdown";

export interface LanguageSelectorProps {}

const Flag = ({ lang, className }: { lang: AvailableLang; className?: string }) => {
  if (lang === "uk") {
    return (
      <React.Fragment>
        <ImgFlagUk alt="ukrainian" className={className} />
        <span>UA</span>
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <ImgFlagEn alt="english" className={className} />
      <span>EN</span>
    </React.Fragment>
  );
};

function useOutsideClick(ref: React.RefObject<HTMLElement>, onClick: () => void) {
  React.useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (ref.current && !ref.current.contains(event.target)) {
        onClick();
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [ref, onClick]);
}

export const LanguageSelector: React.FunctionComponent<LanguageSelectorProps> = () => {
  const { i18n } = useTranslation();

  const [expanded, setExpanded] = React.useState(false);

  const ref = React.useRef<HTMLDivElement>(null);
  useOutsideClick(ref, () => setExpanded(false));

  const currentLang = i18n.language as AvailableLang;

  const selectLang = (lang: string) => {
    i18n.changeLanguage(lang);
    setExpanded(false);
  };

  return (
    <div ref={ref} className={styles.selector} onClick={() => setExpanded(!expanded)}>
      <HeaderCard>
        <Flag className={styles.flagIcon} lang={currentLang} />
        <span>{currentLang.toUpperCase()}</span>
        <ImgDropdown className={styles.dropdownIcon} alt="" />
      </HeaderCard>
      {expanded && (
        <HeaderCard className={styles.dropdown}>
          {availableLangs
            .filter((lang) => lang !== currentLang)
            .map((lang) => {
              return (
                <div key={lang} className={styles.dropdownItem} onClick={() => selectLang(lang)}>
                  <Flag className={styles.flagIcon} lang={lang as AvailableLang} />
                </div>
              );
            })}
        </HeaderCard>
      )}
    </div>
  );
};
