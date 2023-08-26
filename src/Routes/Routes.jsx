import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../Screens/Home/Home";
import Login from "../Screens/Login/Login";
import ProtectorRuta from "../middleware/middleware";
import Empleados from "../Screens/Empleados/Empleados";
import AgregarConjunto from "../Screens/agregarConjunto/AgregarConjunto";
import PanelAdministrador from "../Screens/PanelAdministrador/PanelAdministrador";

export default function Rutas() {
  return (
    <BrowserRouter>
      <Routes>
        {/* RUTAS PUBLICAS */}
        <Route path="*" element={<Login />} />
        <Route path="/" element={<Login />} />

        {/* RUTAS PRIVADAS */}
        <Route
          path="inicio"
          element={
            <ProtectorRuta>
              <Home />
            </ProtectorRuta>
          }
        />
        <Route
          path="empleados"
          element={
            <ProtectorRuta>
              <Empleados />
            </ProtectorRuta>
          }
        />
        <Route
          path="agregarConjunto/:id_empleado"
          element={
            <ProtectorRuta>
              <AgregarConjunto />
            </ProtectorRuta>
          }
        />
        <Route
          path="admin"
          element={
            <ProtectorRuta>
              <PanelAdministrador/>
            </ProtectorRuta>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
