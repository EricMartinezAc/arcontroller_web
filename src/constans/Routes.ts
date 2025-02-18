import { ROUTES as RoutesDTO } from "@/dto";

export const Routes: RoutesDTO = {
  thisApp: "http://localhost:3001", //https://arcontroller-web.onrender.com", //

  API_URL_SESSIONS_REGTR:
    "https://cci-sessions.onrender.com/api/sessions/route/register",
  API_URL_SESSIONS_AUTH:
    "https://cci-sessions.onrender.com/api/sessions/route/auth",
  API_URL_SESSIONS_VALIDETOKEN:
    "https://cci-sessions.onrender.com/api/sessions/route/route_valideTokenActv",

  Dashboard: "/Dashboard",
  API_URL_createEmployee: "http://localhost:3000/api/employees/createEmployee/",
  API_URL_loadBranches:
    "http://localhost:3000/api/branches/getAllBranchesByUser",
  API_URL_loadAreas: "http://localhost:3000/api/areas/",
  API_URL_loadRRFF: "http://localhost:3000/api/rrff/",
};
