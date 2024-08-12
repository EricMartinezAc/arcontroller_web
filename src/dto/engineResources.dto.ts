import { PagesDTO } from "./Pages.dto";

export interface engineResourcesDTO {
  isSmallScreen: boolean;
  pages: PagesDTO;
  ValideCookies: any;
  aceptLegacy: boolean;
  setAceptLegacy: any;
  AlertDialogs: string[];
  setAlertDialogs: any;
  stateLoading: string;
  setStateLoading: any;
  cookies: any;
}
