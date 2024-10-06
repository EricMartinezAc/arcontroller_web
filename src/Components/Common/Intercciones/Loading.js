import { Typography } from "@mui/material";
import { Box, width } from "@mui/system";
import React, { Component } from "react";
import PropTypes from "prop-types";

import img_loading from "../../../Assets/Imgs/icos/loading3.gif";

function Loading(props) {
  return (
    <>
      <Box
        sx={{
          width: "100%",
          height: "max-content",
          position: "relative",
          top: "100px",
          textAlign: "center",
        }}
      >
        <img src={img_loading} alt="Cargando" />
        <br />
        <br />
        <Typography variant="h5" sx={{ width: "100%", color: "#232" }}>
          Esperar es parte del proceso...
        </Typography>
      </Box>
    </>
  );
}

Loading.propTypes = {};

export default Loading;
