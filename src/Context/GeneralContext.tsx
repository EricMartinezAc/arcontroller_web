import React, { ReactNode, useContext, useEffect, useState } from "react";
import { CreateGeneralContext } from "./Index";

import Cookies from "universal-cookie";

//server resources
import { Routes } from "../constans";
import ValideCookies from "../Components/Common/ModulosSis/ValideCookies";
import { USER, PRODUCT, BRANCH, ERDTO, SRDTO } from "@/dto";

export const GeneralContext: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  //server resources
  const [user, setUser] = useState<USER>({
    user: "invitado",
    pswLogin: "",
    rol: "NaN",
    setUser: (u) => setUser(u),
  });
  const [prodct, setProdct] = useState<PRODUCT>({
    owner: "",
    clav_prodct: "",
    setOwner: (p) => setProdct(p),
  });
  const [branches, setBranches] = useState<BRANCH>({
    sucursal: "",
    ubicacion: [""],
    centroCosto: "",
    tipo: "",
    clasificacion: "",
    prioridad: "",
    inicioOp: "",
    contactos: [""],
    team: [""],
    imagen: [""],
    areas: [""],
    proveedores: "",
    gerente: "",
    id_user: "",
    state: "",
    setSucursal: (b) => setBranches(b),
  });

  //engine resources
  const [isSmallScreen, setSmallScreen] = useState<boolean>(
    window.innerWidth < 600
  );
  const [aceptLegacy, setAceptLegacy] = useState<boolean>(false);
  const [AlertDialogs, setAlertDialogs] = useState<string[]>([
    "none",
    "error",
    "error",
    "error",
    "error",
  ]);
  const [stateLoading, setStateLoading] = useState<string>("block");
  const cookies = new Cookies();
  //for mobile app
  useEffect(() => {
    const handleResize = () => {
      setSmallScreen(window.innerWidth < 600);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const serverResources: SRDTO = {
    user,
    prodct,
    branches,
  };
  const engineResources: ERDTO = {
    mobile: false,
    Routes,
    Legacy: [aceptLegacy, setAceptLegacy],
    DescriptionAlerts: [AlertDialogs, setAlertDialogs],
    Loading: [stateLoading, setStateLoading],
    ValideCookies,
    cookies,
  };
  return (
    <CreateGeneralContext.Provider
      value={{
        serverResources,
        engineResources,
      }}
    >
      {children}
    </CreateGeneralContext.Provider>
  );
};

// Hook para usar el contexto en cualquier componente
export const useGeneralContext = () => {
  const context = useContext(CreateGeneralContext);
  if (!context) {
    throw new Error("useGeneralContext must be used within an AuthProvider");
  }
  return context;
};
