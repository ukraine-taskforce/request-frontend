import React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { Button } from "../../others/components/Button";
import { Card } from "../../others/components/Card";
import { Content } from "../../others/components/Content";
import { Header } from "../../others/components/Header";
import { List } from "../../others/components/List";
import { Modal } from "../../others/components/Modal";
import { Spacer } from "../../others/components/Spacer";
import { Text } from "../../others/components/Text";
import { useLocationsQuery, useSuppliesQuery } from "../../others/contexts/api";
import { isShareSupported, useShare } from "../../others/helpers/share";

import styles from "./home.module.css";

import { ImgBrand } from "../../medias/images/UGT_Asset_Brand";
import { ImgNext } from "../../medias/images/UGT_Asset_UI_ButtonNext";
import { ImgShare } from "../../medias/images/UGT_Asset_UI_Share_Icon";

export function Home() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { share } = useShare();
  const [displayModal, setDisplayModal] = React.useState(false);

  // For caching purposes
  useSuppliesQuery();
  useLocationsQuery();

  return (
    <React.Fragment>
      <Header hasHeadline hasLangSelector />
      <Content>
        <h1 className={styles.title}>{t("home_how_does_works")}</h1>
        <List>
          <li>
            <Text variant="bold">{t("home_tell_us")}</Text>
          </li>
          <li>
            <Text variant="bold">{t("home_we_help_authorities")}</Text>
          </li>
          <li>
            <Text variant="bold">{t("home_deliver_supplies")}</Text>
          </li>
        </List>
        <Card>
          <Text alignment="center">{t("home_acknowledgement")}</Text>
          <Spacer size={22} />
          <Button fullWidth onClick={() => navigate("/contact")} trailingIcon={<ImgNext alt="" />}>
            {t("home_i_understand")}
          </Button>
        </Card>
        <Modal show={displayModal} handleClose={() => setDisplayModal(false)}>
          <div style={{ display: "flex" }}>
            <Spacer flex={1} />
            <ImgBrand className={styles.ugtLogo} alt="UGT Logo" />
            <Spacer flex={1} />
          </div>
          <h1 style={{ textAlign: "center" }}>{t("about_head")}</h1>
          <Text alignment="center">{t("about_detailed")}</Text>
          <Spacer size={22} />
          {isShareSupported() && (
            <Button
              fullWidth
              variant="highlight"
              onClick={share}
              trailingIcon={<ImgShare style={{ height: "15px" }} fill="white" alt={t("share")} />}
            >
              {t("about_share")}
            </Button>
          )}
        </Modal>
      </Content>
    </React.Fragment>
  );
}
