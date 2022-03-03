import React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { Card } from "../../others/components/Card";
import { Button } from "../../others/components/Button";
import { LanguageSelector } from "../../others/components/LanguageSelector";

export function Home() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  return (
    <React.Fragment>
      <LanguageSelector />
      <h1>{t("home_how_does_works")}</h1>
      <p>{t("home_we_help_authorities")}</p>
      <p>{t("home_tell_us")}</p>
      <p>{t("home_deliver_supplies")}</p>
      <Card>
        {t("home_acknowledgement")}
        <Button onClick={() => navigate("/captcha")}>{t("home_i_understand")}</Button>
      </Card>
    </React.Fragment>
  );
}
