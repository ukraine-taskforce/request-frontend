import React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { Button } from "../../others/components/Button";
import { Card } from "../../others/components/Card";

import { List } from "../../others/components/List";
import { Spacer } from "../../others/components/Spacer";
import { Text } from "../../others/components/Text";

import styles from "./home.module.css";
import ugtLogo from "../../medias/images/UGT_Asset_Brand.svg";
import nextIcon from "../../medias/images/UGT_Asset_UI_ButtonIndication.svg";
import { Header } from "../../others/components/Header";

export function Home() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <React.Fragment>
      <Header hasAbout hasShare />
      <Spacer size={40} />
      <img className={styles.ugtLogo} src={ugtLogo} alt="UGT Logo" />
      <h1>{t("home_how_does_works")}</h1>
      <List>
        <li>
          <Text variant="bold">{t("home_tell_us")}</Text>
        </li>
        <li>
          <Text variant="bold">{t("home_we_help_authorities")}</Text>
        </li>
        <li>
          <Text variant="bold">{t("home_deliver_supplies")}</Text>
        </li>
      </List>
      <Card>
        <Text alignment="center">{t("home_acknowledgement")}</Text>
        <Spacer size={22} />
        <Button fullWidth onClick={() => navigate("/locator")} trailingIcon={<img src={nextIcon} alt="" />}>
          {t("home_i_understand")}
        </Button>
      </Card>
    </React.Fragment>
  );
}
