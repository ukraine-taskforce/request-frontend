import React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { Button } from "../../others/components/Button";
import { Card } from "../../others/components/Card";

import { List } from "../../others/components/List";
import { Spacer } from "../../others/components/Spacer";
import { Text } from "../../others/components/Text";

import styles from "./home.module.css";
import ugtLogo from "../../medias/images/UGT_Asset_Brand.svg";
import nextIcon from "../../medias/images/UGT_Asset_UI_ButtonIndication.svg";
import shareIcon from "../../medias/images/UGT_Asset_UI_Share_Icon_W.svg";
import { Header } from "../../others/components/Header";
import { Modal } from "../../others/components/Modal";

export function Home() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [displayModal, setDisplayModal] = React.useState(false);

  return (
    <React.Fragment>
      <Header hasAbout handleAbout={() => setDisplayModal(true)} hasShare />
      <Spacer size={40} />
      <img className={styles.ugtLogo} src={ugtLogo} alt="UGT Logo" />
      <h1>{t("home_how_does_works")}</h1>
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
        <Button fullWidth onClick={() => navigate("/locator")} trailingIcon={<img src={nextIcon} alt="" />}>
          {t("home_i_understand")}
        </Button>
      </Card>
      <Modal show={displayModal} handleClose={() => setDisplayModal(false)}>
        <div style={{display: "flex"}}>
          <Spacer flex={1}/>
          <img className={styles.ugtLogo} src={ugtLogo} alt="UGT Logo" />
          <Spacer flex={1}/>
        </div>
        <h1 style={{textAlign: "center"}}>{t("about_head")}</h1>
        <Text alignment="center">{t("about_detailed")}</Text>
        <Spacer size={22} />
        {/* TODO Share Action */}
        <Button
          fullWidth
          variant="highlight"
          onClick={() => undefined}
          trailingIcon={<img style={{height: "15px"}} src={shareIcon} alt={t("share")} />}
        >
          {t("about_share")}
        </Button>
      </Modal>
    </React.Fragment>
  );
}
