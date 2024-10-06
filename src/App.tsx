import { useState, useEffect } from "react";

// Context

//components views
import Inicio from "./Components/Views/Inicio";
import { Dashboard } from "./Components/Views/Dashboard";

//resources
import "./App.css";
import { GeneralContext as GeneralProvider } from "./Context/GeneralContext";

function App() {
  return (
    <GeneralProvider>
      <Inicio />
    </GeneralProvider>
  );
}

export default App;
