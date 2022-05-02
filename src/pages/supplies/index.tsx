import React, { useEffect } from "react";
import ReactGA from "react-ga4";
import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { map, groupBy } from "lodash";
import { Button } from "../../others/components/Button";
import { Card } from "../../others/components/Card";
import { Content } from "../../others/components/Content";
import { Checkmark } from "../../others/components/Checkmark";
import { Header } from "../../others/components/Header";
import { Loader } from "../../others/components/Loader";
import { Spacer } from "../../others/components/Spacer";
import { Text } from "../../others/components/Text";
import { useFormValue } from "../../others/contexts/form";
import { useSuppliesQuery } from "../../others/contexts/api";

import { ImgNext } from "../../medias/images/UGT_Asset_UI_ButtonNext";

import styles from "./supplies.module.css";

export function Supplies() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { currentValue, updateValue } = useFormValue();
  const { data: supplies } = useSuppliesQuery();

  useEffect(() => {
    document.title = t("supplies_page_title");
    ReactGA.send("pageview");
  }, [t]);

  const handleSubmit = React.useCallback(() => {
    navigate("/supplies2");
  }, [navigate]);

  const toggleSupply = React.useCallback(
    (supplyId: string) => {
      const array = currentValue.supplies;
      const index = array.findIndex(element => element.id === supplyId);

      if (index === -1) {
        array.push({id: supplyId, amount: 1});
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


  const supplies2 = supplies.map((supply) => {
    return {
      id: supply.id,
      parent: supply.name.substr(0, 1),
      name: supply.name,
    };
  });
  const suppliesGrouped = groupBy(supplies2, "parent");
 
  return (
    <React.Fragment>
      <Header backLink="/locator" hasLangSelector />
      <Content>
        <h1 className={styles.title}>{t("supplies_what_is_needed")}?</h1>
        <Spacer size={24} />
        <div className={styles.flex}>
          {map(suppliesGrouped, (categories, parent) => (
             <Accordion
               disableGutters
               elevation={0}
               square
               key={parent}
               sx={{
                 borderRadius: "8px",
                 marginBottom: "20px",
                 boxShadow: "0px 1px 8px 2px #14141414",
                 "&:before": {
                   display: "none",
                 },
               }}>
               <AccordionSummary>
                 <Text variant="bold">{parent}</Text>
               </AccordionSummary>
               <AccordionDetails>
                 {categories.map((supply) => (
                   <React.Fragment key={supply.name}>
                     <Card className={styles.card} onClick={() => toggleSupply(supply.id)}>
                       <Text variant="bold">{supply.name}</Text>
                       <Checkmark checked={currentValue.supplies.some(element => element.id === supply.id)} />
                     </Card>
                     <Spacer size={6} />
                   </React.Fragment>
                 ))}
               </AccordionDetails>
             </Accordion>
          ))}
          <Spacer size={30} flex={2} />
          <Button
            onClick={handleSubmit}
            leadingIcon={<span className={styles.counter}>{currentValue.supplies.length}</span>}
            trailingIcon={<ImgNext alt="" />}
            disabled={currentValue.supplies.length <= 0}
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
