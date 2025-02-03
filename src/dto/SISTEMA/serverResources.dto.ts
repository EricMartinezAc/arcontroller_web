import { AREA, BRANCH, PERSONA, PRODUCT, RRHH, USER } from "..";

export interface serverResourcesDTO {
  user: USER;
  setUser: React.Dispatch<React.SetStateAction<USER>>;
  prodct: PRODUCT;
  setProdct: React.Dispatch<React.SetStateAction<PRODUCT>>;
  id: string;
  setID: React.Dispatch<React.SetStateAction<string>>;
  branches?: BRANCH[] | null | undefined;
  setBranches: React.Dispatch<
    React.SetStateAction<BRANCH[] | null | undefined>
  >;
  areas?: AREA[] | null | undefined;
  setAreas: React.Dispatch<React.SetStateAction<AREA[] | null | undefined>>;
  personas?: PERSONA[] | null | undefined;
  setPersonas: React.Dispatch<
    React.SetStateAction<PERSONA[] | null | undefined>
  >;
  rrhh?: RRHH[] | null | undefined;
  setRRHH: React.Dispatch<React.SetStateAction<RRHH[] | null | undefined>>;
}
