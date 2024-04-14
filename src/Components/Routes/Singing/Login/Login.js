import { React, useState } from "react";

//librerias
import Cookies from "universal-cookie";
import { Box, FormControlLabel } from "@mui/material";
import axios from "axios";

//recursos
import Logo from "../../../../Assets/Imgs/logos/logo_632x512.png";
import "./Login.css";
import ClassAUTHREG from "../ClassAUTHREG";
//import RestartApp from '../../../Comun/ModulosSis/RestarApp'

//métodos
import AsigneCookies from "../../../Comun/ModulosSis/AsigneCookies";

const cookies = new Cookies();
const classAUTHREG = new ClassAUTHREG();

function Login(props) {
  //formulario
  const [idProd, setIdProd] = useState("");
  const [user, setUser] = useState("");
  const [pswLogin, setPswLogin] = useState("");
  const Onchange = (e) => {
    const input = e.target.name;
    if (input === "idProd") setIdProd(e.target.value);
    if (input === "user") setUser(e.target.value);
    if (input === "pswLogin") setPswLogin(e.target.value);
    console.log(input, e.target.value);
  };
  const EnviarDatosReg = async (e) => {
    e.preventDefault();
    props.setStateLoading(true);
    try {
      //setter data to Login
      await classAUTHREG.SetDatsToAPI(user, pswLogin, idProd);
      //send data to login
      await setTimeout(async () => {
        let RespAPI = await classAUTHREG.SendDatsAPI("auth", axios);
        if (RespAPI.valor === 400) {
          props.setAlertDialogs([
            "block",
            "info",
            "Respuesta de servidor",
            "->",
            RespAPI.msj,
          ]);
          await AsigneCookies("user", user, cookies);
          await AsigneCookies("token", RespAPI.respt, cookies);
          await classAUTHREG.GetAPP(cookies.get("token"), axios);
        } else {
          props.setAlertDialogs([
            "block",
            "error",
            "Respuesta de servidor",
            "->",
            RespAPI.msj,
          ]);
        }

        setTimeout(() => {
          props.resetWindowsAlertLoading();
        }, 6000);
      }, 2000);
    } catch (error) {
      alert("error enviando datos al servidor, revise su conexion: " + error);
      console.log(
        "error enviando datos al servidor, revise su conexion: ",
        error
      );
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
      <h3 className="title_"> AUTENTICACIÓN </h3>
      <form className="FormAuth">
        <input
          type="text"
          name="idProd"
          id="idProd"
          className="form-control input_text_index"
          autoComplete="off"
          placeholder="INGRESE ID DEL PRODUCTO"
          value={idProd}
          onChange={Onchange}
        />
        <input
          type="text"
          id="user"
          name="user"
          className="form-control input_text_index"
          placeholder="INGRESE SU USUARIO"
          value={user}
          onChange={Onchange}
        />
        <input
          type="password"
          name="pswLogin"
          id="pswLogin"
          className="form-control input_text_index"
          autoComplete="off"
          placeholder="CONTRASEÑA DE USUARIO"
          value={pswLogin}
          onChange={Onchange}
        />

        <br />
        <br />
        <br />
        <input
          className="btn btn-success"
          type="submit"
          value="CONTINUAR"
          onClick={EnviarDatosReg}
        />
        <br />
      </form>{" "}
      <br />
    </Box>
  );
}

Login.propTypes = {};

export default Login;

// //               await AsigneCookies('id_prod', id_prod, cookies)
// //               await AsigneCookies('user', user, cookies)
// //               console.log('====================================')
// //               console.log('redireccionando...')
// //               console.log('====================================')
