export default function ValideCookies(route, cookies, pages) {
  let resp = {
    value: false,
    msj: "",
    //routeTarjet: "https://arcontroller-front.vercel.app/",
  };
  // let valide_email = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/

  try {
    //consulta comparación cookies
    //-- si estoy en APP sin token retorne llevame a inicio
    if (route === "Dashboard" && typeof cookies.get("token") === "undefined") {
      console.log(cookies.getAll());
      resp.msj = "DEBE LOGUEARSE PARA USAR LA APP";
    }
    if (
      route === "Dashboard" &&
      cookies.get("token") !== undefined &&
      cookies.get("id_prod") !== undefined &&
      cookies.get("user") !== undefined
    ) {
      resp.value = true;
      resp.msj = "Verificación de credenciales es correcta";
    }

    //--- si estoy en logeo y encuentra un token retorne true y lleveme a App
    if (route === "Singin" && typeof cookies.get("token") !== "undefined") {
      resp.value = true;
      resp.msj = "Será redireccionado..";
      resp.routeTarjet = `${pages.this}/arcontroller/web/main/Dashboard`;
    }

    //--- si estoy en Inicio y ya se encuentra una sesión activa? me envía a dashboard
    if (route === "Inicio" && typeof cookies.get("token") !== "undefined") {
      resp.value = true;
      resp.msj = "Ya se encuentra una sesión activa";
      resp.routeTarjet = `${pages.this}/arcontroller/web/main/Dashboard`;
    }
    if (route === "Inicio" && typeof cookies.get("token") === "undefined") {
      resp.value = true;
      resp.routeTarjet = "none";
    }
  } catch (error) {
    resp.routeTarjet = "Inicio";
    resp.msj = `Ha ocurrido un error en validación de datos: ${error}`;
  }

  return resp;
}
