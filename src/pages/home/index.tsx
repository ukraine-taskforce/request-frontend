import React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { Button } from "../../others/components/Button";
import { Card } from "../../others/components/Card";
import { LanguageSelector } from "../../others/components/LanguageSelector";
import { List } from "../../others/components/List";
import { Spacer } from "../../others/components/Spacer";
import { Text } from "../../others/components/Text";

export function Home() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <React.Fragment>
      <LanguageSelector />
      <h1>{t("home_how_does_works")}</h1>
      <List>
        <li><Text>{t("home_we_help_authorities")}</Text></li>
        <li><Text>{t("home_tell_us")}</Text></li>
        <li><Text>{t("home_deliver_supplies")}</Text></li>
      </List>
      <Card>
        <Text alignment="center">{t("home_acknowledgement")}</Text>
        <Spacer />
        <Button fullWidth onClick={() => navigate("/locator")}>{t("home_i_understand")}</Button>
      </Card>
    </React.Fragment>
  );
}
