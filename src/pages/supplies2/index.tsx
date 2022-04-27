import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Content } from "../../others/components/Content";
import { Header } from "../../others/components/Header";
import { Spacer } from "../../others/components/Spacer";
import styles from "./supplies.module.css";
import { ImgNext } from "../../medias/images/UGT_Asset_UI_ButtonNext";
import { Button } from "../../others/components/Button";

export function Supplies2() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleSubmit = React.useCallback(() => {
    navigate("/review");
  }, [navigate]);

  return (
    <React.Fragment>
      <Header backLink="/supplies" hasLangSelector />
      <Content>
        <h1 className={styles.title}>{t("supplies2_how_much")}</h1>
        <Spacer size={30} flex={2} />
        <Button
          onClick={handleSubmit}
          trailingIcon={<ImgNext alt="" />}
          fullWidth
          floats
        >
          {t("supplies_next")}
        </Button>

      </Content>
    </React.Fragment>
  );
}
