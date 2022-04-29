import React, { useEffect, useState } from "react";
import ReactGA from "react-ga4";
import {
  Accordion,
  AccordionSummary,
  AccordionProps,
  AccordionSummaryProps,
  AccordionDetails,
  Typography,
  Box,
  Stack,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { styled } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import { Header } from "../../others/components/Header";
import { Card } from "../../others/components/Card";
import { Spacer } from "../../others/components/Spacer";
import { Text } from "../../others/components/Text";
import { Content } from "../../others/components/Content";
import { useAuth } from "../../others/contexts/auth";
import OutputIcon from "@mui/icons-material/Output";
import { Tooltip } from "@mui/material";
import { RequestStatus, fakeRequests } from "../../others/helpers/requests";
import { useLocationsQuery, useSuppliesQuery } from "../../others/contexts/api";
import styles from "./orders.module.css";

const CustomAccordion = styled((props: AccordionProps) => <Accordion disableGutters elevation={0} square {...props} />)(({ theme }) => ({
  borderRadius: "8px",
  marginBottom: "20px",
  boxShadow: "0px 1px 8px 2px #14141414",
  "&:before": {
    display: "none",
  },
}));

const CustomAccordionSummary = styled((props: AccordionSummaryProps) => <AccordionSummary expandIcon={<ExpandMoreIcon />} {...props} />)(
  ({ theme }) => ({
    flexDirection: "row-reverse",
    padding: "10px 16px",
    "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
      transform: "rotate(180deg)",
    },
    "& .MuiAccordionSummary-content": {
      marginLeft: theme.spacing(1),
    },
  })
);

const CustomAccordionDetails = styled(AccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

export function Orders() {
  const { t } = useTranslation();
  const { logout } = useAuth();
  const [expandedRequest, setExpandedRequest] = useState<string | false>(false);
  const { data: cities } = useLocationsQuery();
  const { data: supplies } = useSuppliesQuery();

  // TODO: If we don't replace it with a better mechanism at least use useMemo.
  const cityLookup = cities ? Object.assign({}, ...cities.map((city) => ({ [city.id]: city }))) : {};
  const supplyLookup = supplies ? Object.assign({}, ...supplies.map((supply) => ({ [supply.id]: supply }))) : {};

  const handleChange = (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
    setExpandedRequest(newExpanded ? panel : false);
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
            <CustomAccordion
              expanded={expandedRequest === `panel-${request.id}`}
              onChange={handleChange(`panel-${request.id}`)}
              key={request.id}
            >
              <CustomAccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                <Text variant="bold">Request #{request.id}</Text>
              </CustomAccordionSummary>
              <CustomAccordionDetails>
                <Stack spacing={2}>
                  <Text className={styles.contactListItem}>{cityLookup[request.city_id].name}</Text>
                  <Text className={styles.contactListItem}>{request.userName}</Text>
                  <Text className={styles.contactListItem}>{request.userPhoneNumber}</Text>
                </Stack>

                <Stack spacing={2}>
                  <dl>
                    {request.supplies.map((supply) => (
                      <React.Fragment key={supply.id}>
                        <dt>{supplyLookup[supply.id].name}</dt>
                        <dd>{supply.amount}</dd>
                      </React.Fragment>
                    ))}
                  </dl>
                </Stack>

                <Stack spacing={2}>
                  <dl>
                    <dt>Date</dt>
                    <dd>{request.date.toLocaleString()}</dd>
                    <dt>Status</dt>
                    <dd>{RequestStatus[request.status]}</dd>
                  </dl>
                </Stack>
              </CustomAccordionDetails>
            </CustomAccordion>
          ))}
        </div>
      </Content>
    </React.Fragment>
  );
}
