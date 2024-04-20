import React from "react";

//recursos
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//Rutas
import Inicio_ from "./Components/Routes/Inicio/Inicio.jsx";
import Singin_ from "./Components/Routes/Singing/Singin.jsx";
import Dashboard_ from "./Components/Routes/Dashboard/Dashboard.jsx";

function App(props) {
  return (
    <>
      <div className="App">
        {/* // limitaciones de vistas */}

        {/* // si tamaño de pantalla muy pequeña */}
        <div className="noRenderable">
          <p>
            Tu dispositivo no cumple con las características necesarias.
            <br />
            <b>Ponte en contacto con el proveedor del servicio.</b>
          </p>
        </div>
        {/* //renderización de vistas */}

        <Router>
          <Routes>
            <Route exact path="/" element={<Inicio_ />}></Route>
            <Route path="/Singin" element={<Singin_ />}></Route>
            <Route
              usuario
              path="/arcontroller/web/main/Dashboard"
              element={<Dashboard_ />}
            ></Route>
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
