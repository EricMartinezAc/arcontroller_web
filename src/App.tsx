import React, { useState, useEffect } from "react";
import Cookies from "universal-cookie";

// Contexto
import { AuthProvider } from "./Contexts/AuthContext";

//components views
import { Inicio } from "./Components/Views";

//server resources
import { pages } from "./constans";
import ValideCookies from "./Components/Common/ModulosSis/ValideCookies";
import { UserDTO } from "./dto/User.dto";
import { ProdctDTO } from "./dto/Prodct.dto";
import { BranchesDTO } from "./dto/Branches.dto";

//resources
import "./App.css";

function App() {
  //server resources
  const [user, setUser] = useState<UserDTO[]>([
    {
      user: "",
      pswLogin: "",
      rol: "",
    },
  ]);
  const [prodct, setProdct] = useState<ProdctDTO>({
    owner: "",
    clav_prodct: "",
  });
  const [branches, setBranches] = useState<BranchesDTO[]>([
    {
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
    },
  ]);
  //local resources
  const [isSmallScreen, setSmallScreen] = useState<boolean>(
    window.innerWidth < 600
  );
  //engine resources
  const [aceptLegacy, setAceptLegacy] = useState<boolean>(false);
  const [AlertDialogs, setAlertDialogs] = useState<string[]>([
    "none",
    "",
    "",
    "",
    "",
  ]);
  const [stateLoading, setStateLoading] = useState<string>("none");

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

  return (
    <AuthProvider>
      <Inicio
        serverResources={{
          user,
          setUser,
          prodct,
          setProdct,
          branches,
          setBranches,
        }}
        engineResources={{
          isSmallScreen,
          pages,
          ValideCookies,
          aceptLegacy,
          setAceptLegacy,
          AlertDialogs,
          setAlertDialogs,
          stateLoading,
          setStateLoading,
          cookies,
        }}
      />
    </AuthProvider>
  );
}

export default App;
