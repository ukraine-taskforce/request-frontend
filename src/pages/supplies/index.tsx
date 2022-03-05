import React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { Button } from "../../others/components/Button";
import { Card } from "../../others/components/Card";
import { Checkmark } from "../../others/components/Checkmark";
import { Header } from "../../others/components/Header";
import { Loader } from "../../others/components/Loader";
import { Spacer } from "../../others/components/Spacer";
import { Text } from "../../others/components/Text";
import { useFormValue } from "../../others/contexts/form";
import { ID, useSuppliesQuery } from "../../others/contexts/api";

import nextIcon from "../../medias/images/UGT_Asset_UI_ButtonIndication.svg";

import styles from "./supplies.module.css";

export function Supplies() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { currentValue, updateValue } = useFormValue();
  const { data: supplies } = useSuppliesQuery();

  const handleSubmit = React.useCallback(() => {
    navigate("/review");
  }, [navigate]);

  const toggleSupply = React.useCallback(
    (supplyId: ID) => {
      const array = currentValue.supplies;
      const index = array.indexOf(supplyId);

      if (index === -1) {
        array.push(supplyId);
      } else {
        array.splice(index, 1);
      }

      updateValue({ supplies: array });
    },
    [currentValue, updateValue]
  );

  if (!supplies) {
    return (
      <React.Fragment>
        <Spacer size={40} />
        <Loader />
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <Header backLink="/people" />
      <h1>{t("supplies_what_is_needed")}?</h1>
      <Spacer size={24} />
      <div className={styles.flex}>
        {supplies.map((supply) => (
          <React.Fragment key={supply.name}>
            <Card className={styles.card} onClick={() => toggleSupply(supply.id)}>
              <Text variant="bold">{supply.name}</Text>
              <Checkmark checked={currentValue.supplies.includes(supply.id)} />
            </Card>
            <Spacer size={6} />
          </React.Fragment>
        ))}
        <Spacer size={30} flex={2} />
        <Button
          onClick={handleSubmit}
          leadingIcon={<span className={styles.counter}>{currentValue.supplies.length}</span>}
          trailingIcon={<img src={nextIcon} alt="" />}
          disabled={currentValue.supplies.length <= 0}
          fullWidth
          floats
        >
          {t("supplies_next")}
        </Button>
      </div>
    </React.Fragment>
  );
}
