import { React, useEffect, useState } from "react";

import XLSX from "xlsx";

import dayjs from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import {
  FormControl,
  Grid,
  Input,
  InputLabel,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";

import ico_add_Sucursales from "../../../../../Assets/Imgs/icos/ico_addContrato.png";
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import DetailsIcon from "@mui/icons-material/Details";
import { Stack } from "@mui/system";

import ImgInic from "../../../../../Assets/Imgs/logos/logo_153x124.png";
import QueriesSucursalEntidad from "../../Queries/sucursalEntidad";
import "./stylesCParts.css";
import { useGeneralContext } from "../../../../../Context/GeneralContext";
import { Label } from "@mui/icons-material";

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
  const { serverResources } = useGeneralContext();

  const visibleModalAdd = props.visibleModalAdd;

  const queriesSucursalEntidad = new QueriesSucursalEntidad();

  const [visbleGeneralForm, setvisbleGeneralForm] = useState("flex");
  const [visibleAreas, setvisibleAreas] = useState("none");
  const [visibleProveedores, setvisibleProveedores] = useState("none");

  //fomrs general
  const [centroCosto, setCentroCosto] = useState("");
  const [sucursal, setSucursal] = useState("");
  const [ubicacion, setUbicacion] = useState([]);
  const [contactos, setContactos] = useState([]);
  const [metodologia, setMetodologia] = useState("");
  const [tipo, setTipo] = useState("Seleccione un tipo");
  const [clasificacion, setClasificacion] = useState("Clasifique sucursal");
  const [prioridad, setPrioridad] = useState("Seleccione nivel de prioridad");
  const [inicioOp, setInicioOp] = useState("16-06-1992");
  const handle_fileInputDate = async (dateObj) => {
    await setInicioOp(JSON.stringify(dateObj));
  };
  const team = serverResources.owner;
  const [imagen, setImagen] = useState(ImgInic);
  const handle_fileImgSucursales = (e) => {
    const file = e.target.files[0];

    if (file && file.type.includes("image")) {
      const reader = new FileReader();
      reader.onload = () => setImagen(reader.result);
      reader.readAsDataURL(file);
      console.log("1. test add branch: ", [file, reader]);
    }
  };
  const [areas, setAreas] = useState({});
  const handle_fileInputAreas = async (file) => {
    const fileReader = new FileReader();
    await fileReader.readAsArrayBuffer(file);
    fileReader.onload = async (e) => {
      const bufferArray = await fileReader.result;
      const wb = XLSX.read(bufferArray, { type: "buffer" });
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      const data = XLSX.utils.sheet_to_json(ws);
      setAreas(JSON.stringify(data));
    };

    fileReader.onerror = (error) => {
      console.error(error);
    };
  };
  const [proveedores, setProveedores] = useState({});
  const handle_fileInputProveedores = async (file) => {
    const fileReader = new FileReader();
    await fileReader.readAsArrayBuffer(file);
    fileReader.onload = async (e) => {
      const bufferArray = await fileReader.result;
      const wb = XLSX.read(bufferArray, { type: "buffer" });
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      const data = XLSX.utils.sheet_to_json(ws);
      setProveedores(JSON.stringify(data));
    };

    fileReader.onerror = (error) => {
      console.error(error);
    };
  };
  const [gerente, setGerente] = useState("Gerente");

  const setVisible1 = () => {
    setvisbleGeneralForm("flex");
    setvisibleAreas("none");
    setvisibleProveedores("none");
  };
  const setVisible2 = () => {
    setvisbleGeneralForm("none");
    setvisibleAreas("flex");
    setvisibleProveedores("none");
  };
  const setVisible3 = () => {
    setvisbleGeneralForm("none");
    setvisibleAreas("none");
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

  const BtnEnviarFormAddSucursales = async () => {
    console.log("go");
    await queriesSucursalEntidad.SetDatos({
      sucursal,
      ubicacion,
      centroCosto,
      tipo,
      clasificacion,
      prioridad,
      inicioOp,
      contactos,
      team,
      imagen,
      areas,
      proveedores,
      gerente,
    });
    const respSendDats = await queriesSucursalEntidad.QueryAPI(
      "branch/add/any",
      serverResources.prodct.owner,
      serverResources.user.user
    );
    console.log(await respSendDats, "---------------");
  };

  return (
    <>
      <Modal
        open={true}
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
                src={ico_add_Sucursales}
              />
              Agrega una localidad
            </Typography>
          </Grid>
          <Grid p={2} container xs={12} md={12}>
            {/* aside */}
            <Grid p={2} item xs={12} md={5}>
              {/* imagen perfil localidad */}
              <img
                style={{
                  zIndex: -100,
                  width: "200px",
                  height: "180px",
                  borderRadius: "50%",
                }}
                src={imagen}
              />
              <Grid p={1} item xs={12} className="inputFileImg">
                <Input
                  type="file"
                  name="imagen"
                  id="imagen"
                  onChange={(e) => handle_fileImgSucursales(e)}
                />
                <br />
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
                  autoComplete="on"
                >
                  <TextField
                    autoComplete="true"
                    onChange={(e) => setCentroCosto(e.target.value)}
                    name={"centroCosto"}
                    id={"centroCosto"}
                    label="# centro de costo."
                    defaultValue="00"
                    helperText="Numero de inventario"
                  />
                </Stack>
              </Grid>
              <Grid m={1} item xs={12} md={6}>
                <Stack
                  component="form"
                  spacing={2}
                  noValidate
                  autoComplete="on"
                >
                  <TextField
                    autoComplete="true"
                    onChange={(e) => setSucursal(e.target.value)}
                    name={"sucursal"}
                    id={"sucursal"}
                    label="Nombre de sucursal"
                    defaultValue="xxxx xxxxx"
                  />
                </Stack>
              </Grid>

              <Grid m={1} item xs={12} md={10}>
                <Stack component="form" noValidate autoComplete="on">
                  <TextField
                    autoComplete="true"
                    onChange={(e) => setUbicacion([...e.target.value])}
                    name={"pais"}
                    id={"pais"}
                    label="Pais"
                    defaultValue="xxxxxxxxx"
                  />
                </Stack>
              </Grid>

              <Grid m={1} item xs={12} md={5}>
                <Stack
                  component="form"
                  spacing={2}
                  noValidate
                  autoComplete="on"
                >
                  <TextField
                    autoComplete="true"
                    onChange={(e) => setUbicacion([...e.target.value])}
                    name={"ciudad"}
                    id="ciudad"
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
                  autoComplete="on"
                >
                  <TextField
                    autoComplete="true"
                    onChange={(e) => setUbicacion([...e.target.value])}
                    name={"dpto"}
                    id={"dpto"}
                    label="Dpto"
                    defaultValue="xxxx xxxxx"
                    helperText=""
                  />
                </Stack>
              </Grid>

              <Grid m={1} item xs={12} md={10}>
                <Stack component="form" noValidate autoComplete="on">
                  <TextField
                    autoComplete="true"
                    onChange={(e) => setUbicacion([...e.target.value])}
                    name={"direccion"}
                    id={"direccion"}
                    label="Dirección"
                    defaultValue="xxxx xxxxx"
                    helperText=""
                  />
                </Stack>
              </Grid>

              <Grid m={1} item xs={12} md={4}>
                <Stack component="form" noValidate autoComplete="on">
                  <TextField
                    autoComplete="true"
                    onChange={(e) => setContactos([...e.target.value])}
                    name={"contacto"}
                    id={"contacto"}
                    label="# contacto"
                    defaultValue="00"
                    helperText="numero de celular o teléfono"
                  />
                </Stack>
              </Grid>
              <Grid m={1} item xs={12} md={6}>
                <Stack component="form" noValidate autoComplete="on">
                  <TextField
                    autoComplete="true"
                    onChange={(e) => setContactos([...e.target.value])}
                    name={"email"}
                    id={"email"}
                    label="e-mail"
                    defaultValue="xxxx xxxxx"
                    helperText=""
                  />
                </Stack>
              </Grid>
            </Grid>
            {/* //detalles */}
            <Grid p={2} sx={{ display: visibleAreas }} container xs={12} md={7}>
              <Grid m={1} item xs={12} md={10}>
                <label className="form-label" for="fileInputAreas">
                  Agrege areas pertenecientes a esta sucursal
                </label>
                <br />
                <br />
                <input
                  type="file"
                  id="fileInputAreas"
                  className="form-control "
                  onChange={(e) => handle_fileInputAreas(e.target.files[0])}
                />
              </Grid>
              <Grid m={1} item xs={12} md={5}>
                <Stack
                  component="form"
                  spacing={2}
                  noValidate
                  autoComplete="on"
                >
                  <FormControl>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={tipo}
                      label="Tipo"
                      onChange={(e) => {
                        setTipo(e.target.value);
                        console.log("test type: ", tipo);
                      }}
                    >
                      <MenuItem value="Seleccione un tipo">
                        Seleccione jerarquía
                      </MenuItem>
                      <MenuItem value="Matriz">Matriz</MenuItem>
                      <MenuItem value="Satélite">Satelite</MenuItem>
                      <MenuItem value="CDI">CDI</MenuItem>
                      <MenuItem value="Oficina">Oficina</MenuItem>
                      <MenuItem value="Almacén">Almacen</MenuItem>
                      <MenuItem value="Bodega">Bodega</MenuItem>
                    </Select>
                  </FormControl>
                </Stack>
              </Grid>
              <Grid m={1} item xs={12} md={5}>
                <Stack
                  component="form"
                  spacing={2}
                  noValidate
                  autoComplete="on"
                >
                  <FormControl>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={prioridad}
                      label={"Prioridad"}
                      onChange={(e) => {
                        setPrioridad(e.target.value);
                      }}
                    >
                      <MenuItem value="Seleccione nivel de prioridad">
                        Seleccione nivel de prioridad
                      </MenuItem>
                      <MenuItem value="Premium">Premium</MenuItem>
                      <MenuItem value="Alta">Alta</MenuItem>
                      <MenuItem value="Media">Media</MenuItem>
                      <MenuItem value="Baja">Baja</MenuItem>
                    </Select>
                  </FormControl>
                </Stack>
              </Grid>
              <Grid m={1} item xs={12} md={10}>
                <Stack component="form" noValidate autoComplete="on">
                  <FormControl>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={clasificacion}
                      label="Clasificacion"
                      onChange={(e) => {
                        setClasificacion(e.target.value);
                      }}
                    >
                      <MenuItem value={"Clasifique sucursal"}>
                        Clasifique sucursal
                      </MenuItem>
                      <MenuItem value="Edificio">Edifico</MenuItem>
                      <MenuItem value="Oficina">Oficina</MenuItem>
                      <MenuItem value="Publico">Publico</MenuItem>
                      <MenuItem value="HomeOFfice">Home Office</MenuItem>
                      <MenuItem className="btn-danger" value="Peligroso">
                        Alta Peligrosidad
                      </MenuItem>
                    </Select>
                  </FormControl>
                </Stack>
              </Grid>
              <Grid m={1} item xs={12} md={10}>
                <Stack component="form" noValidate autoComplete="on">
                  <FormControl>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={gerente}
                      label="Gerente"
                      onChange={(e) => {
                        setGerente(e.target.value);
                      }}
                    >
                      <MenuItem value="Gerente">Gerente</MenuItem>
                      {/* {props.usersOwner.map((item, index) => {
                        return (
                          <MenuItem key={index} value={item.user}>
                            {item.user}
                          </MenuItem>
                        );
                      })} */}
                    </Select>
                  </FormControl>
                </Stack>
              </Grid>
              <Grid m={1} item xs={12} md={10}>
                <Stack component="form" noValidate autoComplete="on">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer
                      components={[
                        "DatePicker",
                        "MobileDatePicker",
                        "DesktopDatePicker",
                        "StaticDatePicker",
                      ]}
                    >
                      <DemoItem label="Fecha de inicio de operaciones">
                        <DesktopDatePicker
                          onChange={(e) => handle_fileInputDate(e)}
                          defaultValue={dayjs(inicioOp)}
                        />
                      </DemoItem>
                    </DemoContainer>
                  </LocalizationProvider>
                </Stack>
              </Grid>
              {/* <Grid m={1} item xs={12} md={10}>
                <Stack component="form" noValidate autoComplete="on">
                  <TextField
                    hidden
                    autoComplete="true"
                    onChange={(e) => setTeam(e.target.value)}
                    name={"team"}
                    id={"team"}
                    label="Equipo de trabajo"
                    defaultValue=""
                    helperText=""
                  />
                </Stack>
              </Grid> */}
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
                <label className="form-label" for="fileInputProveedores">
                  Agrege la relación de proveedores según área de conocimiento
                </label>
                <br />
                <br />
                <Input
                  id="fileInputProveedores"
                  type="file"
                  className="form-control"
                  onChange={(e) =>
                    handle_fileInputProveedores(e.target.files[0])
                  }
                />
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
                  onClick={BtnEnviarFormAddSucursales}
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
            Mollis es, clamare non decet, nisi matrem.
          </Typography>
        </Grid>
      </Modal>
    </>
  );
}
