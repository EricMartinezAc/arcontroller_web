const pages = require("../../../../Assets/pages");

export default class ClassLocations {
  constructor() {
    this.nombre_localidades = "";
    this.pais_localidades = "";
    this.ciudad_localidades = "";
    this.dpto_localidades = "";
    this.direccion_localidades = "";
    this.contact_localidades = "";
    this.email_localidades = "";
    this.fileInput_proveedores = "";
    this.fileInput_zonas = "";
    this.fileImgLocalidades = "";
  }

  SetLocations = (datos_) => {
    this.nombre_localidades = datos_.nombre_localidades;
    this.pais_localidades = datos_.pais_localidades;
    this.ciudad_localidades = datos_.ciudad_localidades;
    this.dpto_localidades = datos_.dpto_localidades;
    this.direccion_localidades = datos_.direccion_localidades;
    this.contact_localidades = datos_.contact_localidades;
    this.email_localidades = datos_.email_localidades;
    this.fileInput_proveedores = datos_.fileInput_proveedores;
    this.fileInput_zonas = datos_.fileInput_zonas;
    this.fileImgLocalidades = datos_.fileImgLocalidades;
  };

  GetLocations = () => {
    return {
      nombre_localidades: this.nombre_localidades,
      pais_localidades: this.pais_localidades,
      ciudad_localidades: this.ciudad_localidades,
      dpto_localidades: this.dpto_localidades,
      direccion_localidades: this.direccion_localidades,
      contact_localidades: this.contact_localidades,
      email_localidades: this.email_localidades,
      fileInput_proveedores: this.fileInput_proveedores,
      fileInput_zonas: this.fileInput_zonas,
      fileImgLocalidades: this.fileImgLocalidades,
    };
  };

  FetchLocationsALL = async (owner, user, token) => {
    const process = "all";
    const resptAPI = await fetch(
      `${pages.remoteAPI}/arccontroller/web/locations/queries/find`,
      {
        method: "GET",
        mode: "cors",
        headers: `autorization ${token} ${user} ${owner} ${process}`,
      }
    )
      .then((res) => res.json())
      .then((data) => {
        return data;
      });
    return await resptAPI;
  };
}
