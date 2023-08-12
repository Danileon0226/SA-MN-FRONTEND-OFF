import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./Login.css";

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    const body = {
      usuario: username,
      contraseña: password,
    };

    fetch("http://localhost:3000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((data) => data.json())
      .then((response) => {
        if (response && response.token) {
          localStorage.setItem("token", response.token)
          navigate("/Inicio");
        } else {
          console.log("Usuario no registrado.");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="background">
        <div className="shape"></div>
        <div className="shape"></div>
        <form className="login-form" onSubmit={handleLogin}>
          <h3>SA-MN</h3>
          <label htmlFor="username">Usuario</label>
          <input
            type="text"
            placeholder="Nombre de usuario"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            placeholder="Contraseña"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="mt-4" type="submit">
            Iniciar Sesión
          </button>
          <div className="social"></div>
        </form>
      </div>
    </>
  );
}

export default Login;
