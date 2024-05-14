import { Grid } from "@mui/material";
import React from "react";

import TableDatasSucursales from "./Partials/TableDataSucursales";
import CardSingleData from "../../Partial_Dashboard/C_parts/CardSingleData";
import ListSingle from "../../Partial_Dashboard/C_parts/ListSingle";
import Menu from "./Partials/MenuSucursales";

function View({
  owner,
  user,
  usersOwner,
  sucursales,
  setdataFormAddSucursal,
  setSucursales,
}) {
  return (
    <Grid container spacing={0}>
      <Grid item xs={12}>
        <Menu
          owner={owner}
          user={user}
          usersOwner={usersOwner}
          setdataFormAddSucursal={setdataFormAddSucursal}
          datos={sucursales}
          setSucursales={setSucursales}
        />
      </Grid>
      <Grid p={1} item xs={12}>
        <TableDatasSucursales datos={sucursales} />
      </Grid>
    </Grid>
  );
}

View.propTypes = {};

export default View;
