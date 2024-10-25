import { AREA, BRANCH, PROVEEDORESDTO, RRHH } from "../../../../dto";

const { Routes } = require("../../../../constans");
const { ValideDatosMiddle } = require("../../../Common/ModulosSis/Segurity.js");

export default class queriesSucursalEntidad {
  public sucursal: string | null = null;
  public pais: string | null = null;
  public ciudad: string | null = null;
  public dpto: string | null = null;
  public direccion: string | null = null;
  public centroCosto: string | null = null;
  public jerarquia: string | null = null;
  public tipo: string | null = null;
  public clasificacion: string | null = null;
  public prioridad: string | null = null;
  public politica: object | null = null;
  public inicioOp: string | null = null;
  public contacto: string | null = null;
  public email: string | null = null;
  public team: string[] | null = null;
  public imagen: string | null = null;
  public areas: AREA[] | null = null;
  public proveedores: PROVEEDORESDTO[] | null = null;
  public rrhh: RRHH[] | null = null;
  public state: boolean = false;

  SetDatos = (datos: Partial<BRANCH>): void => {
    Object.assign(this, datos);
  };

  GetDatos = async (): Promise<BRANCH> => {
    return {
      sucursal: this.sucursal || "",
      pais: this.pais || "",
      ciudad: this.ciudad || "",
      dpto: this.dpto || "",
      direccion: this.direccion || "",
      centroCosto: this.centroCosto || "",
      jerarquia: this.jerarquia || "",
      tipo: this.tipo || "",
      clasificacion: this.clasificacion || "",
      prioridad: this.prioridad || "",
      politica: this.politica || {},
      inicioOp: this.inicioOp || "",
      contacto: this.contacto || "",
      email: this.email || "",
      team: this.team || [],
      imagen: this.imagen || "",
      areas: this.areas || [],
      proveedores: this.proveedores || [],
      rrhh: this.rrhh || [],
      state: this.state || false,
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

  QueryAPI = async (
    process: string,
    owner: string,
    user: string
  ): Promise<any> => {
    const path_to_API = `${Routes.remoteApi}arcontroller/web/${process}`;
    const data = await this.GetDatos();
    const resultValideDatos = await ValideDatosMiddle(process, data);

    if (resultValideDatos) {
      console.log("run to ", [process, owner, user, path_to_API, data]);
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
          .catch((err) => console.log(err));
        return await respSendDats;
      } catch (error) {
        alert(`no se pudo realizar envio de datos: ${error}`);
        return { statusCode: 403, error };
      }
    } else {
      alert("Datos ingresados no cumplen requerimientos");
      setTimeout(() => {
        window.location.href = `${Routes.this}/Singin`;
      }, 5000);
    }
  };
}
