import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Componentes
import Inicio_ from "./Components/Routes/Inicio/Inicio";
import Singin_ from "./Components/Routes/Singing/Singin";
import Dashboard_ from "./Components/Routes/Dashboard/Dashboard";

function App() {
  const [isSmallScreen, setSmallScreen] = useState<boolean>(
    window.innerWidth < 600
  );

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
    <>
      <div className="App">
        {isSmallScreen ? (
          <div className="noRenderable">
            <p>
              Tu dispositivo no cumple con las características necesarias.
              <br />
              <b>Ponte en contacto con el proveedor del servicio.</b>
            </p>
          </div>
        ) : (
          <Router>
            <Routes>
              <Route path="/" element={<Inicio_ />} />
              <Route path="/Singin" element={<Singin_ />} />
              <Route
                path="/arcontroller/web/main/Dashboard"
                element={<Dashboard_ />}
              />
            </Routes>
          </Router>
        )}
      </div>
    </>
  );
}

export default App;
