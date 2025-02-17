import { ROUTES } from "../index";

export interface engineResourcesDTO {
  mobile: boolean;
  Routes: ROUTES;
  Legacy: any[];
  DescriptionAlerts: any[];
  Loading: any[];
  modeStrict: boolean;
  currentDate?: object;
  isSmallScreen?: boolean;
}
