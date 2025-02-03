import { Routes as pages } from "../../../../constans";
import ListItems_princ_dashboard from "../../Interfaz/ListItems_princ_dashboard";

export default class ReqResDatos_auth_API {
  constructor() {
    this.owner = "";
    this.clav_prodct = "";
    this.id = "";
    this.user = "";
    this.pswLogin = "";
  }

  SetDatsToAPI = (owner, clav_prodct_, id_, user_, pswLogin_) => {
    console.log("set datos:", { owner, clav_prodct_, id_, user_, pswLogin_ });
    this.owner = owner;
    this.clav_prodct = clav_prodct_;
    this.id = id_;
    this.user = user_;
    this.pswLogin = pswLogin_;
  };

  GetDatosAuth = async () => {
    return await {
      owner: this.owner,
      clav_prodct: this.clav_prodct,
      id: this.id,
      user: this.user,
      pswLogin: this.pswLogin,
    };
  };

  AuthUser = async () => {
    try {
      const data = await this.GetDatosAuth();
      const { id, user, pswLogin } = data;
      console.log("send", { data, id, user, pswLogin });

      const respSendDats = await fetch(pages.API_URL_SESSIONS_AUTH, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, user, pswLogin }),
      })
        .then((res) => res.json())
        .catch((err) => console.err);
      console.log(respSendDats);
      return await respSendDats;
    } catch (error) {
      alert(`no se pudo realizar envio de datos: ${error}`);
      return { statusCode: 403, error: error };
    }
  };

  RegtrUser = async () => {
    try {
      const data = await this.GetDatosAuth();
      const { owner, clav_prodct, user, pswLogin } = data;
      console.log("regtr", { owner, clav_prodct, user, pswLogin });
      const respSendDats = await fetch(pages.API_URL_SESSIONS_REGTR, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ owner, clav_prodct, user, pswLogin }),
      })
        .then((res) => res.json())
        .catch((err) => console.err);
      console.log(respSendDats);
      return await respSendDats;
    } catch (error) {
      alert(`no se pudo realizar envio de datos: ${error}`);
      return { statusCode: 403, error: error };
    }
  };

  GetAPP = async () => {
    console.log("enviando a la app ");
    window.location = `${pages.thisApp}/Dashboard`;
  };
}
