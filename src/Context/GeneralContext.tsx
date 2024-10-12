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
    user: "ArturoMartinez1992*",
    pswLogin: "Arc2025*",
    rol: "PO",
  });
  const [prodct, setProdct] = useState<PRODUCT>({
    owner: "arcontroller@climatecontrolsing.com",
    clav_prodct: "Arc2025*",
  });
  const [branches, setBranches] = useState<BRANCH>({
    sucursal: "",
    ubicacion: [""],
    centroCosto: "",
    tipo: "",
    clasificacion: "",
    politica: [
      {
        metodologia: "ITIL", //important
      },
    ],
    prioridad: "",
    inicioOp: "",
    contactos: [""],
    team: [""],
    imagen: [""],
    areas: [
      {
        _id: "A1",
        name: "costa",
        ci: [
          //hojas de vida
          {
            _id: "EQ000001",
            clase: "HVAC",
            familia: "climatizacion",
            tipo: "minisplit",
            serie: "single",
            id_zona: "Z1",
            hd: ["LG electronics", "ARNU18GTPC2", "{despiece aquí}"],
          },
          {
            _id: "EQ000002",
            clase: "HVAC",
            familia: "climatizacion",
            tipo: "minisplit",
            serie: "single",
            id_zona: "Z1",
            hd: ["LG electronics", "ARNU18GTPC2", "{despiece aquí}"],
          },
        ],
        inc: [
          {
            _id: "INC-202402201",
            fecha: "2024-01-20",
            id_ci: "EQ000001-A001",
          },
          {
            _id: "INC-202402202",
            fecha: "2024-01-20",
          },
          {
            _id: "INC001-EQ000002-20240220",
            fecha: "2024-01-20",
          },
          { _id: "hv03", fecha: "2024-01-20" },
          { _id: "hv01", fecha: "2024-01-20" },
          { _id: "hv02", fecha: "2024-01-20" },
          { _id: "hv03", fecha: "2024-01-20" },
        ],
      },
      {
        _id: "",
        name: "pacifico",
        activos: [
          {
            _id: "",
            name: "",
            hv: [{ _id: "" }],
            ot: [{ _id: "", fecha: "2024-01-20" }],
          },
        ],
      },
      {
        _id: "",
        name: "andina",
        activos: [
          {
            _id: "",
            name: "",
            hv: [{ _id: "" }],
            ot: [{ _id: "", fecha: "2024-01-20" }],
          },
        ],
      },
    ],
    proveedores: "",
    gerente: "",
    id_user: "",
    state: "",
  });

  //engine resources
  const [currentYear, setCurrentYear] = useState<number>();
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
    currentYear,
  };
  const serverResourcesSetters: any = [setUser, setProdct, setBranches];
  const engineResourcesSetters: any = [setCurrentYear];

  return (
    <CreateGeneralContext.Provider
      value={{
        serverResources,
        engineResources,
        serverResourcesSetters,
        engineResourcesSetters,
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
