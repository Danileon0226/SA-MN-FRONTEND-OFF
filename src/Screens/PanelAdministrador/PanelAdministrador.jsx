import React, { useState, useEffect } from "react";
import "./PanelAdministrador.css";
import Navbar from "../../Components/Navbar/Navbar";

function PanelAdministrador() {
  const token = localStorage.getItem("token");
  const [productos, setProductos] = useState([]);
  const [data2, setData2] = useState(null);
  const [data3, setData3] = useState(null);

  const fetchData1 = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/obtener_productos",
        {
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
            "Cache-Control": "no-cache",
            Pragma: "no-cache",
          },
        }
      );
      const jsonData = await response.json();
      setProductos(jsonData.result);
    } catch (error) {
      console.error("Error", error);
    }
  };

  const fetchData2 = async () => {
    try {
      const response = await fetch("URL_DEL_ENDPOINT_2");
      const jsonData = await response.json();
      setData2(jsonData);
    } catch (error) {
      console.error("Error", error);
    }
  };

  const fetchData3 = async () => {
    try {
      const response = await fetch("URL_DEL_ENDPOINT_3");
      const jsonData = await response.json();
      setData3(jsonData);
    } catch (error) {
      console.error("Error", error);
    }
  };

  return (
    <div className="container">
      <Navbar />
      <div className="title">
        <h1>Panel de Administración</h1>
      </div>
      <div className="consults">
        <div className="content">
          <h2>Endpoint 1 Data</h2>
          <button className="btn" onClick={fetchData1}>
            Consultar Endpoint 1
          </button>
          <pre>{JSON.stringify(productos, null, 2)}</pre>
        </div>
        <div className="content">
          <h2>Endpoint 2 Data</h2>
          <button className="btn" onClick={fetchData2}>
            Consultar Endpoint 2
          </button>
          <pre>{JSON.stringify(data2, null, 2)}</pre>
        </div>
        <div className="content">
          <h2>Endpoint 3 Data</h2>
          <button className="btn" onClick={fetchData3}>
            Consultar Endpoint 3
          </button>
          <pre>{JSON.stringify(data3, null, 2)}</pre>
        </div>
      </div>
    </div>
  );
}

export default PanelAdministrador;
