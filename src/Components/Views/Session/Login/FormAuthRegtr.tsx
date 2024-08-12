import React, { useState, ChangeEvent, FormEvent } from "react";
import { Box, FormControlLabel, Switch } from "@mui/material";
import ClassAUTHREG from "../ClassAUTHREG";
import AsigneCookies from "../../../Common/ModulosSis/AsigneCookies";
import Logo from "../../../../Assets/Imgs/logos/logo_632x512.png";
import "../../../../Assets/styles/FormAuthRegtr.css";
import { InicioProps } from "@/dto/InicioProps.dto";

// Definir los tipos de las props

const classAUTHREG = new ClassAUTHREG();

const FormAuthRegtr: React.FC<InicioProps> = ({
  serverResources,
  engineResources,
  visibleFormAuth,
  ValidacionFormAuth,
}) => {
  // Estado del formulario
  const [owner, setOwner] = useState<string>(serverResources.prodct.owner);
  const [clav_prodct, setclav_prodct] = useState<string>(
    serverResources.prodct.clav_prodct
  );
  const [user, setUser] = useState<string>(serverResources.user[0].user);
  const [pswLogin, setPswLogin] = useState<string>("");
  const [PO_, setPO_] = useState<boolean>(false);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = e.target;
    if (name === "owner") {
      setOwner(value);
    }
    if (name === "clav_prodct") {
      setclav_prodct(value);
    }
    if (name === "user") {
      setUser(value);
    }
    if (name === "pswLogin") {
      setPswLogin(value);
    }
    if (name === "PO_") {
      setPO_(checked);
    }
  };

  const enviarDatosReg = async (e: FormEvent) => {
    e.preventDefault();
    engineResources.setStateLoading("block");
    try {
      // Configurar datos para registrar
      alert("try");
      console.log(serverResources, engineResources);
      await classAUTHREG.SetDatsToAPI(
        owner,
        clav_prodct,
        user,
        pswLogin,
        PO_ ? "PO" : "PM"
      );

      // Enviar datos para guardar/registrar
      const proceso = visibleFormAuth ? "auth" : "regtr";
      const respAPI = await classAUTHREG.SendDatsAPI(proceso);
      console.log(respAPI);
      console.log("respApi::::: ", respAPI.statusCode);

      if (respAPI.statusCode === 200) {
        // Asignar cookies
        await AsigneCookies(
          "token",
          respAPI.datos.token,
          engineResources.cookies
        );
        await AsigneCookies("user", user, engineResources.cookies);
        await AsigneCookies("owner", owner, engineResources.cookies);

        // Redirigir al panel de la aplicación
        await classAUTHREG.GetAPP(
          engineResources.cookies.get("user"),
          engineResources.cookies.get("token")
        );
      } else {
        console.log("---intenta denuevo....");
        engineResources.setAlertDialogs([
          "block",
          "error",
          "Respuesta de servidor",
          "->",
          `${respAPI.statusCode}-${respAPI.msj}`,
        ]);
      }
    } catch (error) {
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
        <Box>
          <input
            type="text"
            name="owner"
            id="owner"
            className="form-control input_text_index"
            autoComplete="on"
            placeholder="INGRESE NOMBRE DE PRODUCTO"
            value={owner}
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
            value={clav_prodct}
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
          value={user}
          onChange={onChange}
        />
        <input
          type="password"
          name="pswLogin"
          id="pswLogin"
          className="form-control input_text_index"
          autoComplete="off"
          placeholder="INGRESA TU CONTRASEÑA"
          value={pswLogin}
          onChange={onChange}
        />
        <FormControlLabel
          sx={{ display: visibleFormAuth ? "none" : "inherit" }}
          control={
            <Switch
              checked={PO_}
              onChange={onChange}
              name="PO_"
              color="primary"
            />
          }
          label="Product Owner"
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
