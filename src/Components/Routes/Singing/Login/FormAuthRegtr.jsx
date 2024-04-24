import { React, useState } from "react";

//librerias
import Cookies from "universal-cookie";
import { Box, FormControlLabel, Hidden, Link, Switch } from "@mui/material";
import axios from "axios";
//import * as XLSX from "xlsx";

//recursos
import Logo from "../../../../Assets/Imgs/logos/logo_632x512.png";
import "./Login.css";
import ClassAUTHREG from "../ClassAUTHREG";
//import RestarApp from "../../../Comun/ModulosSis/RestarApp";

//métodos
import AsigneCookies from "../../../Comun/ModulosSis/AsigneCookies";

const cookies = new Cookies();
const classAUTHREG = new ClassAUTHREG();

function Registro(props) {
  //formulario
  const [owner, setOwner] = useState("");
  const [clav_prodct, setclav_prodct] = useState("");
  const [user, setUser] = useState("");
  const [pswLogin, setPswLogin] = useState("");
  const [PO_, setPO_] = useState(false);

  const Onchange = (e) => {
    const input = e.target.name;
    if (input === "owner") setOwner(e.target.value);
    if (input === "clav_prodct") setclav_prodct(e.target.value);
    if (input === "user") setUser(e.target.value);
    if (input === "pswLogin") setPswLogin(e.target.value);
  };
  const EnviarDatosReg = async (e) => {
    e.preventDefault();
    props.setStateLoading("block");
    setTimeout(() => {
      props.setStateLoading("none");
    }, 7000);
    try {
      //setter data to register
      await classAUTHREG.SetDatsToAPI(
        owner,
        clav_prodct,
        user,
        pswLogin,
        PO_ ? "PO" : "PM"
      );
      // send data to save/register
      await setTimeout(async () => {
        let proceso = props.visibleFormAuth ? "auth" : "regtr";
        let RespAPI = await classAUTHREG.SendDatsAPI(proceso);
        console.log("respApi::::: ", RespAPI);
        if (RespAPI.statusCode === 200) {
          //asignement cookies
          await AsigneCookies("token", RespAPI.datos.token, cookies);
          await AsigneCookies("user", user, cookies);
          await AsigneCookies("owner", owner, cookies);
          //redirect to app dashboard
          await classAUTHREG.GetAPP(cookies.get("user"), cookies.get("token"));
        } else {
          console.log("---intenta denuevo....");
          props.setAlertDialogs([
            "block",
            "error",
            "Respuesta de servidor",
            "->",
            `${RespAPI.statusCode}-${RespAPI.msj}`,
          ]);
          //after 6 sec., reset dialogs
          setTimeout(() => {
            props.setAlertDialogs(["none", "info", "", "", ``]);
          }, 6000);
        }
      }, 2000);
    } catch (error) {
      alert("error enviando datos al servidor, revise su conexion: ", error);
    }
  };

  // TransformDataExcelToJSON = (refFile) => {
  //     const promise = new Promise((resolve, reject) => {
  //         const fileReader = new FileReader();
  //         fileReader.readAsArrayBuffer(refFile);

  //         fileReader.onload = (e) => {
  //             const buffer = e.target.result;
  //             const wbooks = XLSX.read(buffer, { type: "buffer" });
  //             const wsname = wbooks.SheetNames[0];
  //             const wsName = wbooks.Sheets[wsname];
  //             const datosEnJSON = XLSX.utils.sheet_to_json(wsName);
  //             resolve(datosEnJSON);
  //         };

  //         fileReader.onerror = (error) => {
  //             reject(error);
  //         };
  //     });

  //     promise.then((result) => {
  //         setState({
  //             fileDatas: result,
  //         });
  //     });

  // }

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
        {props.visibleFormAuth ? "AUTENTICACION" : "REGISTRO"}
      </h3>

      <form className="FormAuth" onSubmit={() => console.log("datos")}>
        <Box>
          <input
            type="text"
            name="owner"
            id="owner"
            className="form-control input_text_index"
            autoComplete="on"
            placeholder="INGRESE NOMBRE DE PRODUCTO"
            value={owner}
            onChange={Onchange}
          />
        </Box>
        <Box style={{ display: props.visibleFormAuth ? "none" : "inherit" }}>
          <input
            type="text"
            name="clav_prodct"
            id="clav_prodct"
            className="form-control input_text_index"
            autoComplete="on"
            placeholder="INGRESE CLAVE DE PRODUCTO"
            value={clav_prodct}
            onChange={Onchange}
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
          onChange={Onchange}
        />
        <input
          type="password"
          name="pswLogin"
          id="pswLogin"
          className="form-control input_text_index"
          autoComplete="off"
          placeholder="INGRESA TU CONTRASEÑA"
          value={pswLogin}
          onChange={Onchange}
        />
        <FormControlLabel
          style={{ display: props.visibleFormAuth ? "none" : "inherit" }}
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
        <br /> <br />
        <br />
        <input
          className="btn btn-success"
          type="submit"
          value={props.visibleFormAuth ? "INICIO SESIÓN" : "REGISTRAR"}
          onClick={EnviarDatosReg}
        />
        <br />
      </form>
      <br />
    </Box>
  );
}
Registro.propTypes = {};

export default Registro;
