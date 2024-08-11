import React, { useState, useEffect } from "react";
import { Box, Grid, Link, Typography } from "@mui/material";
import ReqResDatos_auth_API from "./ClassAUTHREG";
import {
  ValideInputPassword,
  ValideInputUsuario,
} from "../../Common/ModulosSis/ValideInputREGEXP";
import FormAuthRegtr from "./Login/FormAuthRegtr";
import DescriptionAlerts from "../../Common/Intercciones/DescriptionAlerts";
import { SinginProps } from "../../../dto/SinginProps";
import { PagesDTO } from "@/dto/PagesDTO";
import { ResponseValideCookies } from "@/dto/RespValideCookies.dto";

interface SignUpOrSignInProps {
  serverResources: {
    user: any; // Replace with appropriate type
    setUser: React.Dispatch<React.SetStateAction<any>>; // Replace with appropriate type
    prodct: any; // Replace with appropriate type
    setProdct: React.Dispatch<React.SetStateAction<any>>; // Replace with appropriate type
    branches: any; // Replace with appropriate type
    setBranches: React.Dispatch<React.SetStateAction<any>>; // Replace with appropriate type
  };
  engineResources: {
    isSmallScreen: boolean;
    pages: PagesDTO;
    ValideCookies: ResponseValideCookies;
    aceptLegacy: boolean;
    setAceptLegacy: React.Dispatch<React.SetStateAction<boolean>>;
    AlertDialogs: string[];
    setAlertDialogs: React.Dispatch<React.SetStateAction<string[]>>;
    stateLoading: string;
    setStateLoading: React.Dispatch<React.SetStateAction<string>>;
    cookies: any;
  };
}

const SignUpOrSignIn: React.FC<SignUpOrSignInProps> = ({
  serverResources,
  engineResources,
}) => {
  const reqResDatos_auth_API = new ReqResDatos_auth_API();
  const [visibleFormAuth, setVisibleFormAuth] = useState<boolean>(true);

  // Estado de carga y alertas
  const [stateLoading, setStateLoading] = useState<string>("flex");
  const [AlertDialogs, setAlertDialogs] = useState<string[]>([
    "none",
    "",
    "",
    "",
    "",
  ]);

  // Manejo del estado de carga
  useEffect(() => {
    const timer = setTimeout(() => {
      setStateLoading("none");
    }, 15000);

    return () => clearTimeout(timer); // Limpiar el temporizador cuando el componente se desmonte
  }, []);

  // Manejo de las alertas
  useEffect(() => {
    const timer = setTimeout(() => {
      setAlertDialogs(["none", "", "", "", ""]);
    }, 6500);

    return () => clearTimeout(timer); // Limpiar el temporizador cuando el componente se desmonte
  }, [AlertDialogs]);

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
        {/* Aquí puedes descomentar DescriptionAlerts si es necesario */}
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
          {/* Aquí puedes descomentar FormAuthRegtr si es necesario */}
          {/* <FormAuthRegtr
            visibleFormAuth={visibleFormAuth}
            ValidacionFormAuth={ValidacionFormAuth}
            setStateLoading={setStateLoading}
            setAlertDialogs={setAlertDialogs}
            setUser={serverResources.setUser}
            setProduct={serverResources.setProdct}
            setBranches={serverResources.setBranches}
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
