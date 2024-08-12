import { BranchesDTO } from "./Branches.dto";
import { PagesDTO } from "./Pages.dto";
import { ProdctDTO } from "./Prodct.dto";
import { UserDTO } from "./User.dto";

export interface InicioProps {
  serverResources: {
    user: UserDTO[];
    setUser: React.Dispatch<React.SetStateAction<UserDTO[]>>;
    prodct: ProdctDTO;
    setProdct: React.Dispatch<React.SetStateAction<ProdctDTO>>;
    branches: BranchesDTO[];
    setBranches: React.Dispatch<React.SetStateAction<BranchesDTO[]>>;
  };
  engineResources: {
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
  };
  visibleFormAuth?: boolean;
  ValidacionFormAuth?: any;
}
