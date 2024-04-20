//logic:
// require process, cookies and pages file
// response OBJECT msj and getApp :
// msj init empty then, on step is charge msj to render client
// getApp init empty, then:
// -- true for redirect to dashboard,
// -- false for redirect to singin

export default function ValideCookies(process, cookies, pages) {
  //default response don´t permission, return home for redirect
  let resp = { msj: null, getApp: null };
  try {
    // ---- Rules on home
    if (process === "Inicio") {
      // ## if acepted policy cookies and exist token : return dashboard
      if (
        cookies.get("aceptLegacy") &&
        typeof cookies.get("token") !== "undefined"
      ) {
        resp.token = cookies.get("token");
        resp.msj = `Sesión activa confirmada, bienvenido de vuelta`;
        resp.getApp = true;
      } else {
        //## else, destoy all cookies.
        require("./DropCookies").All(cookies, "/");
      }
    }

    // ----Rules on singin
    //## without acetp policy cookies, return to home, on home to be dropped all cookies
    if (process === "Singin" && !cookies.get("aceptLegacy")) {
      resp.msj = `Es necesario que acepte las políticas de uso de cookies para continuar`;
    } else {
      // ## si ya existe token, redirect to dashboard
      if (typeof cookies.get("token") !== "undefined") {
        //## return to app
        resp.getApp = true;
        resp.msj = `Sesión activa confirmada, bienvenido de vuelta`;
      }
    }

    // - Rules on dashboard
    // ## if not exist sesion, us to be redirect to Singin.
    // ## on sigin if not exist acept policy cookies, to be redirect to home
    if (
      process === "Dashboard" &&
      typeof cookies.get("token") !== "undefined"
    ) {
      resp.value = false;
      resp.msj = `Sesión no cuenta con credenciales suficientes`;
      resp.getApp = false;
    }
  } catch (error) {
    resp.msj = `Ha ocurrido un error en validación de datos: ${error}`;
  }
  return resp;
}
