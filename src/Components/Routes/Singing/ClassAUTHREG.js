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
      return datos.clav_prodct !== undefined && datos.user !== undefined
        ? true
        : false;
    }
  };

  SetDatsToAPI = (owner, user_, pswLogin_, clav_prodct_, rol_) => {
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

  SendDatsAPI = async (proceso, axios) => {
    console.log(
      `solicitando credenciales para ${this.user} en ${this.owner}: ${proceso} `
    );
    let datos = this.GetDatosAuth();
    const path_API = `${pages.localAPI}arcontroller/web/users/${proceso}`;
    const resultValideDatos = await this.ValideDatos(proceso, datos);

    if (resultValideDatos) {
      try {
        return fetch(path_API, {
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
          .then((data) => {
            return data;
          });
      } catch (error) {
        alert(`${error}`);
      }
    } else {
      alert("Datos ingresados no cumplen requerimientos");
      setTimeout(() => {
        window.location = "http://localhost:3000/Singin";
      }, 5000);
    }
  };

  GetAPP = async (token, axios) => {
    await axios
      .get(`${pages.remoteAPI}arcontroller/web/app/dashboard`, {
        headers: {
          autorization: `Bearer ${token}`,
        },
      })
      .then((resp) => {
        console.log(resp);
        setTimeout(() => {
          if (resp.data.statusCode === 200) {
            window.location = `${pages.this}arcontroller/web/main/Dashboard`;
          } else {
            alert(resp.data.msj);
            window.location = `${pages.this}`;
          }
        }, 300);
      })
      .catch((err) => {
        alert("Error en generación de token:", err);
        setTimeout(() => {
          window.location = `${pages.local}`;
        }, 300);
        console.error("Error :", err);
      });
  };
}
