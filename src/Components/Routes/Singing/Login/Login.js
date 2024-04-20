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
  const [owner_, setOwner] = useState("");
  const [clav_prodct_, setClav_prodct] = useState("");
  const [user_, setUser] = useState("");
  const [pswLogin_, setPswLogin] = useState("");
  const Onchange = (e) => {
    const input = e.target.name;
    if (input === "owner_") setOwner(e.target.value);
    if (input === "clav_prodct_") setClav_prodct(e.target.value);
    if (input === "user_") setUser(e.target.value);
    if (input === "pswLogin_") setPswLogin(e.target.value);
    console.log(input, e.target.value);
  };
  const EnviarDatosReg = async (e) => {
    e.preventDefault();
    props.setStateLoading(true);
    try {
      //setter data to Login
      await classAUTHREG.SetDatsToAPI(owner_, user_, pswLogin_, clav_prodct_);
      //send data to login
      await setTimeout(async () => {
        let RespAPI = await classAUTHREG.SendDatsAPI("auth", axios);
        if (RespAPI.statusCode === 200) {
          props.setAlertDialogs([
            "block",
            "info",
            "Respuesta de servidor",
            "->",
            RespAPI.msj,
          ]);
          //asignement cookies
          await AsigneCookies("user", user_, cookies);
          await AsigneCookies("token", RespAPI.token, cookies);
          //redirect to app dashboard
          await classAUTHREG.GetAPP(cookies.get("token"), axios);
        } else {
          props.setAlertDialogs([
            "block",
            "error",
            "Respuesta de servidor",
            "->",
            `${RespAPI.statusCode}-${RespAPI.msj}`,
          ]);
        }

        //after 6 sec., reset alerts
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
        <Box>
          <input
            type="text"
            name="owner_"
            id="owner_"
            className="form-control input_text_index"
            autoComplete="on"
            placeholder="INGRESE NOMBRE DE PRODUCTO"
            value={owner_}
            onChange={Onchange}
          />
        </Box>
        <input
          type="text"
          name="clav_prodct_"
          id="clav_prodct_"
          className="form-control input_text_index"
          autoComplete="on"
          placeholder="INGRESE CLAVE DEL PRODUCTO"
          value={clav_prodct_}
          onChange={Onchange}
        />
        <input
          type="text"
          id="user_"
          name="user_"
          autoComplete="on"
          className="form-control input_text_index"
          placeholder="INGRESE SU USUARIO"
          value={user_}
          onChange={Onchange}
        />
        <input
          type="password"
          name="pswLogin_"
          id="pswLogin_"
          className="form-control input_text_index"
          autoComplete="off"
          placeholder="CONTRASEÑA DE USUARIO"
          value={pswLogin_}
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
