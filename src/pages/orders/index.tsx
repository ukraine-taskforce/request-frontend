import React from "react";
import { Header } from "../../others/components/Header";
import { useAuth } from "../../others/contexts/auth";
import OutputIcon from "@mui/icons-material/Output";
import { Tooltip } from "@mui/material";

export function Orders() {
  const { logout } = useAuth();
  return (
    <React.Fragment>
      <Header hasHeadline hasLangSelector />
      <h1>orders</h1>
      <Tooltip title="Logout" arrow>
        <OutputIcon onClick={logout} sx={{ width: 30, height: 30, marginLeft: "auto", cursor: "pointer" }} />
      </Tooltip>
    </React.Fragment>
  );
}
