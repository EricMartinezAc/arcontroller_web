import { React, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import {
  ButtonGroup,
  Grid,
  IconButton,
  Input,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  TextField,
} from "@mui/material";

import ico_add_localidades from "../../../../../Assets/Imgs/icos/ico_addContrato.png";
import ImageIcon from "@mui/icons-material/Image";
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import DraftsIcon from "@mui/icons-material/Drafts";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import DetailsIcon from "@mui/icons-material/Details";
import SendIcon from "@mui/icons-material/Send";
import { Stack } from "@mui/system";

import EnviarFormAddLocalidades from "../../../../Comun/ModulosSis/EnviarFormAddLocalidades";

import * as XLSX from "xlsx";
import axios from "axios";
import Cookies from "universal-cookie";

import "./stylesCParts.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  height: "100vh",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  overflowY: "scroll",
};

export default function BasicModal(props) {
  const visibleModalAdd = props.visibleModalAdd;

  const enviarFormAddLocalidades = new EnviarFormAddLocalidades();
  const cookies = new Cookies();

  useEffect(() => {
    console.log(id_localidades);
  });

  const [visbleGeneralForm, setvisbleGeneralForm] = useState("flex");
  const [visibleZonas, setvisibleZonas] = useState("none");
  const [visibleProveedores, setvisibleProveedores] = useState("none");

  //fomrs general
  const [id_localidades, setid_localidades] = useState("id_localidades");
  const [nombre_localidades, setnombre_localidades] =
    useState("nombre_localidades");
  const [pais_localidades, setpais_localidades] = useState("pais_localidades");
  const [ciudad_localidades, setciudad_localidades] =
    useState("ciudad_localidades");
  const [dpto_localidades, setdpto_localidades] = useState("dpto_localidades");
  const [direccion_localidades, setdireccion_localidades] = useState(
    "direccion_localidades"
  );
  const [contact_localidades, setcontact_localidades] = useState(
    "contact_localidades"
  );
  const [email_localidades, setemail_localidades] =
    useState("email_localidades");

  const [fileImgLocalidades, setFileImgLocalidades] = useState(null);
  const handle_fileImgLocalidades = (e) => {
    setFileImgLocalidades(e.target.files[0]);
  };
  const [fileInput_zonas, setFileInput_zonas] = useState(null);
  const handle_fileInput_zonas = (e) => {
    setFileInput_zonas(e.target.files[0]);
  };
  const [fileInput_proveedores, setFileInput_proveedores] = useState(null);
  const handle_fileInput_proveedores = (e) => {
    setFileInput_proveedores(e.target.files[0]);
  };

  const setVisible1 = () => {
    setvisbleGeneralForm("flex");
    setvisibleZonas("none");
    setvisibleProveedores("none");
  };
  const setVisible2 = () => {
    setvisbleGeneralForm("none");
    setvisibleZonas("flex");
    setvisibleProveedores("none");
  };
  const setVisible3 = () => {
    setvisbleGeneralForm("none");
    setvisibleZonas("none");
    setvisibleProveedores("flex");
  };

  // const TransformDataExcelToJSON = (refFile, name) => {
  //   const promise = new Promise((resolve, reject) => {
  //     const fileReader = new FileReader();
  //     fileReader.readAsArrayBuffer(refFile);

  //     fileReader.onload = (e) => {
  //       const buffer = e.target.result;
  //       const wbooks = XLSX.read(buffer, { type: "buffer" });
  //       const wsname = wbooks.SheetNames[0];
  //       const wsName = wbooks.Sheets[wsname];
  //       const datosEnJSON = XLSX.utils.sheet_to_json(wsName);
  //       resolve(datosEnJSON);
  //     };

  //     fileReader.onerror = (error) => {
  //       reject(error);
  //     };
  //   });

  //   promise.then((result) => {
  //     name === "fileInput_zonas"
  //       ? setfileDatas_zonas(result)
  //       : console.log("ok");
  //     name === "fileInput_proveedores"
  //       ? setfileDatas_proveedores(result)
  //       : console.log("okk");
  //   });
  // };

  const BtnEnviarFormAddLocalidades = async () => {
    const fileFormData = new FormData();
    fileFormData.append("fileImgLocalidades", fileInput_proveedores);
    fileFormData.append("fileInput_zonas", fileInput_proveedores);
    fileFormData.append("fileInput_proveedores", fileInput_proveedores);

    const datos_ = {
      id_localidades,
      nombre_localidades,
      pais_localidades,
      ciudad_localidades,
      dpto_localidades,
      direccion_localidades,
      contact_localidades,
      email_localidades,
      fileFormData,
    };

    await enviarFormAddLocalidades.SendDatsAPI(
      "localidades/add",
      axios,
      datos_,
      cookies
    );
  };

  return (
    <div>
      <Modal
        open={props.open}
        onClose={visibleModalAdd}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Grid sx={style} spacing={2} container>
          <Grid p={2} item xs={12} md={12}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              <img
                alt="logo"
                style={{
                  width: 50,
                  borderRadius: "0",
                  marginRight: 30,
                  marginTop: 4,
                }}
                src={ico_add_localidades}
              />
              Agrega una localidad
            </Typography>
          </Grid>
          <Grid p={2} container xs={12} md={12}>
            {/* aside */}
            <Grid p={2} item xs={12} md={5}>
              {/* imagen perfil localidad */}
              <Grid p={1} item xs={12} className="inputFileImg">
                <ImageIcon />
                <br />
                <Input type="file" onChange={handle_fileImgLocalidades} />
              </Grid>
              {/* menu lat */}
              <Grid
                p={1}
                item
                xs={12}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <List
                  sx={{
                    width: "100%",
                    maxWidth: 360,
                    bgcolor: "background.paper",
                  }}
                  component="nav"
                  aria-labelledby="nested-list-subheader"
                  subheader={
                    <ListSubheader component="div" id="nested-list-subheader">
                      Menú de formulario
                    </ListSubheader>
                  }
                >
                  <ListItemButton onClick={setVisible1}>
                    <ListItemIcon>
                      <HomeWorkIcon />
                    </ListItemIcon>
                    <ListItemText primary="General" />
                  </ListItemButton>

                  <ListItemButton onClick={setVisible2}>
                    <ListItemIcon>
                      <DetailsIcon />
                    </ListItemIcon>
                    <ListItemText primary="detalles" />
                  </ListItemButton>

                  <ListItemButton onClick={setVisible3}>
                    <ListItemIcon>
                      <GroupAddIcon />
                    </ListItemIcon>
                    <ListItemText primary="Proveedores" />
                  </ListItemButton>
                </List>
              </Grid>
            </Grid>
            {/* formulario */}
            <Grid
              p={2}
              sx={{ display: visbleGeneralForm }}
              container
              xs={12}
              md={7}
            >
              <Grid m={1} item xs={12} md={4}>
                <Stack
                  component="form"
                  spacing={2}
                  noValidate
                  autoComplete="off"
                >
                  <TextField
                    onChange={(e) => setid_localidades(e.target.value)}
                    name={"id_localidades"}
                    id={"id_localidades"}
                    label="# ident."
                    defaultValue="00"
                    helperText=""
                  />
                </Stack>
              </Grid>
              <Grid m={1} item xs={12} md={6}>
                <Stack
                  component="form"
                  spacing={2}
                  noValidate
                  autoComplete="off"
                >
                  <TextField
                    onChange={(e) => setnombre_localidades(e.target.value)}
                    name={"nombre_localidades"}
                    id={"nombre_localidades"}
                    label="Nombre de localidad u oficina"
                    defaultValue="xxxx xxxxx"
                    helperText=""
                  />
                </Stack>
              </Grid>

              <Grid m={1} item xs={12} md={10}>
                <Stack component="form" noValidate autoComplete="off">
                  <TextField
                    onChange={(e) => setpais_localidades(e.target.value)}
                    name={"pais_localidades"}
                    id={"pais_localidades"}
                    label="Pais"
                    defaultValue="xxxxxxxxx"
                    helperText=""
                  />
                </Stack>
              </Grid>

              <Grid m={1} item xs={12} md={5}>
                <Stack
                  component="form"
                  spacing={2}
                  noValidate
                  autoComplete="off"
                >
                  <TextField
                    onChange={(e) => setciudad_localidades(e.target.value)}
                    name={"ciudad_localidades"}
                    id="ciudad_localidades"
                    label="ciudad o municipio"
                    defaultValue="xxxxxx"
                    helperText=""
                  />
                </Stack>
              </Grid>
              <Grid m={1} item xs={12} md={5}>
                <Stack
                  component="form"
                  spacing={2}
                  noValidate
                  autoComplete="off"
                >
                  <TextField
                    onChange={(e) => setdpto_localidades(e.target.value)}
                    name={"dpto_localidades"}
                    id={"dpto_localidades"}
                    label="Dpto"
                    defaultValue="xxxx xxxxx"
                    helperText=""
                  />
                </Stack>
              </Grid>

              <Grid m={1} item xs={12} md={10}>
                <Stack component="form" noValidate autoComplete="off">
                  <TextField
                    onChange={(e) => setdireccion_localidades(e.target.value)}
                    name={"direccion_localidades"}
                    id={"direccion_localidades"}
                    label="Dirección"
                    defaultValue="xxxx xxxxx"
                    helperText=""
                  />
                </Stack>
              </Grid>

              <Grid m={1} item xs={12} md={4}>
                <Stack component="form" noValidate autoComplete="off">
                  <TextField
                    onChange={(e) => setcontact_localidades(e.target.value)}
                    name={"contact_localidades"}
                    id={"contact_localidades"}
                    label="# contacto"
                    defaultValue="00"
                    helperText=""
                  />
                </Stack>
              </Grid>
              <Grid m={1} item xs={12} md={6}>
                <Stack component="form" noValidate autoComplete="off">
                  <TextField
                    onChange={(e) => setemail_localidades(e.target.value)}
                    name={"email_localidades"}
                    id={"email_localidades"}
                    label="e-mail"
                    defaultValue="xxxx xxxxx"
                    helperText=""
                  />
                </Stack>
              </Grid>
            </Grid>
            {/* //detalles */}
            <Grid p={2} sx={{ display: visibleZonas }} container xs={12} md={7}>
              <Box>
                <label>Agrege sus localidades a cargo</label>
                <br />
                <br />
                <Input type="file" onChange={handle_fileInput_zonas} />
              </Box>
            </Grid>
            {/* proveedores */}
            <Grid
              p={2}
              sx={{ display: visibleProveedores }}
              container
              xs={12}
              md={7}
            >
              <Box>
                <label>
                  Agrege la relación de proveedores según área de conocimiento
                </label>
                <br />
                <br />
                <Input type="file" onChange={handle_fileInput_proveedores} />
              </Box>
            </Grid>
            {/* final */}
            <Grid
              xs={12}
              item
              p={2}
              sx={{
                display: "flex",
                alignContent: "center",
                justifyContent: "center",
              }}
            >
              <Grid
                xs={6}
                item
                sx={{
                  display: "flex",
                  alignContent: "center",
                  justifyContent: "center",
                }}
              >
                <Button sx={{ width: "70%" }} variant="outlined">
                  Cancelar
                </Button>
              </Grid>
              <Grid
                xs={6}
                item
                sx={{
                  display: "flex",
                  alignContent: "center",
                  justifyContent: "center",
                }}
              >
                <Button
                  onClick={BtnEnviarFormAddLocalidades}
                  sx={{ width: "70%" }}
                  variant="contained"
                  color={"primary"}
                >
                  Guardar
                </Button>
              </Grid>
            </Grid>
          </Grid>

          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </Grid>
      </Modal>
    </div>
  );
}
