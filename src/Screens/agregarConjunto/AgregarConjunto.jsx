import React, { useEffect, useState } from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import { useParams } from 'react-router-dom'

import More from '../../assets/icons/add-line.svg'
import './AgregarConjunto.css'
import ProductosLayout from '../../Components/productosLayout/ProductosLayout'
import { useDispatch } from 'react-redux'
import { limpiarState } from '../../Store/Slices'

export default function AgregarConjunto() {
  
  

  const token = localStorage.getItem("token")
  const { id_empleado } = useParams()

  const dispatch = useDispatch()





  return (
    <div className="container">
      <Navbar />
      <div className="content">
        <h2>Agregar Conjuntos al Empleado {empleadoData.nombre_mesero}</h2>

      </div>
    </div>
  )
}
