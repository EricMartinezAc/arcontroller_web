const pages = require("../../../../Assets/pages.js");
const { ValideDatosMiddle } = require("../../../Comun/ModulosSis/Security.js");

export default class sucursalEntidad {
  constructor() {
    this._id = null;
    this.sucursal = null;
    this.ubicacion = null;
    this.centroCosto = null;
    this.tipo = null;
    this.clasificacion = null;
    this.prioridad = null;
    this.inicioOp = null;
    this.contactos = null;
    this.team = null;
    this.imagen = null;
    this.areas = null;
    this.proveedores = null;
    this.gerente = null;
    this.id_prodct = null;
  }

  SetDatos = (datos) => {
    this._id = datos._id;
    this.sucursal = datos.sucursal;
    this.ubicacion = datos.ubicacion;
    this.centroCosto = datos.centroCosto;
    this.tipo = datos.tipo;
    this.clasificacion = datos.clasificacion;
    this.prioridad = datos.prioridad;
    this.inicioOp = datos.inicioOp;
    this.contactos = datos.contactos;
    this.team = datos.team;
    this.imagen = datos.imagen;
    this.areas = datos.areas;
    this.proveedores = datos.proveedores;
    this.gerente = datos.gerente;
    this.id_prodct = datos.id_prodct;
  };

  GetDatos = async () => {
    return await {
      _id: this._id,
      sucursal: this.sucursal,
      ubicacion: this.ubicacion,
      centroCosto: this.centroCosto,
      tipo: this.tipo,
      clasificacion: this.clasificacion,
      prioridad: this.prioridad,
      inicioOp: this.inicioOp,
      contactos: this.contactos,
      team: this.team,
      imagen: this.imagen,
      areas: this.areas,
      proveedores: this.proveedores,
      gerente: this.gerente,
      id_prodct: this.id_prodct,
    };
  };

  ReLoadDataAPI = async (owner) => {
    console.log(owner);
    // let datos = await this.GetDatos();
    // const path_API = await `${pages.remoteAPI}arcontroller/web/user`;
    // const resultValideDatos = await this.ValideDatos(datos.token, datos.user);
    // if (resultValideDatos) {
    //   console.log([datos, path_API]);
    //   try {
    //     const respSendDats = await fetch(path_API, {
    //       method: "POST",
    //       mode: "cors",
    //       headers: {
    //         "Content-Type": "application/json",
    //         "access-control-allow-origin": "*",
    //       },
    //       body: JSON.stringify({ owner, datos }),
    //     })
    //       .then((res) => res.json())
    //       .catch((err) => console.err);
    //     console.log(respSendDats);
    //     return await respSendDats;
    //   } catch (error) {
    //     alert(`no se pudo realizar envio de datos: ${error}`);
    //     return { statusCode: 403, error: error };
    //   }
    // } else {
    //   alert("Datos ingresados no cumplen requerimientos");
    //   setTimeout(() => {
    //     window.location = `${pages.this}/Singin`;
    //   }, 5000);
    // }
  };

  QueryAPI = async (process, owner, user) => {
    const path_to_API = `${pages.remoteAPI}arcontroller/web/${process}`;
    const data = await this.GetDatos();
    const resultValideDatos = await ValideDatosMiddle(process, data);

    if (resultValideDatos) {
      try {
        const respSendDats = await fetch(path_to_API, {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
            "access-control-allow-origin": "*",
          },
          body: JSON.stringify({ process, owner, user, data }),
        })
          .then((res) => res.json())
          .catch((err) => console.err(err));
        return await respSendDats;
      } catch (error) {
        alert(`no se pudo realizar envio de datos: ${error}`);
        return { statusCode: 403, error };
      }
    } else {
      alert("Datos ingresados no cumplen requerimientos");
      setTimeout(() => {
        window.location = `${pages.this}/Singin`;
      }, 5000);
    }
  };
}
