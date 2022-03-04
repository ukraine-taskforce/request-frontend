import React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { Button } from "../../others/components/Button";
import { Card } from "../../others/components/Card";
import { LanguageSelector } from "../../others/components/LanguageSelector";
import { Spacer } from "../../others/components/Spacer";
import { Text } from "../../others/components/Text";
import { FormData, useFormValue } from "../../others/contexts/form";

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
      <LanguageSelector />
      <h1>{t("people_how_many")}?</h1>
      <div className={styles.flex}>
        {PEOPLE_TYPES.map((category) => {
          const value = currentValue[category.key];

          return (
            <React.Fragment>
              <Card key={category.key}>
                <div>
                  <Text>{t(category.key)}</Text>
                  <Text>{t(category.explanation_key)}</Text>
                </div>
                <div>
                  <img
                    className={styles.button}
                    onClick={() => {
                      if (value <= 0) return;
                      updateValue({ [category.key]: value - 1 });
                    }}
                    style={{ opacity: value <= 0 ? 0.5 : 1 }}
                    src=""
                    alt="minus"
                  />
                  <span>{value}</span>
                  <img
                    className={styles.button}
                    onClick={() => {
                      if (value >= 10) return;
                      updateValue({ [category.key]: value + 1 });
                    }}
                    style={{ opacity: value >= 10 ? 0.5 : 1 }}
                    src=""
                    alt="plus"
                  />
                </div>
              </Card>
              <Spacer size={12} />
            </React.Fragment>
          );
        })}
        <span className={styles.extend} />
        <Button disabled={!currentValue.adults && !currentValue.children && !currentValue.infants} onClick={handleSubmit}>
          {t("people_next")}
        </Button>
      </div>
    </React.Fragment>
  );
}
