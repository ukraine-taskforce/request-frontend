import React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { Button } from "../../others/components/Button";
import { Card } from "../../others/components/Card";
import { Spacer } from "../../others/components/Spacer";
import { Text } from "../../others/components/Text";
import { useFormValue } from "../../others/contexts/form";
import { Header } from "../../others/components/Header";

import minusIcon from "../../medias/images/UGT_Asset_UI_Quantities_Minus.svg";
import plusIcon from "../../medias/images/UGT_Asset_UI_Quantities_Plus.svg";
import nextIcon from "../../medias/images/UGT_Asset_UI_ButtonIndication.svg";

import styles from "./people.module.css";

const PEOPLE_TYPES: { key: "adults" | "children" | "infants"; explanation_key: string }[] = [
  {
    key: "adults",
    explanation_key: "adults_details",
  },
  {
    key: "children",
    explanation_key: "children_details",
  },
  {
    key: "infants",
    explanation_key: "infants_details",
  },
];

export function People() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { currentValue, updateValue } = useFormValue();

  const handleSubmit = React.useCallback(() => {
    navigate("/supplies");
  }, [navigate]);

  return (
    <React.Fragment>
      <Header hasBackButton />
      <h1>{t("people_how_many")}?</h1>
      <Spacer size={24} />
      <div className={styles.flex}>
        {PEOPLE_TYPES.map((category) => {
          const value = currentValue[category.key];

          return (
            <React.Fragment>
              <Card key={category.key} className={styles.card}>
                <div>
                  <Text className={styles.cardTitle}>{t(category.key)}</Text>
                  <Text className={styles.cardSubtitle}>{t(category.explanation_key)}</Text>
                </div>
                <div className={styles.cardRight}>
                  <img
                    className={styles.button}
                    onClick={() => {
                      if (value <= 0) return;
                      updateValue({ [category.key]: value - 1 });
                    }}
                    style={{ opacity: value <= 0 ? 0.5 : 1 }}
                    src={minusIcon}
                    alt="-"
                  />
                  <span className={styles.cardValue}>{value}</span>
                  <img
                    className={styles.button}
                    onClick={() => {
                      if (value >= 10) return;
                      updateValue({ [category.key]: value + 1 });
                    }}
                    style={{ opacity: value >= 10 ? 0.5 : 1 }}
                    src={plusIcon}
                    alt="+"
                  />
                </div>
              </Card>
              <Spacer size={12} />
            </React.Fragment>
          );
        })}
        <Spacer size={100} />
        <Button
          disabled={!currentValue.adults && !currentValue.children && !currentValue.infants}
          onClick={handleSubmit}
          trailingIcon={<img src={nextIcon} alt="" />}
        >
          {t("people_next")}
        </Button>
      </div>
    </React.Fragment>
  );
}
