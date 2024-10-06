import React, { Component, useEffect, useState } from "react";

//recursos
import axios from "axios";
import "../../../Assets/styles/Inicio.css";
import { Routes as pages } from "../../../constans/Routes";

//components
import Header from "./Partials/Header/Header";
import Main from "./Partials/Main/Main";
import Aside from "./Partials/Aside/Aside";
import Footer from "../../Common/Interfaz/Footer";

//funcionaidades
import ReqResDatos_auth_API from "../Session/ClassAUTHREG";

import AlertCookies from "../../Common/Interfaz/modalAceptPolicy";
import { useGeneralContext } from "../../../Context/GeneralContext";

const Inicio: React.FC = () => {
  const { engineResources } = useGeneralContext();
  const reqResDatos_auth_API = new ReqResDatos_auth_API();

  //on start
  useEffect(() => {
    const respValideCookies = engineResources.ValideCookies(
      "Inicio",
      engineResources.cookies,
      pages
    );
    if (respValideCookies.getApp) {
      engineResources.IUComponets[1]([
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
    await engineResources.cookies.set("aceptLegacy", true, {
      path: "/",
      secure: true,
      sameSite: "strict",
      maxAge: 360000,
    });
    engineResources.IUComponets[1]([
      "block",
      "success",
      "Políticas de manejo de datos",
      "Ahora puedes usar al aplicación.",
      "Da clic en inicio de seión para continuar",
    ]);
    setTimeout(() => {
      engineResources.IUComponets[1](["none", "", "", "", ""]);
    }, 6000);
  };
  const DenegarCookies = async () => {
    engineResources.IUComponets[1]([
      true,
      "warning",
      "Políticas de manejo de datos",
      "Lo sentimos, las cookies son necesarias para el funcionamiento del sistema",
      "Puedes ver y usar otros servicios",
    ]);
  };

  return (
    <>
      <header>
        <Header state_permission_login={engineResources.Legacy[0]} />
      </header>
      <section
        className="section_alertCookies"
        style={{ display: !engineResources.Legacy[0] ? "block" : "none" }}
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
};

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
