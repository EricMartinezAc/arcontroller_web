import React, { ReactNode, useContext, useEffect, useState } from "react";
import { CreateGeneralContext } from "./Index";

import Cookies from "universal-cookie";

//server resources
import { Routes } from "../constans";
import ValideCookies from "../Components/Common/ModulosSis/ValideCookies";
import {
  USER,
  PRODUCT,
  BRANCH,
  ERDTO,
  SRDTO,
  PERSONA,
  AREA,
  RRHH,
} from "../dto";

export const GeneralContext: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  //server resources
  // --> entidades
  const [user, setUser] = useState<USER>({
    user: "User1*",
    pswLogin: "",
  });
  const [prodct, setProdct] = useState<PRODUCT>({
    owner: "arcontroller@climatecontrolsing.com",
    clav_prodct: "Arc2025*",
  });
  const [id, setID] = useState<string>("67736988a5da74e14a20da90");
  const [areas, setAreas] = useState<AREA[] | null | undefined>(null);
  const [branches, setBranches] = useState<BRANCH[] | null | undefined>(null);
  const [personas, setPersonas] = useState<PERSONA[] | null | undefined>(null);
  const [rrhh, setRRHH] = useState<RRHH[] | null | undefined>(null);

  //engine resources
  const [currentDate, setCurrentDate] = useState<object>({
    dia: new Date(Date.now()).getDate(),
    mes: new Date(Date.now()).getMonth() + 1,
    anio: new Date(Date.now()).getFullYear(),
  });
  const [modeStrict, setModeStrict] = useState<boolean>(false);
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
    setUser,
    prodct,
    setProdct,
    id,
    setID,
    branches,
    setBranches,
    areas,
    setAreas,
    personas,
    setPersonas,
    rrhh,
    setRRHH,
  };
  const engineResources: ERDTO = {
    mobile: false,
    Routes,
    Legacy: [aceptLegacy, setAceptLegacy],
    DescriptionAlerts: [AlertDialogs, setAlertDialogs],
    Loading: [stateLoading, setStateLoading],
    ValideCookies,
    cookies,
    currentDate,
    modeStrict,
    isSmallScreen,
  };

  const engineResourcesSetters: any = {
    setCurrentDate,
    setSmallScreen,
    setModeStrict,
  };

  return (
    <CreateGeneralContext.Provider
      value={{
        serverResources,
        engineResources,
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

// {
//   sucursal: "Principal",
//   ubicacion: ["Colombia", "Atlántico", "calle 55 #43-43", "Soledad"],
//   centroCosto: "501",
//   tipo: "IT",
//   clasificacion: "N/A",
//   politica: [
//     {
//       metodologia: "ITIL", //important
//     },
//   ],
//   prioridad: "1",
//   inicioOp: "2024-10-23",
//   contactos: ["arcontroller@climatecontrolsing.com", "3009858518"],
//   team: [""],
//   imagen: [""],
//   areas: [{ _id: "A001", name: "Funcionarios" }],
//   proveedores: "",
//   id_user: "",
//   state: "",
//   rrhh: [
//     {
//       _id: "string",
//       persona: {
//         _id: "string",
//         nombres: "string",
//         apellidos: "string",
//         genero: "string",
//         fecha_natal: "string",
//       },
//       emai: "string@climatecontrolsing.com",
//       telefono: 0,
//       direccion: "string",
//       fecha_contratacion: "string",
//       id_departamento: "string",
//       id_posicion: "string",
//       estado: "string",
//       salario: 0,
//       tipo_contrato: "string",
//       documento_contrato: "string",
//     },
//   ],
// }
