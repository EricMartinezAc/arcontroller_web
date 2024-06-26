import pages from "../../../Assets/pages";

export default class ReqResDatos_auth_API {
  constructor() {
    this.owner = "";
    this.clav_prodct = "";
    this.user = "";
    this.pswLogin = "";
    this.rol = "";
  }

  ValideDatos = (proceso, datos) => {
    if (proceso === "auth") {
      return datos.clav_prodct !== undefined && datos.user !== undefined
        ? true
        : false;
    }
    if (proceso === "regtr") {
      return typeof datos.clav_prodct !== "undefined" &&
        typeof datos.user !== "undefined"
        ? true
        : false;
    }
  };

  SetDatsToAPI = (owner, clav_prodct_, user_, pswLogin_, rol_) => {
    this.owner = owner;
    this.clav_prodct = clav_prodct_;
    this.user = user_;
    this.pswLogin = pswLogin_;
    this.rol = rol_;
  };

  GetDatosAuth = async () => {
    return await {
      owner: this.owner,
      clav_prodct: this.clav_prodct,
      user: this.user,
      pswLogin: this.pswLogin,
      rol: this.rol,
    };
  };

  SendDatsAPI = async (proceso) => {
    let datos = await this.GetDatosAuth();
    const path_API =
      await `${pages.remoteAPI}arcontroller/web/users/${proceso}`;
    const resultValideDatos = await this.ValideDatos(proceso, datos);
    console.log([datos, path_API, resultValideDatos]);
    if (resultValideDatos) {
      try {
        const respSendDats = await fetch(path_API, {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
            "access-control-allow-origin": "*",
          },
          body: JSON.stringify({
            process_: proceso,
            datos_: datos,
          }),
        })
          .then((res) => res.json())
          .catch((err) => console.err);
        console.log(respSendDats);
        return await respSendDats;
      } catch (error) {
        alert(`no se pudo realizar envio de datos: ${error}`);
        return { statusCode: 403, error: error };
      }
    } else {
      alert("Datos ingresados no cumplen requerimientos");
      setTimeout(() => {
        window.location = `${pages.this}/Singin`;
      }, 5000);
    }
  };

  GetAPP = async (user, token) => {
    console.log("enviando a la app ", token);
    await fetch(`${pages.remoteAPI}arcontroller/web/app/dashboard`, {
      method: "GET",
      mode: "cors",
      headers: {
        autorization: `Bearer ${token} ${user}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("respuesta api getapp ", data);
        setTimeout(() => {
          if (data.statusCode === 200) {
            window.location = `${pages.this}arcontroller/web/main/Dashboard`;
          } else {
            alert(data.msj);
          }
        }, 1500);
      })

      .catch((err) => {
        alert("Error en generación de token:", err);
        setTimeout(() => {
          console.log(`${pages.this}`);
        }, 300);
        console.error("Error :", err);
      });
  };
}
