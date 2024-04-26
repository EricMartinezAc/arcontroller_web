const pages = require("../../../../Assets/pages");

export default class ClassLocations {
  constructor() {
    this.nombreLocalidades = "";
    this.paisLocalidades = "";
    this.ciudadLocalidades = "";
    this.dptoLocalidades = "";
    this.direccionLocalidades = "";
    this.contactLocalidades = "";
    this.emailLocalidades = "";
    this.fileInputProveedores = "";
    this.fileInputZonas = "";
    this.fileImgLocalidades = "";
    this.typeLocalidades = "";
  }

  SetLocations = (datos_) => {
    this.nombreLocalidades = datos_.nombreLocalidades;
    this.paisLocalidades = datos_.paisLocalidades;
    this.ciudadLocalidades = datos_.ciudadLocalidades;
    this.dptoLocalidades = datos_.dptoLocalidades;
    this.direccionLocalidades = datos_.direccionLocalidades;
    this.contactLocalidades = datos_.contactLocalidades;
    this.emailLocalidades = datos_.emailLocalidades;
    this.fileInputProveedores = datos_.fileInputProveedores;
    this.fileInputZonas = datos_.fileInputZonas;
    this.fileImgLocalidades = datos_.fileImgLocalidades;
    this.typeLocalidades = datos_.typeLocalidades;

    console.log(["datos seteados", this.GetLocations()]);
  };

  GetLocations = () => {
    return {
      nombreLocalidades: this.nombreLocalidades,
      paisLocalidades: this.paisLocalidades,
      ciudadLocalidades: this.ciudadLocalidades,
      dptoLocalidades: this.dptoLocalidades,
      direccionLocalidades: this.direccionLocalidades,
      contactLocalidades: this.contactLocalidades,
      emailLocalidades: this.emailLocalidades,
      fileInputProveedores: this.fileInputProveedores,
      fileInputZonas: this.fileInputZonas,
      fileImgLocalidades: this.fileImgLocalidades,
      typeLocalidades: this.typeLocalidades,
    };
  };

  FetchLocationsALL = async (owner, user, token) => {
    const process = "all";
    console.log(`${pages.remoteAPI}arcontroller/web/locations/queries/find`);
    return await fetch(
      `${pages.remoteAPI}arcontroller/web/locations/queries/find`,
      {
        method: "GET",
        mode: "cors",
        headers: {
          autorization: `Bearer ${owner} ${token} ${user} ${process}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log("respuesta api fetch all ", data);
        setTimeout(() => {
          return data;
        }, 1500);
      });
  };

  AddLocationsAny = async (user, token) => {
    const process = "one";
    const datos = this.GetLocations();
    const resptAPI = await fetch(
      `${pages.remoteAPI}/arcontroller/web/locations/queries/create`,
      {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          "access-control-allow-origin": "*",
        },
        body: JSON.stringify({ process, datos, user, token }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        return data;
      });
    return await resptAPI;
  };
}
