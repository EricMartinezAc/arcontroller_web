import React from "react";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import FactoryIcon from "@mui/icons-material/Factory";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import CallSplitIcon from "@mui/icons-material/CallSplit";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import BuildIcon from "@mui/icons-material/Build";
//import CloudCircleIcon from "@mui/icons-material/CloudCircle";
import { CloudQueue } from "@mui/icons-material";
import HelpCenterIcon from "@mui/icons-material/HelpCenter";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import { Divider } from "@mui/material";
import PropTypes from "prop-types";

function ListItems_secund_dashboard({ handleWindow, modeStrict }) {
  return (
    <>
      <ListSubheader inset>Gestión de activos</ListSubheader>
      <ListItem
        style={{ display: modeStrict && "none" }}
        button
        onClick={() => handleWindow("3")}
      >
        <ListItemIcon>
          <FactoryIcon />
        </ListItemIcon>
        <ListItemText primary="Sucursales" />
      </ListItem>
      <ListItem button onClick={() => handleWindow("4")}>
        <ListItemIcon>
          <ManageAccountsIcon />
        </ListItemIcon>
        <ListItemText primary="Recursos humanos" />
      </ListItem>
      <ListItem button onClick={() => handleWindow("5")}>
        <ListItemIcon>
          <AccountTreeIcon />
        </ListItemIcon>
        <ListItemText primary="Planeación" />
      </ListItem>
      <ListItem button onClick={() => handleWindow("6")}>
        <ListItemIcon>
          <CallSplitIcon />
        </ListItemIcon>
        <ListItemText primary="Logística" />
      </ListItem>
      <ListItem button onClick={() => handleWindow("7")}>
        <ListItemIcon>
          <VerifiedUserIcon />
        </ListItemIcon>
        <ListItemText primary="HSEQ" />
      </ListItem>
      <ListItem button onClick={() => handleWindow("8")}>
        <ListItemIcon>
          <AccountBalanceIcon />
        </ListItemIcon>
        <ListItemText primary="Marco legal" />
      </ListItem>
      <br />
      <br />
      <Divider />

      <ListSubheader inset>Dispositivo</ListSubheader>
      <ListItem button onClick={() => handleWindow("9")}>
        <ListItemIcon>
          <BuildIcon />
        </ListItemIcon>
        <ListItemText primary="Configuraciones" />
      </ListItem>
      <ListItem button onClick={() => handleWindow("10")}>
        <ListItemIcon>
          <CloudQueue />
        </ListItemIcon>
        <ListItemText primary="Nube virtual" />
      </ListItem>
      <ListItem button onClick={() => handleWindow("11")}>
        <ListItemIcon>
          <HelpCenterIcon />
        </ListItemIcon>
        <ListItemText primary="Ayuda" />
      </ListItem>

      <br />
      <br />
    </>
  );
}

ListItems_secund_dashboard.propTypes = {};

export default ListItems_secund_dashboard;
