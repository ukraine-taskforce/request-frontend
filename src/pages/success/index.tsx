import React from "react";
import { useTranslation } from "react-i18next";

import { Button } from "../../others/components/Button";
import { Card } from "../../others/components/Card";
import { List } from "../../others/components/List";
import { Spacer } from "../../others/components/Spacer";
import { Text } from "../../others/components/Text";
import { useFormValue } from "../../others/contexts/form";
import { isShareSupported, share } from "../../others/helpers/share";

import confirmationIcon from "../../medias/images/UGT_Asset_UI_Confirmation.svg";
import shareIcon from "../../medias/images/UGT_Asset_UI_Share_Icon_W.svg";

import styles from "./success.module.css";

export function Success() {
  const { t } = useTranslation();
  const { clearStore } = useFormValue();

  React.useEffect(() => {
    clearStore();
  }, [clearStore]);

  const handleShare = React.useCallback(() => {
    share(t("ugt"));
  }, [t]);

  return (
    <div className={styles.wrapper}>
      <Spacer size={40} />
      <img className={styles.logo} src={confirmationIcon} alt="success" />
      <h1>{t("success_received")}</h1>
      <Spacer size={30} />
      <Card>
        <List>
          <li>
            <Text>{t("success_aggregate")}</Text>
          </li>
          <li>
            <Text>{t("success_insight")}</Text>
          </li>
          <li>
            <Text>{t("success_delivery")}</Text>
          </li>
        </List>
        <Button
          onClick={handleShare}
          trailingIcon={<img src={shareIcon} alt="" className={styles.nextArrow} />}
          fullWidth
          variant="highlight"
          className={!isShareSupported() ? "hide" : ""}
        >
          {t("success_share")}
        </Button>
      </Card>
    </div>
  );
}
