import { ROUTES } from "../index";

export interface engineResourcesDTO {
  mobile: boolean;
  Routes: ROUTES;
  Legacy: any[];
  DescriptionAlerts: any[];
  Loading: any[];
  ValideCookies: any;
  cookies: any;
  modeStrict: boolean;
  currentDate?: object;
}
