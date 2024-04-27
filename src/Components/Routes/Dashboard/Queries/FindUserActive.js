const pages = require("../../../../Assets/pages.js");

export default class User {
  constructor() {
    this._id = "";
    this.user = "";
    this.pswLogin = "";
    this.token = "";
    this.rol = "";
    this.id_prodct = "";
  }

  ValideDatos = (token, user) => {
    return typeof token === "undefined" || typeof user !== "undefined"
      ? true
      : false;
  };

  SetDatsToAPI = (_id_, user_, pswLogin_, token_, rol_, id_prodct_) => {
    this._id = _id_;
    this.user = user_;
    this.pswLogin = pswLogin_;
    this.token = token_;
    this.rol = rol_;
    this.id_prodct = id_prodct_;
  };

  GetDatosAuth = async () => {
    return await {
      _id: this._id,
      user: this.user,
      pswLogin: this.pswLogin,
      token: this.token,
      rol: this.rol,
      id_prodct: this.id_prodct,
    };
  };

  PutUser = async () => {
    let datos = await this.GetDatosAuth();
    const path_API =
      await `${pages.remoteAPI}arcontroller/web/users/putUser`;
    const resultValideDatos = await this.ValideDatos(token, user);
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
          body: JSON.stringify(datos),
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

}

