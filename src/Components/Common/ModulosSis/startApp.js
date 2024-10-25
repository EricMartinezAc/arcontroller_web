import { loadData } from "../../../Components/Views/Dashboard/Queries/loadData";

export const startApp = (cookies, DescriptionAlerts) => {
  if (
    !cookies.get("aceptLegacy") ||
    !cookies.get("user") ||
    !cookies.get("token") ||
    !cookies.get("owner") ||
    !cookies.get("_id")
  )
    throw new Error("No se cuenta con credenciales suficientes");

  loadData(
    //por ahora, solo carga branches
    cookies.get("owner"),
    cookies.get("token"),
    cookies.get("_id")
  )
    .then(async (data) => {
      console.log("resp API ---------", [data.datos, serverResources.user.rol]);
    })
    .catch((err) => {
      console.log(err);
    });
};
