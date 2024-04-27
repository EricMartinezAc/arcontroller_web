import { Grid } from "@mui/material";
import React from "react";

import TableDatas from "../../Partial_Dashboard/C_parts/TableDatas";
import CardSingleData from "../../Partial_Dashboard/C_parts/CardSingleData";
import ListSingle from "../../Partial_Dashboard/C_parts/ListSingle";
import Menu from "../../Partial_Dashboard/C_parts/MenuLocalidades";

import PropTypes from "prop-types";

function View(props) {
  return (
    <Grid container spacing={0}>
      <Grid item xs={12}>
        <Menu />
      </Grid>
      <Grid p={1} item xs={12} md={8}>
        <TableDatas />
      </Grid>
      <Grid p={1} container spacing={1} sx={{ display: "flex" }} xs={12} md={4}>
        <Grid item xs={12}>
          <CardSingleData />
        </Grid>
        <Grid item xs={12}>
          <ListSingle />
        </Grid>
      </Grid>
    </Grid>
  );
}

View.propTypes = {};

export default View;
