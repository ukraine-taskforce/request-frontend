import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Content } from "../../others/components/Content";
import { Card } from "../../others/components/Card";
import { Text } from "../../others/components/Text";
import { Header } from "../../others/components/Header";
import { Spacer } from "../../others/components/Spacer";
import styles from "./supplies.module.css";
import { ImgNext } from "../../medias/images/UGT_Asset_UI_ButtonNext";
import { Button } from "../../others/components/Button";
import { useFormValue } from "../../others/contexts/form";
import { useSuppliesQuery } from "../../others/contexts/api";
import { Input } from "../../others/components/Input";

export function Supplies2() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { currentValue, updateValue } = useFormValue();
  const { data: supplies } = useSuppliesQuery();

  const getSupplyName = (supplyId: string) => {
    if (supplies !== undefined) {
      return supplies.find((supply) => supply.id === supplyId)?.name || "";
    }
    return "";
  };

  const changeAmount = React.useCallback(
    (id: string, amount: string) => {
      const array = currentValue.supplies;
      const index = array.findIndex(element => element.id === id);
      if (index !== -1 ) {
        array[index].amount = parseInt(amount);
      }
      updateValue({ supplies: array });
    }, [currentValue, updateValue]
  );

  const handleSubmit = React.useCallback(() => {
    navigate("/review");
  }, [navigate]);
  return (
    <React.Fragment>
      <Header backLink="/supplies" hasLangSelector />

      <Content>
        <h1 className={styles.title}>{t("supplies2_how_much")}</h1>
        <Spacer size={24} />
        <div className={styles.flex}>
          {currentValue.supplies.map((supply) => (
            <React.Fragment key={supply.id}>
              <Card className={styles.card}>
                <Text>{getSupplyName(supply.id)}</Text>
                <Input value={supply.amount.toString()} label={"amount_" + supply.id} placeholder={t("enter_amount")} onChange={(value) => changeAmount(supply.id, value)} />
              </Card>
              <Spacer size={6} />
            </React.Fragment>
          ))}
          <Spacer size={30} flex={2} />
          <Button
            onClick={handleSubmit}
            trailingIcon={<ImgNext alt="" />}
            fullWidth
            floats
          >
            {t("supplies_next")}
          </Button>
        </div>
      </Content>
    </React.Fragment>
  );
}
