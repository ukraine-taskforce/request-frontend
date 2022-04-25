import React from "react";
import { useTranslation } from "react-i18next";

import { Content } from "../../others/components/Content";
import { Header } from "../../others/components/Header";
import { Text } from "../../others/components/Text";

import styles from "./supplies.module.css";

export function Supplies2() {
  const { t } = useTranslation();

  return (
    <React.Fragment>
      <Header backLink="/supplies" hasLangSelector />
      <Content>
        <Text className={styles.title}>{t("supplies2_how_much")}</Text>
      </Content>
    </React.Fragment>
  );
}
