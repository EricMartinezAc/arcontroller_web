import { Box, Grid } from "@mui/material";
import React from "react";

import CardSingleData from "../../Partial_Dashboard/C_parts/CardSingleData";
import CardChartDonus from "../../Partial_Dashboard/C_parts/CardChartDonus";

import PropTypes from "prop-types";
import { TableChart } from "@mui/icons-material";
import CollapsibleTable from "../../Partial_Dashboard/C_parts/Collapsible_table";

function View(props) {
  return (
    <>
      <Grid container spacing={2}>
        <Grid className="GridCard" item xs={12} md={4}>
          <CardSingleData />
        </Grid>
        <Grid className="GridCard" item xs={12} md={4}>
          <CardSingleData />
        </Grid>
        <Grid className="GridCard" item xs={12} md={4}>
          <CardSingleData />
        </Grid>

        <Grid className="GridCard" item xs={12} md={4}>
          <CardChartDonus />
        </Grid>
        <Grid className="GridCard" item xs={12} md={4}>
          <CardChartDonus />
        </Grid>
        <Grid className="GridCard" item xs={12} md={4}>
          <CardChartDonus />
        </Grid>
        <Grid item xs={12} md={12}>
          <CollapsibleTable />
        </Grid>
      </Grid>
    </>
  );
}

View.propTypes = {};

export default View;
