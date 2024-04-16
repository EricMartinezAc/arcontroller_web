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
  const [clavProdct, setClavProdct] = useState("");
  const [user, setUser] = useState("");
  const [pswLogin, setPswLogin] = useState("");
  const [PO_, setPO_] = useState(false);
  const Onchange = (e) => {
    const input = e.target.name;
    if (input === "clavProdct") setClavProdct(e.target.value);
    if (input === "user") setUser(e.target.value);
    if (input === "pswLogin") setPswLogin(e.target.value);
  };
  const EnviarDatosReg = async (e) => {
    e.preventDefault();
    props.setStateLoading(true);
    try {
      //setter data to register
      await classAUTHREG.SetDatsToAPI(
        clavProdct,
        user,
        pswLogin,
        PO_ ? "PO" : "PM"
      );
      // send data to save/register
      await setTimeout(async () => {
        let RespAPI = await classAUTHREG.SendDatsAPI("regtr", axios);
        if (RespAPI.statusCode === 200) {
          props.setAlertDialogs([
            "block",
            "info",
            "Respuesta de servidor",
            "->",
            RespAPI.msj,
          ]);
          //asignement cookies
          await AsigneCookies("user", user, cookies);
          await AsigneCookies("token", RespAPI.respt, cookies);
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

      <h3 className="title">REGISTRO</h3>

      <form className="FormAuth" onSubmit={() => console.log("datos")}>
        <Box>
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
        </Box>
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
          placeholder="INGRESA TU CONTRASEÑA"
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
        <br /> <br />
        <br />
        <input
          className="btn btn-success"
          type="submit"
          value="REGISTRAR"
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
