import React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { Button } from "../../others/components/Button";
import { Card } from "../../others/components/Card";
import { Spacer } from "../../others/components/Spacer";
import { Text } from "../../others/components/Text";
import { useFormValue, PEOPLE_TYPES } from "../../others/contexts/form";
import { Header } from "../../others/components/Header";
import { NumberInput } from "../../others/components/NumberInput";

import nextIcon from "../../medias/images/UGT_Asset_UI_ButtonIndication.svg";

import styles from "./people.module.css";

export function People() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { currentValue, updateValue } = useFormValue();

  const handleSubmit = React.useCallback(() => {
    navigate("/supplies");
  }, [navigate]);

  return (
    <React.Fragment>
      <Header backLink="/locator" />
      <h1>{t("people_how_many")}?</h1>
      <Spacer size={24} />
      <div className={styles.flex}>
        {PEOPLE_TYPES.map((category) => {
          const value = currentValue.people[category.key];

          return (
            <React.Fragment key={category.key}>
              <Card className={styles.card}>
                <div>
                  <Text className={styles.cardTitle}>{t(category.key)}</Text>
                  <Text className={styles.cardSubtitle}>{t(category.explanation_key)}</Text>
                </div>
                <div className={styles.cardRight}>
                  <NumberInput
                    value={value}
                    label={t(category.key)}
                    minVal={0}
                    maxVal={10}
                    onChange={(newValue) => updateValue({ people: { [category.key]: newValue } })}
                  />
                </div>
              </Card>
              <Spacer size={12} />
            </React.Fragment>
          );
        })}
        <Spacer size={30} />
        <Button
          disabled={!currentValue.people.adults && !currentValue.people.children && !currentValue.people.infants}
          onClick={handleSubmit}
          trailingIcon={<img src={nextIcon} alt="" className={styles.nextArrow} />}
        >
          {t("people_next")}
        </Button>
      </div>
    </React.Fragment>
  );
}
