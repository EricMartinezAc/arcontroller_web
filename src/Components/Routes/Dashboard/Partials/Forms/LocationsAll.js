import React, { useState } from "react";
import PropTypes from "prop-types";
import "../../../../../Assets/styles/forms.css";
import { Box, Button } from "@mui/material";

import ClassLocations from "../../Models/Locations";

function LocationsAll(props) {
  const classLocations = new ClassLocations();
  const [nombreLocalidades, setNombreLocalidades] = useState();
  const [paisLocalidades, setPaisLocalidades] = useState();
  const [ciudadLocalidades, setCiudadLocalidades] = useState();
  const [dptoLocalidades, setDptoLocalidades] = useState();
  const [direccionLocalidades, setDireccionLocalidades] = useState();
  const [contactLocalidades, setContactLocalidades] = useState();
  const [emailLocalidades, setEmailLocalidades] = useState();
  const [fileInputProveedores, setFileInputProveedores] = useState();
  const [fileInputZonas, setFileInputZonas] = useState();
  const [fileImgLocalidades, setFileImgLocalidades] = useState();
  const [typeLocalidades, setTypeLocalidades] = useState();

  const AddLocation = async () => {
    await classLocations.SetLocations({
      nombreLocalidades,
      paisLocalidades,
      ciudadLocalidades,
      dptoLocalidades,
      direccionLocalidades,
      contactLocalidades,
      emailLocalidades,
      fileInputProveedores,
      fileInputZonas,
      fileImgLocalidades,
      typeLocalidades,
    });
    const resptAPI = await classLocations.AddLocationAny(props.cookies);
    console.log(resptAPI);
  };
  const EditLocation = async () => {
    const resptAPI = await classLocations.AddLocationAny(props.cookies, {
      nombreLocalidades,
      paisLocalidades,
      ciudadLocalidades,
      dptoLocalidades,
      direccionLocalidades,
      contactLocalidades,
      emailLocalidades,
      fileInputProveedores,
      fileInputZonas,
      fileImgLocalidades,
      typeLocalidades,
    });
    console.log(resptAPI);
  };
  const DeleteLocation = async () => {
    const resptAPI = await classLocations.AddLocationAny({
      nombreLocalidades,
      paisLocalidades,
      ciudadLocalidades,
      dptoLocalidades,
      direccionLocalidades,
      contactLocalidades,
      emailLocalidades,
      fileInputProveedores,
      fileInputZonas,
      fileImgLocalidades,
      typeLocalidades,
    });
    console.log(resptAPI);
  };

  return (
    <>
      <h2>Formulario de localidades</h2>
      <form method="POST" className="containerInput">
        <Box className="inputFlex">
          <label htmlFor="nombreLocalidades">Nombre de localidad</label>
          <input
            id="nombreLocalidades"
            name="nombreLocalidades"
            value={nombreLocalidades}
            onChange={(e) => setNombreLocalidades(e.target.value)}
          />
        </Box>
        <Box className="inputFlex">
          <label htmlFor="paisLocalidades">Pais de localidad</label>
          <input
            id="paisLocalidades"
            name="paisLocalidades"
            value={paisLocalidades}
            onChange={(e) => setPaisLocalidades(e.target.value)}
          />
        </Box>
        <Box className="inputFlex">
          <label htmlFor="ciudadLocalidades">Ciudad de localidad</label>
          <input
            id="ciudadLocalidades"
            name="ciudadLocalidades"
            value={ciudadLocalidades}
            onChange={(e) => setCiudadLocalidades(e.target.value)}
          />
        </Box>
        <Box className="inputFlex">
          <label htmlFor="dptoLocalidades">Dpto de localidad</label>
          <input
            id="dptoLocalidades"
            name="dptoLocalidades"
            value={dptoLocalidades}
            onChange={(e) => setDptoLocalidades(e.target.value)}
          />
        </Box>
        <Box className="inputFlex">
          <label htmlFor="direccionLocalidades">Dirección de localidad</label>
          <input
            id="direccionLocalidades"
            name="direccionLocalidades"
            value={direccionLocalidades}
            onChange={(e) => setDireccionLocalidades(e.target.value)}
          />
        </Box>
        <Box className="inputFlex">
          <label htmlFor="contactLocalidades">contacto de localidad</label>
          <input
            id="contactLocalidades"
            name="contactLocalidades"
            value={contactLocalidades}
            onChange={(e) => setContactLocalidades(e.target.value)}
          />
        </Box>
        <Box className="inputFlex">
          <label htmlFor="emailLocalidades">email de localidad</label>
          <input
            id="emailLocalidades"
            name="emailLocalidades"
            value={emailLocalidades}
            onChange={(e) => setEmailLocalidades(e.target.value)}
          />
        </Box>
        <Box className="inputFlex">
          <label htmlFor="fileInputProveedores">proveedores de localidad</label>
          <input
            id="fileInputProveedores"
            name="fileInputProveedores"
            value={fileInputProveedores}
            onChange={(e) => setFileInputProveedores(e.target.value)}
          />
        </Box>
        <Box className="inputFlex">
          <label htmlFor="fileInputZonas">zonas de localidad</label>
          <input
            id="fileInputZonas"
            name="fileInputZonas"
            value={fileInputZonas}
            onChange={(e) => setFileInputZonas(e.target.value)}
          />
        </Box>
        <Box className="inputFlex">
          <label htmlFor="fileImgLocalidades">Imagen de localidad</label>
          <input
            id="fileImgLocalidades"
            name="fileImgLocalidades"
            value={fileImgLocalidades}
            onChange={(e) => setFileImgLocalidades(e.target.value)}
          />
        </Box>
        <Box className="inputFlex">
          <label htmlFor="typeLocalidades">Imagen de localidad</label>
          <input
            id="typeLocalidades"
            name="typeLocalidades"
            value={typeLocalidades}
            onChange={(e) => setTypeLocalidades(e.target.value)}
          />
        </Box>
        <Button onClick={AddLocation}>Add</Button>
        <Button onClick={EditLocation}>Edit</Button>
        <Button onClick={DeleteLocation}>Delete</Button>
      </form>
    </>
  );
}

LocationsAll.propTypes = {};

export default LocationsAll;
