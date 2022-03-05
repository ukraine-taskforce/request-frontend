import React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { useSubmitMutation } from "../../others/contexts/api";
import { useFormValue, PEOPLE_TYPES } from "../../others/contexts/form";
import { useLocationsQuery, useSuppliesQuery } from "../../others/contexts/api";
import { Button } from "../../others/components/Button";
import { Header } from "../../others/components/Header";
import { Spacer } from "../../others/components/Spacer";
import { Card } from "../../others/components/Card";
import { Text } from "../../others/components/Text";

import nextIcon from "../../medias/images/UGT_Asset_UI_ButtonIndication.svg";

import styles from "./review.module.css";

export function Review() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { mutate, isLoading } = useSubmitMutation();
  const { currentValue, clearStore } = useFormValue();
  const { supplies: supplyIds, location } = currentValue;
  // These calls read from cache.
  const { data: cities } = useLocationsQuery();
  const { data: supplies } = useSuppliesQuery();

  React.useEffect(() => {
    if (location === undefined || supplyIds.length === 0) {
      navigate("/");
    }
  }, [location, supplyIds, navigate]);

  const getCityName = (cityId?: number) => {
    if (cities !== undefined && cityId !== undefined) {
      return cities.find((city) => city.id === cityId)?.name || "";
    }
    return "";
  }

  const getSupplyName = (supplyId: number) => {
    if (supplies !== undefined) {
      return supplies.find((supply) => supply.id === supplyId)?.name || "";
    }
    return "";
  }

  const handleSumbit = React.useCallback(async () => {
    try {
      await mutate(currentValue);
      clearStore();
      navigate("/success");
    } catch (error) {
      // Maybe display an error message
    }
  }, [mutate, clearStore, currentValue, navigate]);

  return (
    <React.Fragment>
      <Header hasBackButton />
      <h1>{t("review_request")}</h1>
      <Spacer size={24} />
      <div className={styles.flex}>
        <Card className={styles.card}>
          <Text className={styles.cardTitle}>{t("review_where")}</Text>
          <Text className={styles.cardContent}>{getCityName(location)}</Text>
        </Card>
        <Spacer size={8} />
        <Card className={styles.card}>
          <Text className={styles.cardTitle}>{t("review_who")}</Text>
            {PEOPLE_TYPES.map(({key}) => {
              let amount = currentValue.people[key];
              if (amount > 0) {
                return (
                  <React.Fragment key={key}>
                    <Text className={styles.cardContent}>{amount} {t(key)}</Text>
                  </React.Fragment>
                );
              }
              return <React.Fragment key={key} />
            })}
        </Card>
        <Spacer size={8} />
        <Card className={styles.card}>
          <Text className={styles.cardTitle}>{t("review_needs")}</Text>
          {supplyIds.map((supplyId) => {
            return (
              <Text key={supplyId.toString()} className={styles.cardContent}>
                {getSupplyName(supplyId)}
              </Text>
            );
          })}
        </Card>
        <Spacer size={12} />
      </div>
      <Button
        onClick={handleSumbit}
        disabled={isLoading}
        trailingIcon={<img src={nextIcon} className={styles.nextArrow} alt="" />}
        fullWidth>
        {t("review_submit_request")}
      </Button>
    </React.Fragment>
  );
}
