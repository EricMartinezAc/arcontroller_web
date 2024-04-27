export default class EnviarFormAddLocalidades {
  constructor() {
    this.id_localidades = "";
    this.nombre_localidades = "";
    this.pais_localidades = "";
    this.ciudad_localidades = "";
    this.dpto_localidades = "";
    this.direccion_localidades = "";
    this.contact_localidades = "";
    this.email_localidades = "";
    this.fileDatas_zonas = "";
    this.fileDatas_proveedores = "";
  }

  SetDatsToAPI = async (datos_) => {
    this.id_localidades = datos_.id_localidades;
    this.nombre_localidades = datos_.nombre_localidades;
    this.pais_localidades = datos_.pais_localidades;
    this.ciudad_localidades = datos_.ciudad_localidades;
    this.dpto_localidades = datos_.dpto_localidades;
    this.direccion_localidades = datos_.direccion_localidades;
    this.contact_localidades = datos_.contact_localidades;
    this.email_localidades = datos_.email_localidades;
    this.fileDatas_zonas = datos_.fileDatas_zonas;
    this.fileDatas_proveedores = datos_.fileDatas_proveedores;
    console.log(`seteados datos para ${this.id_localidades}`);
    return await true;
  };

  GetDatosAuth = async () => {
    console.log("cons");
    return await {
      id_localidades: this.id_localidades,
      nombre_localidades: this.nombre_localidades,
      pais_localidades: this.pais_localidades,
      ciudad_localidades: this.ciudad_localidades,
      dpto_localidades: this.dpto_localidades,
      direccion_localidades: this.direccion_localidades,
      contact_localidades: this.contact_localidades,
      email_localidades: this.email_localidades,
      fileDatas_zonas: this.fileDatas_zonas,
      fileDatas_proveedores: this.fileDatas_proveedores,
    };
  };

  SendDatsAPI = async (proceso, axios, datos, cookies_) => {
    console.log(`send data form API ${proceso}`);
    const path_auth_API = `http://localhost:2023/api/arcontroller/${proceso}`;
    //'https://arcbackendapi.up.railway.app:6662/api/arcontroller/users/auth'
    //
    //https://arcbackendapi.up.railway.app:5817/api/arcontroller/users/auth'

    this.SetDatsToAPI(datos);

    await axios
      .post(path_auth_API, {
        process_: proceso,
        datos_: datos,
        emailAuth_: cookies_.cookies.get("emailAuth"),
        pswLogin_: cookies_.cookies.get("pswLogin"),
        NoIdent_: cookies_.cookies.get("NoIdent"),
        area: cookies_.cookies.get("area"),
        clav_prodtc: cookies_.cookies.get("clav_prodtc"),
      })
      .then((response) => {
        console.log("responde: ");
        return {
          value: response.data[0],
          msj: response.data[1],
          severity: response.data[2],
        };
      })
      .catch((error) => {
        console.log(error);
        return error;
      });
  };
}
