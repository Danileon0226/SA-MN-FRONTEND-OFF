import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../Screens/Home/Home";
import Login from "../Screens/Login/Login";
import ProtectorRuta from "../middleware/middleware";
import Empleados from "../Screens/Empleados/Empleados";
import OrdenesActivas from "../Screens/OrdenesActivas/OrdenesActivas";
import ConjuntosUsuario from "../Screens/conjuntosEstado/ConjuntosUsuario";

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
                    path="ordenes"
                    element={
                        <ProtectorRuta>
                            <OrdenesActivas />
                        </ProtectorRuta>
                    }
                />
                <Route
                    path="/conjuntos_actuales/:id_empleado"
                    element={
                        <ProtectorRuta>
                            <ConjuntosUsuario />
                        </ProtectorRuta>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}
