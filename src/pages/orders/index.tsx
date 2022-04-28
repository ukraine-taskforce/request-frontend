import React, { useEffect, useState } from "react";
import ReactGA from "react-ga4";
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

export function Orders() {
  const { t } = useTranslation();
  const { logout } = useAuth();
  const [visibleRequestId, setVisibleRequestId] = useState<number | undefined>(undefined);
  const { data: cities } = useLocationsQuery();
  const { data: supplies } = useSuppliesQuery();

  // TODO: If we don't replace it with a better mechanism at least use useMemo.
  const cityLookup = cities ? Object.assign({}, ...cities.map((city) => ({[city.id]: city }))) : {};
  const supplyLookup = supplies ? Object.assign({}, ...supplies.map((supply) => ({[supply.id]: supply }))): {};

  useEffect(() => {
    document.title = t("orders_page_title");
    ReactGA.send("pageview");
  }, [t]);
 
  return (
    <React.Fragment>
      <Header hasHeadline hasLangSelector />
      <Content>
        <h1 className="title">Orders</h1>
        <Tooltip title="Logout" arrow>
          <OutputIcon onClick={logout} sx={{ width: 30, height: 30, marginLeft: "auto", cursor: "pointer" }} />
        </Tooltip>
          <Spacer size={24} />
          <div className={styles.flex}>
            {fakeRequests.map((request) => (
              <React.Fragment key={request.id}>
                <Card className={styles.card} onClick={() => setVisibleRequestId(request.id)}>
                  <Text variant="bold">Request #{request.id}</Text>
                </Card>
                { visibleRequestId === request.id && <Card>
                  {cityLookup[request.city_id].name}<br/>
                  {request.userName}<br/>
                  {request.userPhoneNumber}<br/>
                  <br/>
                  {request.supplies.map((supply) => (
                    <Text key={supply.id}>
                      {supplyLookup[supply.id].name}: {supply.amount}
                    </Text>
                  ))}

                  <br/><br/>
                  Date: <br/>
                  {request.date.toLocaleString()}<br/><br/>
                  Status: <br/>
                  {RequestStatus[request.status]}
                </Card> }
                <Spacer size={6} />
              </React.Fragment>
            ))}
          </div>
        </Content>
    </React.Fragment>
  );
}
