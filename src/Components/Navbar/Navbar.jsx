import { useState } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";

import homeIcon from "../../assets/icons/home-line.svg";
import groupIcon from "../../assets/icons/group-line.svg";
import adminIcon from "../../assets/icons/admin-line.svg";
import cartIcon from "../../assets/icons/shopping-cart-line.svg";
import settingsIcon from "../../assets/icons/settings-line.svg";
import loginIcon from "../../assets/icons/login-box-line.svg";



const Navbar = () => {
  const [isExpanded, setExpendState] = useState(false);
  const menuItems = [
    {
      text: "Inicio",
      icon: homeIcon,
      ruta: "/inicio"
    },
    {
      text: "Empleados",
      icon: groupIcon,
      ruta: "/empleados"
    },
    {
      text: "Perfil Administrador",
      icon: adminIcon,
      ruta: "/admin"
    },
    {
      text: "Ordenes activas",
      icon: cartIcon,
      ruta: "/ordenes"
    },
    {
      text: "Ajustes",
      icon: settingsIcon,
      ruta: "/ajustes"
    },
  ];

  const logoutMedia = {
    text: "Cerrar sesión",
    icon: loginIcon,
  };


  const CerrarSesion = () => {
    localStorage.removeItem("token")
    window.location.reload()
  }

  return (
    <div
      className={
        isExpanded
          ? "side-nav-container"
          : "side-nav-container side-nav-container-NX"
      }
    >
      <div className="nav-upper">
        <div className="nav-heading">
          {isExpanded && (
            <div className="nav-brand">
              <h2>SA-MN</h2>
            </div>
          )}
          <button
            className={
              isExpanded ? "hamburger hamburger-in" : "hamburger hamburger-out"
            }
            onClick={() => setExpendState(!isExpanded)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
        <div className="nav-menu">
          {menuItems.map(({ text, icon, ruta }, index) => (
            <Link
              className={isExpanded ? "menu-item" : "menu-item menu-item-NX"}
              to={ruta}
              key={index}
            >
              <img className="menu-item-icon" src={icon} alt=""/>
              {isExpanded && <p>{text}</p>}
            </Link>
          ))}
        </div>
      </div>
      <div className="nav-footer">
        {isExpanded && (
          <div className="nav-details">
            <div className="nav-footer-info">
            <button
              className={isExpanded ? "closeBtn" : "menu-item menu-item-NX"}
              onClick={() => CerrarSesion()}
            >
              <img className="menu-item-icon" src={logoutMedia.icon} alt="" />
              {isExpanded && <p>{logoutMedia.text}</p>}
            </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
