import React, { useState, ChangeEvent, FormEvent } from "react";
import Cookies from "universal-cookie";
import { Box, FormControlLabel, Switch } from "@mui/material";
import ClassAUTHREG from "../ClassAUTHREG";
import AsigneCookies from "../../../Common/ModulosSis/AsigneCookies";
import Logo from "../../../../Assets/Imgs/logos/logo_632x512.png";
import "./Login.css";

// Definir los tipos de las props
interface RegistroProps {
  setUser: React.Dispatch<React.SetStateAction<string>>;
  visibleFormAuth: boolean;
  setStateLoading: React.Dispatch<React.SetStateAction<string>>;
  setAlertDialogs: React.Dispatch<React.SetStateAction<string[]>>;
}

const cookies = new Cookies();
const classAUTHREG = new ClassAUTHREG();

const FormAuthRegtr: React.FC<any> = ({
  user,
  setUser,
  ValidacionFormAuth,
  visibleFormAuth,
  setStateLoading,
  setAlertDialogs,
}) => {
  // Estado del formulario
  const [owner, setOwner] = useState<string>("arcwebtest");
  const [clav_prodct, setClavProdct] = useState<string>("clav_owner");
  const [pswLogin, setPswLogin] = useState<string>("qwerty");
  const [PO_, setPO_] = useState<boolean>(true);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const input = e.target.name;
    switch (input) {
      case "owner":
        setOwner(e.target.value);
        break;
      case "clav_prodct":
        setClavProdct(e.target.value);
        break;
      case "user":
        setUser(e.target.value);
        break;
      case "pswLogin":
        setPswLogin(e.target.value);
        break;
      default:
        break;
    }
  };

  const enviarDatosReg = async (e: FormEvent) => {
    e.preventDefault();
    setStateLoading("block");
    try {
      // Configurar datos para registrar
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
      console.log("respApi::::: ", respAPI);

      if (respAPI.statusCode === 200) {
        // Asignar cookies
        await AsigneCookies("token", respAPI.datos.token, cookies);
        await AsigneCookies("user", user, cookies);
        await AsigneCookies("owner", owner, cookies);

        // Redirigir al panel de la aplicación
        await classAUTHREG.GetAPP(cookies.get("user"), cookies.get("token"));
      } else {
        console.log("---intenta denuevo....");
        setAlertDialogs([
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
              onChange={() => setPO_(!PO_)}
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
