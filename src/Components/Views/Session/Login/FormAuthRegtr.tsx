import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { Box, FormControlLabel, Switch } from "@mui/material";
import ClassAUTHREG from "../../../Common/ModulosSis/auth/ClassAUTHREG";
import AsigneCookies from "../../../Common/ModulosSis/AsigneCookies";
import Logo from "../../../../Assets/Imgs/logos/logo_632x512.png";
import "../../../../Assets/styles/FormAuthRegtr.css";
import { useGeneralContext } from "../../../../Context/GeneralContext";

import {
  ValideInputProduct,
  ValideInputPassword,
  ValideInputUsuario,
} from "../../../Common/ModulosSis/ValideInputREGEXP";

// Definir los tipos de las props

const classAUTHREG = new ClassAUTHREG();

const FormAuthRegtr: React.FC<any> = ({ visibleFormAuth }) => {
  // Estado del formulario
  const { engineResources, serverResources } = useGeneralContext();

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "owner") {
      serverResources.setProdct((prev: any) => ({
        ...prev,
        owner: value,
      }));
    }
    if (name === "clav_prodct") {
      serverResources.setProdct((prev: any) => ({
        ...prev,
        clav_prodct: value,
      }));
    }
    if (name === "id") {
      serverResources.setID(value);
    }
    if (name === "user") {
      serverResources.setUser((prev: any) => ({
        ...prev,
      }));
    }
    if (name === "pswLogin") {
      serverResources.setUser((prev: any) => ({
        ...prev,
        pswLogin: value,
      }));
    }
  };

  const enviarDatosReg = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const RespValideProduct = await ValideInputProduct(
        serverResources.prodct.owner
      );
      const RespValideUser = await ValideInputUsuario(
        serverResources.user.user
      );
      const RespValidePsw = await ValideInputPassword(
        serverResources.user.pswLogin
      );

      if (!RespValideProduct || !RespValidePsw || !RespValideUser) {
        console.error("Valores no cumplen con politicas.", [
          RespValideProduct,
          RespValideUser,
          RespValidePsw,
        ]);
        throw new Error("Valores no cumplen con las condiciones");
      }

      // Configurar datos para registrar\
      engineResources.Loading[1]("block");
      await classAUTHREG.SetDatsToAPI(
        serverResources.prodct.owner,
        serverResources.prodct.clav_prodct,
        serverResources.id,
        serverResources.user.user,
        serverResources.user.pswLogin
      );

      // Enviar datos para guardar/registrar

      const respAPI = visibleFormAuth
        ? await classAUTHREG.AuthUser()
        : classAUTHREG.RegtrUser();
      // Respuesta del servidor
      console.log("respApi::::: ", respAPI);
      // resolver
      if (respAPI.statusCode === 200) {
        console.log(127, serverResources.user);

        // Asignar cookies
        await AsigneCookies("token", respAPI.token, engineResources.cookies);

        // Redirigir al panel de la aplicación
        await classAUTHREG.GetAPP();
      } else {
        engineResources.DescriptionAlerts[1]([
          "block",
          "error",
          "Respuesta de servidor",
          "->",
          `${respAPI.statusCode}-${respAPI.msj}`,
        ]);
        setTimeout(() => {
          window.location.reload();
        }, 5000);
      }
    } catch (error) {
      engineResources.Loading[1]("none");
      console.error("Error enviando datos al servidor: ", error);
      alert("Error enviando datos al servidor, revise su conexión.");
    }
  };

  return (
    <Box
      sx={{
        display: "block",
        padding: "0 auto",
        margin: "0 auto",
        textAlign: "center",
        color: "#232",
      }}
    >
      <img alt="logo" className="logo" src={Logo} />
      <h3 className="title">
        {visibleFormAuth ? "AUTENTICACION" : "REGISTRO"}
      </h3>

      <form className="FormAuth" onSubmit={enviarDatosReg}>
        <Box sx={{ display: visibleFormAuth ? "none" : "inherit" }}>
          <input
            type="text"
            name="owner"
            id="owner"
            className="form-control input_text_index"
            autoComplete="on"
            placeholder="INGRESE NOMBRE DE PRODUCTO"
            value={serverResources.prodct.owner}
            onChange={onChange}
          />
        </Box>
        <Box sx={{ display: visibleFormAuth ? "none" : "inherit" }}>
          <input
            type="text"
            name="clav_prodct"
            id="clav_prodct"
            className="form-control input_text_index"
            autoComplete="on"
            placeholder="INGRESE CLAVE DE PRODUCTO"
            value={serverResources.prodct.clav_prodct}
            onChange={onChange}
          />
        </Box>
        <Box sx={{ display: visibleFormAuth ? "inherit" : "none" }}>
          <input
            type="text"
            name="id"
            id="id"
            className="form-control input_text_index"
            autoComplete="on"
            placeholder="INGRESE ID DE PRODUCTO"
            value={serverResources.id}
            onChange={onChange}
          />
        </Box>
        <input
          type="text"
          id="user"
          name="user"
          autoComplete="on"
          className="form-control input_text_index"
          placeholder="INGRESE SU USUARIO"
          value={serverResources.user.user}
          onChange={onChange}
        />
        <input
          type="password"
          name="pswLogin"
          id="pswLogin"
          className="form-control input_text_index"
          autoComplete="on"
          placeholder="INGRESA TU CONTRASEÑA"
          value={serverResources.user.pswLogin}
          onChange={onChange}
        />
        <br />
        <br />
        <input
          className="btn btn-success"
          type="submit"
          value={visibleFormAuth ? "INICIO SESIÓN" : "REGISTRAR"}
        />
        <br />
      </form>
      <br />
    </Box>
  );
};

export default FormAuthRegtr;
