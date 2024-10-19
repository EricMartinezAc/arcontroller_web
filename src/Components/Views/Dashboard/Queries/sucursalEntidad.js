const { Routes } = require("../../../../constans");
const { ValideDatosMiddle } = require("../../../Common/ModulosSis/Segurity.js");

export default class queriesSucursalEntidad {
  constructor() {
    this._id = null;
    this.sucursal = null;
    this.pais = null;
    this.ciudad = null;
    this.dpto = null;
    this.direccion = null; //3
    this.centroCosto = null;
    this.jerarquia = null;
    this.tipo = null;
    this.clasificacion = null;
    this.prioridad = null;
    this.politica = null;
    this.inicioOp = null;
    this.contacto = null;
    this.email = null;
    this.team = null;
    this.imagen = null;
    this.areas = null;
    this.proveedores = null;
    this.rrhh = null;
    this.state = false;
  }

  SetDatos = (datos) => {
    this._id = datos._id;
    this.sucursal = datos.sucursal;
    this.pais = datos.pais;
    this.ciudad = datos.ciudad;
    this.dpto = datos.dpto;
    this.direccion = datos.direccion;
    this.centroCosto = datos.centroCosto;
    this.jerarquia = datos.jerarquia;
    this.tipo = datos.tipo;
    this.clasificacion = datos.clasificacion;
    this.prioridad = datos.prioridad;
    this.politica = datos.politica;
    this.inicioOp = datos.inicioOp;
    this.contacto = datos.contacto;
    this.email = datos.email;
    this.team = datos.team;
    this.imagen = datos.imagen;
    this.areas = datos.areas;
    this.proveedores = datos.proveedores;
    this.rrhh = datos.rrhh;
    this.state = datos.state;
  };

  GetDatos = async () => {
    return await {
      _id: this._id,
      sucursal: this.sucursal,
      pais: this.pais,
      ciudad: this.ciudad,
      dpto: this.dpto,
      direccion: this.direccion,
      centroCosto: this.centroCosto,
      jerarquia: this.jerarquia,
      tipo: this.tipo,
      clasificacion: this.clasificacion,
      prioridad: this.prioridad,
      inicioOp: this.inicioOp,
      contacto: this.contacto,
      team: this.team,
      imagen: this.imagen,
      areas: this.areas,
      proveedores: this.proveedores,
      rrh: this.rrhh,
      state: this.state,
    };
  };

  // loadData = async (owner) => {
  //   let datos = await this.GetDatos();
  //   const path_API = await `${Routes.remoteApi}arcontroller/web/user`;
  //   const resultValideDatos = await this.ValideDatos(datos.token, datos.user);
  //   if (resultValideDatos) {
  //     console.log([datos, path_API]);
  //     try {
  //       const respSendDats = await fetch(path_API, {
  //         method: "POST",
  //         mode: "cors",
  //         headers: {
  //           "Content-Type": "application/json",
  //           "access-control-allow-origin": "*",
  //         },
  //         body: JSON.stringify({ owner, datos }),
  //       })
  //         .then((res) => res.json())
  //         .catch((err) => console.err);
  //       console.log(respSendDats);
  //       return await respSendDats;
  //     } catch (error) {
  //       alert(`no se pudo realizar envio de datos: ${error}`);
  //       return { statusCode: 403, error: error };
  //     }
  //   } else {
  //     alert("Datos ingresados no cumplen requerimientos");
  //     setTimeout(() => {
  //       window.location = `${Routes.this}/Singin`;
  //     }, 5000);
  //   }
  // };

  QueryAPI = async (process, owner, user) => {
    const path_to_API = `${Routes.remoteApi}arcontroller/web/${process}`;
    const data = await this.GetDatos();
    const resultValideDatos = await ValideDatosMiddle(process, data);

    if (resultValideDatos) {
      console.log("run to ", [process, owner, user, path_to_API, data]);
      // try {
      //   const respSendDats = await fetch(path_to_API, {
      //     method: "POST",
      //     mode: "cors",
      //     headers: {
      //       "Content-Type": "application/json",
      //       "access-control-allow-origin": "*",
      //     },
      //     body: JSON.stringify({ process, owner, user, data }),
      //   })
      //     .then((res) => res.json())
      //     .catch((err) => console.err(err));
      //   return await respSendDats;
      // } catch (error) {
      //   alert(`no se pudo realizar envio de datos: ${error}`);
      //   return { statusCode: 403, error };
      // }
    } else {
      alert("Datos ingresados no cumplen requerimientos");
      setTimeout(() => {
        window.location = `${Routes.this}/Singin`;
      }, 5000);
    }
  };
}
