import React, { useState, useEffect } from "react";
import { Box, Grid, Link, Typography } from "@mui/material";
import ReqResDatos_auth_API from "./ClassAUTHREG";

// Importar los módulos de validación
import {
  ValideInputPassword,
  ValideInputUsuario,
} from "../../Common/ModulosSis/ValideInputREGEXP";

import FormAuthRegtr from "./Login/FormAuthRegtr";
import DescriptionAlerts from "../../Common/Intercciones/DescriptionAlerts";
import pages from "../../../Assets/pages";
import { SinginProps } from "../../../dto/SinginProps";
import ValideCookies from "../../Common/ModulosSis/ValideCookies";

const SignUpOrSignIn: React.FC<any> = ({
  serverResources,
  engineResources,
}) => {
  const reqResDatos_auth_API = new ReqResDatos_auth_API();
  const [visibleFormAuth, setVisibleFormAuth] = useState<boolean>(true);

  // Estado de carga y alertas

  // Manejo del estado de carga
  useEffect(() => {
    setTimeout(() => {
      setStateLoading("none");
    }, 15000);
  }, [stateLoading]);

  // Manejo de las alertas
  useEffect(() => {
    setTimeout(() => {
      setAlertDialogs(["none", "", "", "", ""]);
    }, 6500);
  }, [AlertDialogs]);

  // Validación de cookies
  useEffect(() => {
    const rspValideCookies = ValideCookies("Singin", cookies, pages);
    console.log(rspValideCookies);
    if (rspValideCookies.getApp === null && rspValideCookies.msj !== null) {
      setStateLoading("block");
      setTimeout(() => {
        window.location.href = pages.this;
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
  }, [cookies, pages, reqResDatos_auth_API]);

  // Validación del formulario
  const ValidacionFormAuth = (user: string, pswLogin: string): boolean => {
    return ValideInputUsuario(user) && ValideInputPassword(pswLogin);
  };

  return (
    <Grid
      container
      sx={{
        backgroundColor: "#a9a",
        height: "auto",
      }}
    >
      {/* ALERTAS */}

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
        alert
        {/* <DescriptionAlerts
          AlertSeverity={AlertDialogs[1]}
          AlertTilte={AlertDialogs[2]}
          AlertMsjLow={AlertDialogs[3]}
          AlertMsjHight={AlertDialogs[4]}
        /> */}
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
        <Box>
          form auth
          {/* <FormAuthRegtr
            visibleFormAuth={visibleFormAuth}
            ValidacionFormAuth={ValidacionFormAuth}
            setStateLoading={setStateLoading}
            setAlertDialogs={setAlertDialogs}
            setUser={setUser}
            setProduct={setProduct}
            setBranches={setBranches}
          /> */}
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
};

export default SignUpOrSignIn;
