import { Link } from "react-router-dom";
import Navbar from "../../Components/Navbar/Navbar";
import "./Home.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cambiarInfo, limpiarState } from "../../Store/Slices";
import luna from '../../assets/icons/moon-line.svg'
import sol from '../../assets/icons/sun-line.svg'
import moment from 'moment';
import 'moment/locale/es';
import ToolTip from "../../Components/ToolTip/ToolTip";
import ProductosLayout from "../../Components/productosLayout/ProductosLayout";
import More from '../../assets/icons/add-line.svg'
import EmpleadosActivos from "../../Components/EmpleadosActivosLayout/EmpleadosActivos";


function Home() {
  const dispatch = useDispatch()
  
  const [conjuntos, setConjuntos] = useState([])
  const [saludo, setSaludo] = useState('');
  const [imagenSaludo, setImagenSaludo] = useState('');
  const [mostrarProductosLayout, setMostrarProductosLayout] = useState(false);
  const [mostrarEmpleadosLayout, setMostrarEmpleadosLayout] = useState(false);

  const empresaInfo = useSelector(state => state.negocioInfo)
  const token = localStorage.getItem("token")

  useEffect(() => {
    fetch("http://localhost:3000/api/home",{
      headers: {
        "Content-Type": "application/json",
        "authorization": `Bearer ${token}`,
        "Cache-Control": "no-cache",
        "Pragma": "no-cache"
      },
    })
    .then((data) => data.json())
    .then((response) => {
      dispatch(cambiarInfo(response.result))
      fetch(`http://localhost:3000/api/obtener_conjuntos/`, {
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

    moment.locale('es')
    const ActualizarHora = () => {

      const hora = moment().hour();

      if (hora >= 5 && hora < 12) {
        setSaludo('Buenos días');
        setImagenSaludo(sol)
      } else if (hora >= 12 && hora < 18) {
        setSaludo('Buenas tardes');
        setImagenSaludo(sol)
      } else {
        setSaludo('Buenas noches');
        setImagenSaludo(luna)
      }

    }

    ActualizarHora();
    const interval = setInterval(ActualizarHora, 60000);

    return () => {
      clearInterval(interval);
    };

  }, [])

  const handleMostrarProductosLayout = () => {
    setMostrarProductosLayout(!mostrarProductosLayout);
    if(mostrarProductosLayout === false){
      limpiarStateAlCerrar()
    }
  };

  const handleMostrarEmpleadoLayout = () => {
    setMostrarProductosLayout(!mostrarProductosLayout);
    setMostrarEmpleadosLayout(!mostrarProductosLayout);
    if(mostrarProductosLayout === false){
      limpiarStateAlCerrar()
    }
  };

  const limpiarStateAlCerrar = () => {
    dispatch(limpiarState([]))
  }

  const abrirMeseroLayout = () => {
    setMostrarEmpleadosLayout(!mostrarEmpleadosLayout);
  }


return (
    <div className="container">
      <Navbar />
      {mostrarProductosLayout && (
          <ProductosLayout cerrar={handleMostrarProductosLayout} abrirMesero={abrirMeseroLayout}/>
      )}
      {mostrarEmpleadosLayout && (
          <EmpleadosActivos cerrar={handleMostrarEmpleadoLayout} />
      )}
      <div className="content">
        <div className="saludo">
          <img src={imagenSaludo} alt="" />
          <h1 className="clarito">{saludo} {empresaInfo.nombreNegocio}</h1>
        </div>
        <div className="conjuntosContainer">
            <button onClick={handleMostrarProductosLayout} className="Conjunto Add">
                <img src={More} alt="" />
                <div className="tooltipContainer">
                  <ToolTip titulo="Agregar Productos" mensaje="Utiiza este boton para crear un nuevo conjunto de productos relacionado a un empleado"/>
                </div>
            </button>

            <div className="BarraSeparadora"></div>

            {conjuntos.length === 0 ? (
              <></>
            ) : (
              <button onClick={handleMostrarProductosLayout} className="Conjunto cantidad" >
                <p><b>Conjuntos activos: </b>{conjuntos.length}</p>
                
              </button>
            )}
        </div>
      </div>
    </div>
  );
}

export default Home;


// useEffect(() =>{
//   fetch(`http://localhost:3000/api/obtener_empleadosId/${id_empleado}`, {
//     headers: {
//       "Content-Type": "application/json",
//       "authorization": `Bearer ${token}`,
//       "Cache-Control": "no-cache",
//       "Pragma": "no-cache"
//     },
//   })
//   .then((data) => data.json())
//   .then((response) => {
//     setEmpleadoData(response.result[0])

//   })
//   .catch((err) => console.log(err))
// }, [])







// <div className="cardContainer">
// {dataEmpleados.length === 0 ? (
//   <h4 className="sinEmpleados">No hay empleados activos. <Link className="addEmpleado" to="/empleados">Active ahora</Link></h4>
// ) : (
//   dataEmpleados.map((empleado, index) => (
//     <Link
//       key={index}
//       className="card"
//       to={`/agregarConjunto/${empleado.id_mesero}`}
//     >
//       <img src={userLogo} alt="" />
//       <h2 className="clarito">{empleado.nombre_mesero}</h2>
//       <p className="clarito">C.C. {empleado.cedula}</p>
//       <p className="estado clarito">Estado: <p className="activo">{empleado.estado}</p></p>
//       <p className="estado clarito">Dinero que debe: <p className="activo">${empleado.total_que_debe}</p></p>
//       <ToolTip mensaje="Utilice este boton para agregar productos a la informacion del empleado" titulo="Empleado"/>
//     </Link>
//   ))
// )}
// </div>
