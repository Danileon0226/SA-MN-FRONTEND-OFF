import React, { useEffect, useState } from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import { useParams } from 'react-router-dom'

import More from '../../assets/icons/add-line.svg'
import './AgregarConjunto.css'
import ProductosLayout from '../../Components/productosLayout/ProductosLayout'
import { useDispatch } from 'react-redux'
import { limpiarState } from '../../Store/Slices'

export default function AgregarConjunto() {
  const [empleadoData, setEmpleadoData] = useState([])
  const [mostrarProductosLayout, setMostrarProductosLayout] = useState(false);
  const [conjuntos, setConjuntos] = useState([])

  const token = localStorage.getItem("token")
  const { id_empleado } = useParams()

  const dispatch = useDispatch()


  useEffect(() =>{
    fetch(`http://localhost:3000/api/obtener_empleadosId/${id_empleado}`, {
      headers: {
        "Content-Type": "application/json",
        "authorization": `Bearer ${token}`,
        "Cache-Control": "no-cache",
        "Pragma": "no-cache"
      },
    })
    .then((data) => data.json())
    .then((response) => {
      setEmpleadoData(response.result[0])
      fetch(`http://localhost:3000/api/obtener_conjuntos/${id_empleado}`, {
        headers: {
          "Content-Type": "application/json",
          "authorization": `Bearer ${token}`,
          "Cache-Control": "no-cache",
          "Pragma": "no-cache"
        },
      })
      .then((data) => data.json())
      .then((response) => setConjuntos(response.result))
      .catch((err) => console.log(err))
    })
    .catch((err) => console.log(err))
  }, [])

  const handleMostrarProductosLayout = () => {
    setMostrarProductosLayout(!mostrarProductosLayout);
    if(mostrarProductosLayout === false){
      limpiarStateAlCerrar()
    }
  };

  const limpiarStateAlCerrar = () => {
    dispatch(limpiarState([]))
  }


  return (
    <div className="container">
      <Navbar />
      {mostrarProductosLayout && (
        <ProductosLayout id_mesero={empleadoData.id_mesero} cerrar={handleMostrarProductosLayout}/>
      )}
      <div className="content">
        <h2>Agregar Conjuntos al Empleado {empleadoData.nombre_mesero}</h2>
        <div className="conjuntosContainer">
          <button onClick={handleMostrarProductosLayout} className="Conjunto Add" title='Crear un conjunto nuevo'>
              <img src={More} alt="" />
          </button>

          <div className="BarraSeparadora"></div>

          {conjuntos.length === 0 ? (
            <></>
          ) : (
            conjuntos.map((conjunto, index) => (
              <button key={index} onClick={handleMostrarProductosLayout} className="Conjunto PorPagar" title='Crear un conjunto nuevo'>
                <p>{conjunto.estado}</p>
                <p><b>A pagar: </b>${conjunto.valor_total_conjunto}</p>
              </button>
            ))
          )}

        </div>
      </div>
    </div>
  )
}
