import { React, useState } from "react";

//librerias
import Cookies from "universal-cookie";
import { Box, FormControlLabel } from "@mui/material";
import Switch from "@mui/material/Switch";
import axios from "axios";

//recursos
import Logo from "../../../../Assets/Imgs/logos/logo_632x512.png";
import "./Login.css";
import ReqResDatos_auth_API from "../../../Comun/ModulosSis/class_authAPI";
//import RestartApp from '../../../Comun/ModulosSis/RestarApp'

//métodos
import AsigneCookies from "../../../Comun/ModulosSis/AsigneCookies";

const cookies = new Cookies();
const reqResDatos_auth_API = new ReqResDatos_auth_API();

function Login(props) {
  //formulario
  const [idProd, setIdProd] = useState("");
  const [clavProdct, setClavProdct] = useState("");
  const [user, setUser] = useState("");
  const [pswLogin, setPswLogin] = useState("");
  const [PO_, setPO_] = useState(false);
  const Onchange = (e) => {
    const input = e.target.name;
    if (input === "idProd") setIdProd(e.target.value);
    if (input === "clavProdct") setClavProdct(e.target.value);
    if (input === "user") setUser(e.target.value);
    if (input === "pswLogin") setPswLogin(e.target.value);
    console.log(input, e.target.value);
  };
  const EnviarDatosReg = async (e) => {
    e.preventDefault();
    if (props.ValidacionFormAuth(user, pswLogin, idProd)) {
      props.setStateLoading(true);
      try {
        //Datos a consultar
        await reqResDatos_auth_API.SetDatsToAPI(
          user,
          pswLogin,
          idProd,
          clavProdct,
          PO_ ? "PO" : "PM"
        );
        console.log(
          "Preparación de usuario completa: ",
          await reqResDatos_auth_API.GetDatosAuth()
        );
        //envio de datos
        await setTimeout(async () => {
          let RespAPI = await reqResDatos_auth_API.SendDatsAPI("auth", axios);
          console.log(RespAPI);
          if (RespAPI.valor === 400) {
            props.setAlertDialogs([
              "block",
              "info",
              "Respuesta de servidor",
              "->",
              RespAPI.msj,
            ]);
            await AsigneCookies("rol", PO_ ? "PO" : "PM", cookies);
            await AsigneCookies("user", user, cookies);
            await AsigneCookies("token", RespAPI.respt, cookies);
            await reqResDatos_auth_API.GetAPP(cookies.get("token"), axios);
          } else {
            props.setAlertDialogs([
              "block",
              "error",
              "Respuesta de servidor",
              "->",
              RespAPI.msj,
            ]);
            setTimeout(() => {
              props.resetWindowsAlertLoading();
            }, 6000);
          }
        }, 2000);
      } catch (error) {
        alert("error enviando datos al servidor, revise su conexion: " + error);
        console.log(
          "error enviando datos al servidor, revise su conexion: ",
          error
        );
      }
    } else {
      alert("Datos ingresados no cumplen requerimientos");
      setTimeout(() => {
        window.location = "http://localhost:3000/Singin";
      }, 5000);
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
          name="clavProdct"
          id="clavProdct"
          className="form-control input_text_index"
          autoComplete="off"
          placeholder="INGRESE CLAVE DE PRODUCTO"
          value={clavProdct}
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
        <FormControlLabel
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
