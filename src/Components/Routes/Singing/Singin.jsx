import React, { Component, useState, useEffect } from "react";
import {
  Alert,
  Box,
  Button,
  Grid,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import Cookies from "universal-cookie";
import axios from "axios";

import ValideCookies from "../../Comun/ModulosSis/ValideCookies";
import ReqResDatos_auth_API from "./ClassAUTHREG";
//import RestarApp from '../../Comun/ModulosSis/RestarApp';

import {
  ValideInputPassword,
  ValideInputUsuario,
} from "../../Comun/ModulosSis/ValideInputREGEXP";

import Login from "./Login/Login";
import FormAuthRegtr from "./Login/FormAuthRegtr";
import DescriptionAlerts from "../../Comun/Intercciones/DescriptionAlerts";
import Loading from "../../Comun/Intercciones/Loading";
import pages from "../../../Assets/pages";

function Singin(props) {
  const [visibleFormAuth, setVisibleFormAuth] = useState(true);
  const cookies = new Cookies();
  const reqResDatos_auth_API = new ReqResDatos_auth_API();
  //window loading and alert
  const [stateLoading, setStateLoading] = useState("none");
  const [AlertDialogs, setAlertDialogs] = useState(["none", "", "", "", ""]);
  useEffect(() => {
    setTimeout(() => {
      setStateLoading("none");
    }, 7000);
  }, [stateLoading]);
  useEffect(() => {
    setTimeout(() => {
      setAlertDialogs(["none", "", "", "", ""]);
    }, 6500);
  }, [AlertDialogs]);

  //valide cookies
  useEffect(() => {
    //valide permisions
    const rspValideCookies = ValideCookies("Singin", cookies, pages);
    console.log(rspValideCookies);
    if (rspValideCookies.getApp === null && rspValideCookies.msj !== null) {
      setStateLoading("block");
      setTimeout(() => {
        window.location = pages.this;
      }, 6000);
    }
    if (rspValideCookies.getApp) {
      setStateLoading("block");
      setTimeout(() => {
        reqResDatos_auth_API.GetAPP(
          cookies.get("user") || "undefined",
          cookies.get("token")
        );
      }, 6000);
    }
  }, []);

  //valide forms
  const ValidacionFormAuth = (user, pswLogin) => {
    return ValideInputUsuario(user) && ValideInputPassword(pswLogin)
      ? true
      : false;
  };

  return (
    <Grid
      container
      sx={{
        backgroundColor: "#a9a",
        height: "auto",
        //`repeat(auto-fit, minmax('150px', '1fr'))`
      }}
    >
      {/* ALERTAS */}
      <Box
        sx={{
          display: stateLoading,
          backgroundColor: "rgba(238, 221, 238, 0.742)",
          zIndex: 10,
          position: "absolute",
          width: "100%",
          height: "125%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Loading />
      </Box>
      <Box
        sx={{
          display: AlertDialogs[0],
          zIndex: 10,
          width: "100%",
          height: "auto",
          position: "absolute",
          top: "10%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <DescriptionAlerts
          AlertSeverity={AlertDialogs[1]}
          AlertTilte={AlertDialogs[2]}
          AlertMsjLow={AlertDialogs[3]}
          AlertMsjHight={AlertDialogs[4]}
        />
      </Box>

      {/* Forms */}
      <Grid
        sx={{
          padding: "0 5%",
        }}
        item
        md={5}
        xs={12}
      >
        {/* FORM */}
        <Box>
          <FormAuthRegtr
            visibleFormAuth={visibleFormAuth}
            ValidacionFormAuth={ValidacionFormAuth}
            stateLoading={stateLoading}
            setStateLoading={setStateLoading}
            AlertDialogs={AlertDialogs}
            setAlertDialogs={setAlertDialogs}
          />
        </Box>
      </Grid>
      {/* Handle visible forms */}
      <Grid
        sx={{
          backgroundColor: "#ede",
        }}
        item
        md={7}
        xs={12}
      >
        <Box
          borderLeft={3}
          borderColor="#989"
          sx={{
            padding: "50px 100px 0 100px",
            height: "100vh",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              width: "100%",
            }}
          >
            {visibleFormAuth
              ? "Si desea incorporar un nuevo usuario"
              : "Inicie sesión con usuario registrado"}
            <Link
              sx={{ marginLeft: "5px", cursor: "pointer" }}
              onClick={() => setVisibleFormAuth(!visibleFormAuth)}
            >
              clic aquí
            </Link>
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
}

Singin.propTypes = {};

export default Singin;
