import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../Components/Navbar/Navbar";
import "./Home.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cambiarInfo } from "../../Store/Slices";
import userLogo from '../../assets/icons/user-5-line.svg'

function Home() {
  const dispatch = useDispatch()
  const [dataEmpleados, setDataEmpleados] = useState([])
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
      fetch("http://localhost:3000/api/obtener_empleados/activos",{
        headers: {
          "Content-Type": "application/json",
          "authorization": `Bearer ${token}`,
          "Cache-Control": "no-cache",
          "Pragma": "no-cache"
        },
      })
      .then((data) => data.json())
      .then((response) => setDataEmpleados(response.result))
      .catch((err) => console.log(err))
    })
    .catch((err) => console.log(err))
  }, [])

return (
    <div className="container">
      <Navbar />
      <div className="content">
        <h1 className="clarito">Bienvenido {empresaInfo.nombreNegocio}</h1>
        <div className="cardContainer">
          {dataEmpleados.length === 0 ? (
            <h4 className="sinEmpleados">No hay empleados activos. <Link className="addEmpleado" to="/empleados">Active ahora</Link></h4>
          ) : (
            dataEmpleados.map((empleado, index) => (
              <Link
                key={index}
                className="card"
                to={`/agregarConjunto/${empleado.id_mesero}`}
              >
                <img src={userLogo} alt="" />
                <h2 className="clarito">{empleado.nombre_mesero}</h2>
                <p className="clarito">C.C. {empleado.cedula}</p>
                <p className="estado clarito">Estado: <p className="activo">{empleado.estado}</p></p>
                <p className="estado clarito">Dinero que debe: <p className="activo">${empleado.total_que_debe}</p></p>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
