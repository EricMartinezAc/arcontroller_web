import React, { Component, useEffect, useState } from "react";

//recursos
import axios from "axios";
import Cookies from "universal-cookie";
import { Box } from "@mui/material";
import "../../../Assets/styles/Inicio.css";
import pages from "../../../Assets/pages";

//components
import Loading from "../../Common/Intercciones/Loading";
import Header from "../../../Components/Routes/Inicio/Partials/Header/Header";
import Main from "../../../Components/Routes/Inicio/Partials/Main/Main";
import Aside from "../../../Components/Routes/Inicio/Partials/Aside/Aside";
import Footer from "../../Common/Interfaz/Footer";

//funcionaidades
import ValideCookies from "../../Common/ModulosSis/ValideCookies";
import ReqResDatos_auth_API from "../Session/ClassAUTHREG";

import DescriptionAlerts from "../../Common/Intercciones/DescriptionAlerts";
import AlertCookies from "../../Common/Interfaz/modalAceptPolicy";

function Inicio(props) {
  const cookies = new Cookies();
  const reqResDatos_auth_API = new ReqResDatos_auth_API();
  //window loading and alert
  const [state_policy_cookies, setState_policy_cookies] = useState(false);
  const [stateLoading, setStateLoading] = useState("none");
  const [AlertDialogs, setAlertDialogs] = useState(["none", "", "", "", ""]);

  //on start
  useEffect(() => {
    const respValideCookies = ValideCookies("Inicio", cookies, pages);
    if (respValideCookies.getApp) {
      setAlertDialogs([
        "block",
        "success",
        "Respuesta de validación",
        "Ahora puedes usar al aplicación. ",
        respValideCookies.msj,
      ]);
      reqResDatos_auth_API.GetAPP(respValideCookies.token, axios);
    }
  }, []);

  const AceptacionCookies = async () => {
    await setState_policy_cookies(true);
    await cookies.set("aceptLegacy", true, {
      path: "/",
      secure: true,
      sameSite: "strict",
      maxAge: 360000,
    });
    setAlertDialogs([
      "block",
      "success",
      "Políticas de manejo de datos",
      "Ahora puedes usar al aplicación.",
      "Da clic en inicio de seión para continuar",
    ]);
    setTimeout(() => {
      setAlertDialogs(["none", "", "", "", ""]);
    }, 6000);
  };
  const DenegarCookies = async () => {
    setAlertDialogs([
      true,
      "warning",
      "Políticas de manejo de datos",
      "Lo sentimos, las cookies son necesarias para el funcionamiento del sistema",
      "Puedes ver y usar otros servicios",
    ]);
  };

  return (
    <>
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
      <header>
        <Header
          setStateLoading={setStateLoading}
          stateLoading={stateLoading}
          state_permission_login={state_policy_cookies}
        />
      </header>
      <section
        className="section_alertCookies"
        style={{ display: !state_policy_cookies ? "block" : "none" }}
      >
        <AlertCookies
          AceptacionCookies={AceptacionCookies}
          DenegarCookies={DenegarCookies}
        />
      </section>
      <section className="section_inicio">
        <main>
          <Main />
        </main>
        <aside className="aside_inicio">
          <Aside />
        </aside>
      </section>
      <footer>
        <Footer />
      </footer>
    </>
  );
}

Inicio.propTypes = {};

export default Inicio;

// componentDidUpdate () {
//   if (state.stateAlertDialogs)
//     setTimeout(
//       () => CambiarEstadoDescriptionAlerts(false, '', '', '', ''),
//       4000
//     )
//   console.log(cookies.getAll())
// }
