import { AREA, BRANCH, PERSONA, PRODUCT, RRHH, USER } from "..";

export interface serverResourcesDTO {
  user: USER;
  prodct: PRODUCT;
  branches?: BRANCH[] | null | undefined;
  areas?: AREA[] | null | undefined;
  personas?: PERSONA[] | null | undefined;
  rrhh?: RRHH[] | null | undefined;
}
