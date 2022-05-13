import React, { useEffect, useState } from "react";
import ReactGA from "react-ga4";
import { Accordion, AccordionSummary, AccordionDetails, Typography, Stack, Dialog, Grow, Avatar, Chip, Box } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { useTranslation } from "react-i18next";
import { Header } from "../../others/components/Header";
import { Spacer } from "../../others/components/Spacer";
import { Text } from "../../others/components/Text";
import { Content } from "../../others/components/Content";
import { Request, RequestStatus } from "../../others/helpers/requests";
import { useLocationsQuery, useSuppliesQuery, useListRequests } from "../../others/contexts/api";
import styles from "./orders.module.css";
import FilterListIcon from "@mui/icons-material/FilterList";
import { ImgBack } from "../../medias/images/UGT_Asset_UI_Back";

const statusToColor = {
  [RequestStatus.New]: "blue",
  [RequestStatus.InTransit]: "#FFD400",
  [RequestStatus.Invalid]: "#CF2A20",
  [RequestStatus.Delivered]: "#00B17C",
  [RequestStatus.Expired]: "#0D1234"
};

export function Orders() {
  const { t } = useTranslation();
  const [expandedRequestPanel, setExpandedRequestPanel] = useState<string | false>(false);
  const { data: cities } = useLocationsQuery();
  const { data: supplies } = useSuppliesQuery();
  const { data: requests } = useListRequests();
  const [filterOpen, setFilterOpen] = React.useState(false);
  const [ignoreStatus, setIgnoreStatus] = React.useState<number[]>([]);

  // TODO: If we don't replace it with a better mechanism at least use useMemo.
  const cityLookup = cities ? Object.assign({}, ...cities.map((city) => ({ [city.id]: city }))) : {};
  const supplyLookup = supplies ? Object.assign({}, ...supplies.map((supply) => ({ [supply.id]: supply }))) : {};

  const toggleRequestPanel = (panel: string) => (event: React.SyntheticEvent, newExpandedPanel: boolean) => {
    setExpandedRequestPanel(newExpandedPanel ? panel : false);
  };

  const toggleRequestStatus = React.useCallback(
    (status: RequestStatus) => {
      const array = [...ignoreStatus];
      const index = array.indexOf(status);
      if (index === -1) {
        array.push(status);
      } else {
        array.splice(index, 1);
      }
      setIgnoreStatus(array);
    },
    [ignoreStatus]
  );

  const handleClose = () => {
    setFilterOpen(false);
  };
  const showFilters = () => { setFilterOpen(true); };

  useEffect(() => {
    document.title = t("orders_page_title");
    ReactGA.send("pageview");
  }, [t]);

  // TODO need to properly handle error and loading states
  if (!cities || !supplies || !requests) {
    return null;
  }

  const filteredRequests = requests.filter((request: Request) => (!ignoreStatus.includes(request.status)));

  return (
    <React.Fragment>
      <Header hasHeadline hasLangSelector />
      <Content>
        <h1 className="title">Orders</h1>
        <Avatar sx={{ backgroundColor: "#274FDB", cursor: "pointer" }}>
          <FilterListIcon onClick={showFilters} sx={{ color: "white" }} />
        </Avatar>
        <Spacer size={24} />

        <div>
          {filteredRequests.map((request) => (
            <Accordion
              disableGutters
              elevation={0}
              square
              expanded={expandedRequestPanel === `panel-${request.internal_id}`}
              onChange={toggleRequestPanel(`panel-${request.internal_id}`)}
              key={request.internal_id}
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
                aria-controls={`panel-${request.internal_id}-content`}
                id={`panel-${request.internal_id}-header`}
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
                <Box display="flex" justifyContent="space-between" flexGrow="inherit">
                  <Box sx={{ marginLeft: "0px", paddingTop: "5px" }}>
                    <Text variant="bold">Request #{request.internal_id.substr(0, 8)}</Text>
                  </Box>
                  <Box marginLeft="20px" className={styles.circle}
                    sx={{ backgroundColor: statusToColor[request.status] }}
                  />
                </Box>
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
                        <dt>{supplyLookup[supply.id].parent}: {supplyLookup[supply.id].name}</dt>
                        <dd>{supply.amount}</dd>
                      </React.Fragment>
                    ))}
                  </dl>
                </Stack>

                <Spacer size={20} />

                <Stack spacing={1}>
                  <dl className={styles.descriptionList}>
                    <dt>Date</dt>
                    <dd>{new Date(request.timestamp).toLocaleString()}</dd>
                    <dt>Status</dt>
                    <dd>{RequestStatus[request.status]}</dd>
                  </dl>
                </Stack>
              </AccordionDetails>
            </Accordion>
          ))}
        </div>
        <Dialog
          fullScreen
          open={filterOpen}
          onClose={handleClose}
          TransitionComponent={Grow as React.ComponentType}
        >
          <div className="dialog_body">
            <div className="dialog_body_root">
              <div onClick={handleClose} className={styles.headerItem} >
                <ImgBack alt="Back" className={styles.backIcon} />
                <span>Back</span>
              </div>
              <Spacer size={20} />
              <Text className={styles.filterTitle}>Status</Text>
              <Spacer size={10} />
              <Stack direction="row" spacing={1} >
                <Chip label="New" classes={{ label: styles.filterChip }} color={ignoreStatus.indexOf(RequestStatus.New) !== -1 ? "default" : "primary"} onClick={() => toggleRequestStatus(RequestStatus.New)} />
                <Chip label="In transit" classes={{ label: styles.filterChip }} color={ignoreStatus.indexOf(RequestStatus.InTransit) !== -1 ? "default" : "primary"} onClick={() => toggleRequestStatus(RequestStatus.InTransit)} />
                <Chip label="Delivered" classes={{ label: styles.filterChip }} color={ignoreStatus.indexOf(RequestStatus.Delivered) !== -1 ? "default" : "primary"} onClick={() => toggleRequestStatus(RequestStatus.Delivered)}  />
                <Chip label="Invalid" classes={{ label: styles.filterChip }} color={ignoreStatus.indexOf(RequestStatus.Invalid) !== -1 ? "default" : "primary"} onClick={() => toggleRequestStatus(RequestStatus.Invalid)} />
                <Chip label="Expired" classes={{ label: styles.filterChip }} color={ignoreStatus.indexOf(RequestStatus.Expired) !== -1 ? "default" : "primary"} onClick={() => toggleRequestStatus(RequestStatus.Expired)} />
              </Stack>
            </div>
          </div>
        </Dialog>
      </Content>
    </React.Fragment>
  );
}
