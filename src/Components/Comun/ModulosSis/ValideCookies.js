export default function ValideCookies(proceso, cookies) {
  //default response don´t permission, return home for redirect
  let resp = {
    value: false,
    msj: "NO CUENTA CON PERMISOS SUFICIENTES PARA CONTINUAR. SERÁ REDIRECIONADO AL INICIO",
    procesoTarjet: `${pages.local}`,
  };
  try {
    // on dashboard if sesion is active, great us but not direct
    if (
      proceso === "Dashboard" &&
      cookies.get("token") !== undefined &&
      cookies.get("owner") !== undefined &&
      cookies.get("clav_prodct") !== undefined &&
      cookies.get("user") !== undefined
    ) {
      resp.value = true;
      resp.msj = `Sesión activa confirmada, bienvenido ${cookies.get("user")}`;
      resp.procesoTarjet = false;
    }
    // on loggin or home
    if (proceso === "Singin" || proceso === "Inicio") {
      //if exist token active redirect on dashboard
      if (typeof cookies.get("token") !== "undefined") {
        resp.value = true;
        resp.msj = `Sesión activa confirmada, bienvenido ${cookies.get(
          "user"
        )}`;
        resp.procesoTarjet = `${pages.local}/arcontroller/web/main/Dashboard`;
      }
      //if not exist token active, destroy all cookies
      if (typeof cookies.get("token") === "undefined") {
        resp.msj =
          "Bienvenido a la mejor aplicación de control de recursos fisicos del mundo";
        resp.procesoTarjet = false;
      }
    }
  } catch (error) {
    resp.msj = `Ha ocurrido un error en validación de datos: ${error}`;
    resp.procesoTarjet = false;
  }
  return resp;
}
