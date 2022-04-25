import React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import parsePhoneNumber from "libphonenumber-js";

import { ID, useSubmitMutation } from "../../others/contexts/api";
import { useFormValue } from "../../others/contexts/form";
import { useLocationsQuery, useSuppliesQuery } from "../../others/contexts/api";
import { Button } from "../../others/components/Button";
import { Header } from "../../others/components/Header";
import { Label } from "../../others/components/Label";
import { Spacer } from "../../others/components/Spacer";
import { Card } from "../../others/components/Card";
import { Text } from "../../others/components/Text";
import { Toast } from "../../others/components/Toast";
import { Input } from "../../others/components/Input";

import { ImgNext } from "../../medias/images/UGT_Asset_UI_ButtonNext";

import styles from "./review.module.css";

export function Review() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { mutateAsync: mutate, isLoading, error } = useSubmitMutation();
  const { currentValue, updateValue } = useFormValue();
  const { supplies: supplyIds, location, name, phoneNumber } = currentValue;
  // These calls read from cache.
  const { data: cities } = useLocationsQuery();
  const { data: supplies } = useSuppliesQuery();

  const setComment = (newValue: string) => updateValue({ comments: newValue });

  React.useEffect(() => {
    if (location === undefined || supplyIds.length === 0) {
      navigate("/", { replace: true });
    }
  }, [location, supplyIds, navigate]);

  const getCityName = (cityId?: ID) => {
    if (cities !== undefined && cityId !== undefined) {
      return cities.find((city) => city.id === cityId)?.name || "";
    }
    return "";
  };

  const getSupplyName = (supplyId: ID) => {
    if (supplies !== undefined) {
      return supplies.find((supply) => supply.id === supplyId)?.name || "";
    }
    return "";
  };

  const handleSubmit = React.useCallback(async () => {
    await mutate(currentValue);
    navigate("/success");
  }, [mutate, currentValue, navigate]);

  return (
    <React.Fragment>
      <Header backLink="/supplies" hasLangSelector />
      <h1>{t("review_request")}</h1>
      <Spacer size={24} />
      <div className={styles.flex}>
        <Card className={styles.card}>
          <Text className={styles.cardTitle}>{t("review_contact_info")}</Text>
          <Text className={styles.cardContent}>
            {name ? `${name}, ` : ""}
            {getCityName(location)}
          </Text>
          <Text className={styles.secondaryCardContent}>{parsePhoneNumber(phoneNumber)?.formatInternational()}</Text>
        </Card>
        <Spacer size={8} />
        <Card className={styles.card}>
          <Text className={styles.cardTitle}>{t("review_needs")}</Text>
          {supplyIds.map((supply) => {
            return (
              <Text key={supply.id} className={styles.cardContent}>
                {getSupplyName(supply.id)}: {supply.amount}
              </Text>
            );
          })}
        </Card>

        <Spacer size={30} flex={2} />

        <Label>{t("add_comment")}</Label>
        <Spacer size={10} />
        <Input value={currentValue.comments} label="comments_field" placeholder={t("comment_placeholder")} onChange={setComment} />

        <Spacer size={30} flex={2} />
        <Button onClick={handleSubmit} disabled={isLoading} trailingIcon={<ImgNext alt="" />} fullWidth floats>
          {t("review_submit_request")}
        </Button>
      </div>
      <Toast display={!isLoading && Boolean(error)}>
        <Text>{t("review_error")}</Text>
      </Toast>
    </React.Fragment>
  );
}
