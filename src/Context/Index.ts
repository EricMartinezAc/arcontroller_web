import { GCDTO, ERDTO, SRDTO } from "@/dto";
import { createContext } from "react";

export const CreateGeneralContext = createContext<
  | {
      serverResources: SRDTO;
      engineResources: ERDTO;
      engineResourcesSetters: any;
    }
  | undefined
>(undefined);
