import React, { Component, useEffect, useState } from "react";

//recursos
import axios from "axios";
import "../../../Assets/styles/home.css";
import { Routes as pages } from "../../../constans/Routes";

//components
import Header from "./Partials/Header/Header";
import Main from "./Partials/Main/Main";
import Aside from "./Partials/Aside/Aside";
import Footer from "../../Common/Interfaz/Footer";

//funcionaidades
import { DropAll as DropAllCookies } from "../../Common/ModulosSis/DropCookies";
import ReqResDatos_auth_API from "../../Common/ModulosSis/auth/ClassAUTHREG";

import AlertCookies from "../../Common/Interfaz/modalAceptPolicy";
import { useGeneralContext } from "../../../Context/GeneralContext";

const Inicio: React.FC = () => {
  const { engineResources } = useGeneralContext();
  const reqResDatos_auth_API = new ReqResDatos_auth_API();

  //on start
  useEffect(() => {
    DropAllCookies(engineResources.cookies, "/");
  }, []);

  const AceptacionCookies = async () => {
    engineResources.Legacy[1](!engineResources.Legacy[0]);
    engineResources.DescriptionAlerts[1]([
      "block",
      "success",
      "Políticas de manejo de datos",
      "Ahora puedes usar al aplicación.",
      "Da clic en inicio de seión para continuar",
    ]);
    console.log(1, engineResources.DescriptionAlerts[0]);
    setTimeout(() => {
      engineResources.DescriptionAlerts[1](["none", "", "", "", ""]);

      console.log(2, engineResources.DescriptionAlerts[0]);
    }, 6000);
  };
  const DenegarCookies = async () => {
    engineResources.DescriptionAlerts[1]([
      "block",
      "warning",
      "Políticas de manejo de datos",
      "Lo sentimos, las cookies son necesarias para el funcionamiento del sistema",
      "Puedes ver y usar otros servicios",
    ]);
  };

  return (
    <>
      <header className="header">
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
