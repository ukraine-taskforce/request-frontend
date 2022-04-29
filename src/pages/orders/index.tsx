import React, { useEffect, useState } from "react";
import ReactGA from "react-ga4";
import { Accordion, AccordionSummary, AccordionDetails, Typography, Stack } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { useTranslation } from "react-i18next";
import { Header } from "../../others/components/Header";
import { Spacer } from "../../others/components/Spacer";
import { Text } from "../../others/components/Text";
import { Content } from "../../others/components/Content";
import { useAuth } from "../../others/contexts/auth";
import OutputIcon from "@mui/icons-material/Output";
import { Tooltip } from "@mui/material";
import { RequestStatus, fakeRequests } from "../../others/helpers/requests";
import { useLocationsQuery, useSuppliesQuery } from "../../others/contexts/api";
import styles from "./orders.module.css";

export function Orders() {
  const { t } = useTranslation();
  const { logout } = useAuth();
  const [expandedRequestPanel, setExpandedRequestPanel] = useState<string | false>(false);
  const { data: cities } = useLocationsQuery();
  const { data: supplies } = useSuppliesQuery();

  // TODO: If we don't replace it with a better mechanism at least use useMemo.
  const cityLookup = cities ? Object.assign({}, ...cities.map((city) => ({ [city.id]: city }))) : {};
  const supplyLookup = supplies ? Object.assign({}, ...supplies.map((supply) => ({ [supply.id]: supply }))) : {};

  const toggleRequestPanel = (panel: string) => (event: React.SyntheticEvent, newExpandedPanel: boolean) => {
    setExpandedRequestPanel(newExpandedPanel ? panel : false);
  };

  useEffect(() => {
    document.title = t("orders_page_title");
    ReactGA.send("pageview");
  }, [t]);

  // TODO need to properly handle error and loading states
  if (!cities || !supplies) {
    return null;
  }

  return (
    <React.Fragment>
      <Header hasHeadline hasLangSelector />
      <Content>
        <h1 className="title">Orders</h1>
        <Tooltip title="Logout" arrow>
          <OutputIcon onClick={logout} sx={{ width: 30, height: 30, marginLeft: "auto", cursor: "pointer" }} />
        </Tooltip>

        <Spacer size={24} />

        <div>
          {fakeRequests.map((request) => (
            <Accordion
              disableGutters
              elevation={0}
              square
              expanded={expandedRequestPanel === `panel-${request.id}`}
              onChange={toggleRequestPanel(`panel-${request.id}`)}
              key={request.id}
              sx={{
                borderRadius: "8px",
                marginBottom: "20px",
                boxShadow: "0px 1px 8px 2px #14141414",
                "&:before": {
                  display: "none",
                },
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`panel-${request.id}-content`}
                id={`panel-${request.id}-header`}
                sx={{
                  flexDirection: "row-reverse",
                  padding: "10px 16px",
                  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
                    transform: "rotate(180deg)",
                  },
                  "& .MuiAccordionSummary-content": {
                    marginLeft: "10px",
                  },
                }}
              >
                <Text variant="bold">Request #{request.id}</Text>
              </AccordionSummary>
              <AccordionDetails
                sx={{
                  padding: "20px",
                }}
              >
                <Stack spacing={0}>
                  <Typography>{cityLookup[request.city_id].name}</Typography>
                  <Typography>{request.userName}</Typography>
                  <Typography>{request.userPhoneNumber}</Typography>
                </Stack>

                <Spacer size={24} />

                <Stack spacing={1}>
                  <dl className={styles.descriptionList}>
                    {request.supplies.map((supply) => (
                      <React.Fragment key={supply.id}>
                        <dt>{supplyLookup[supply.id].name}</dt>
                        <dd>{supply.amount}</dd>
                      </React.Fragment>
                    ))}
                  </dl>
                </Stack>

                <Spacer size={20} />

                <Stack spacing={1}>
                  <dl className={styles.descriptionList}>
                    <dt>Date</dt>
                    <dd>{request.date.toLocaleString()}</dd>
                    <dt>Status</dt>
                    <dd>{RequestStatus[request.status]}</dd>
                  </dl>
                </Stack>
              </AccordionDetails>
            </Accordion>
          ))}
        </div>
      </Content>
    </React.Fragment>
  );
}
