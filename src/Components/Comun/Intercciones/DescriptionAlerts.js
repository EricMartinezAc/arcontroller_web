import * as React from "react";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Stack from "@mui/material/Stack";
import { Box } from "@mui/material";

import PropTypes from "prop-types";

function DescriptionAlerts(props) {
  if (props.AlertSeverity === "error") {
    return (
      <Box sx={{ width: "100%" }} spacing={2}>
        <Alert severity="error">
          <AlertTitle>{props.AlertTilte}</AlertTitle>
          {props.AlertMsjLow}.<strong>{props.AlertMsjHight}</strong>
        </Alert>
      </Box>
    );
  }

  if (props.AlertSeverity === "warning") {
    return (
      <Box sx={{ width: "100%" }} spacing={2}>
        <Alert severity="warning">
          <AlertTitle>{props.AlertTilte}</AlertTitle>
          {props.AlertMsjLow}.<strong> {props.AlertMsjHight}</strong>
        </Alert>
      </Box>
    );
  }
  if (props.AlertSeverity === "info") {
    return (
      <Box sx={{ width: "100%" }} spacing={2}>
        <Alert severity="info">
          <AlertTitle>{props.AlertTilte}</AlertTitle>
          {props.AlertMsjLow}.<strong> {props.AlertMsjHight}</strong>
        </Alert>
      </Box>
    );
  }
  if (props.AlertSeverity === "success") {
    return (
      <Box sx={{ width: "100%" }} spacing={2}>
        <Alert severity="success">
          <AlertTitle>{props.AlertTilte}</AlertTitle>
          {props.AlertMsjLow}.<strong> {props.AlertMsjHight}</strong>
        </Alert>
      </Box>
    );
  }
}

DescriptionAlerts.propTypes = {};

export default DescriptionAlerts;
