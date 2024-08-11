import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// Mocks para los componentes importados
jest.mock("./Components/Routes/Inicio/Inicio", () => () => <div>Inicio</div>);
jest.mock("./Components/Routes/Singing/Singin", () => () => <div>Singin</div>);
jest.mock("./Components/Routes/Dashboard/Dashboard", () => () => (
  <div>Dashboard</div>
));

describe("App Component", () => {
  beforeEach(() => {
    // Ajustar el tamaño de la ventana antes de cada prueba
    global.innerWidth = 800;
    jest.spyOn(window, "matchMedia").mockImplementation((query) => ({
      matches: query.includes("min-width: 600px"),
      addListener: jest.fn(),
      removeListener: jest.fn(),
    }));
  });

  test("should render the noRenderable message on small screens", () => {
    // Simular una pantalla pequeña
    global.innerWidth = 500;
    render(
      <Router>
        <App />
      </Router>
    );
    expect(
      screen.getByText(
        /Tu dispositivo no cumple con las características necesarias./i
      )
    ).toBeInTheDocument();
  });

  test("should render the router on larger screens", () => {
    // Simular una pantalla grande
    global.innerWidth = 800;
    render(
      <Router>
        <App />
      </Router>
    );
    // Verifica que el componente de enrutamiento se renderiza correctamente
    expect(screen.getByText("Inicio")).toBeInTheDocument();
    expect(screen.queryByText("Singin")).not.toBeInTheDocument();
    expect(screen.queryByText("Dashboard")).not.toBeInTheDocument();
  });

  test("should navigate to Singin and Dashboard pages", () => {
    global.innerWidth = 800;
    render(
      <Router>
        <App />
      </Router>
    );

    // Navegar a la página de Singin
    window.history.pushState({}, "Singin", "/Singin");
    expect(screen.getByText("Singin")).toBeInTheDocument();

    // Navegar a la página de Dashboard
    window.history.pushState(
      {},
      "Dashboard",
      "/arcontroller/web/main/Dashboard"
    );
    expect(screen.getByText("Dashboard")).toBeInTheDocument();
  });
});
