import React, { Component } from "react";

import CardSingleData from "../../Partial_Dashboard/C_parts/CardSingleData";
import CardChartDonus from "../../Partial_Dashboard/C_parts/CardChartDonus";
import { Grid } from "@mui/material";

export default class View extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Grid container spacing={2}>
        <Grid className="GridCard" item xs={6} md={3}>
          <CardSingleData />
        </Grid>
        <Grid className="GridCard" item xs={6} md={3}>
          <CardSingleData />
        </Grid>
        <Grid className="GridCard" item xs={6} md={3}>
          <CardSingleData />
        </Grid>
        <Grid className="GridCard" item xs={6} md={3}>
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

        <Grid className="GridCard" item xs={6} md={3}>
          <CardSingleData />
        </Grid>
        <Grid className="GridCard" item xs={6} md={3}>
          <CardSingleData />
        </Grid>
        <Grid className="GridCard" item xs={6} md={3}>
          <CardSingleData />
        </Grid>
        <Grid className="GridCard" item xs={6} md={3}>
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
      </Grid>
    );
  }
}
