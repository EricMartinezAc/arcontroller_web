import { ROUTES } from "@/dto";

export default function ValideCookies(
  process: string,
  cookies: any,
  pages: ROUTES
): any {
  try {
    // ---- Rules on sign-in
    if (
      process === "Singin" &&
      cookies.get("token") &&
      cookies.get("aceptLegacy")
    )
      return { value: true, msj: "sesion encontrada", getApp: pages.Dashboard };
  } catch (error) {
    return {
      value: false,
      msj: `Ha ocurrido un error en validación de datos: ${error}`,
      getApp: pages.remoteApi,
    };
  }
  return { value: false, msj: null, getApp: null };
}
