import React, { useState, useEffect } from "react";
import { Box, Grid, Link, Typography } from "@mui/material";
import ReqResDatos_auth_API from "./ClassAUTHREG";
import {
  ValideInputPassword,
  ValideInputUsuario,
} from "../../Common/ModulosSis/ValideInputREGEXP";
import { PagesDTO } from "@/dto/Pages.dto";
import { ResponseValideCookies } from "@/dto/RespValideCookies.dto";
import DescriptionAlerts from "../../Common/Intercciones/DescriptionAlerts";
import FormAuthRegtr from "./Login/FormAuthRegtr";
import { UserDTO } from "@/dto/User.dto";
import { ProdctDTO } from "@/dto/Prodct.dto";
import { BranchesDTO } from "@/dto/Branches.dto";
import { InicioProps } from "@/dto/InicioProps.dto";

const SignUpOrSignIn: React.FC<InicioProps> = ({
  serverResources,
  engineResources,
}) => {
  const reqResDatos_auth_API = new ReqResDatos_auth_API();
  const [visibleFormAuth, setVisibleFormAuth] = useState<boolean>(true);

  // Validación del formulario
  const ValidacionFormAuth = (user: string, pswLogin: string): boolean => {
    return ValideInputUsuario(user) && ValideInputPassword(pswLogin);
  };

  // Definir los valores posibles para AlertSeverity
  type AlertSeverityType = "error" | "warning" | "info" | "success";
  const validAlertSeverity: AlertSeverityType = [
    "error",
    "warning",
    "info",
    "success",
  ].includes(engineResources.AlertDialogs[1] as AlertSeverityType)
    ? (engineResources.AlertDialogs[1] as AlertSeverityType)
    : "info"; // Valor por defecto

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
          display: engineResources.AlertDialogs[0],
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
          AlertSeverity={validAlertSeverity}
          AlertTilte={engineResources.AlertDialogs[2]}
          AlertMsjLow={engineResources.AlertDialogs[3]}
          AlertMsjHight={engineResources.AlertDialogs[4]}
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
        <Box>
          <FormAuthRegtr
            serverResources={serverResources}
            engineResources={engineResources}
            visibleFormAuth={visibleFormAuth}
            ValidacionFormAuth={ValidacionFormAuth}
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
};

export default SignUpOrSignIn;
