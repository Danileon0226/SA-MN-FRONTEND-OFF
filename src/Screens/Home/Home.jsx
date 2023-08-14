import { Link } from "react-router-dom";
import Navbar from "../../Components/Navbar/Navbar";
import "./Home.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cambiarInfo } from "../../Store/Slices";
import userLogo from '../../assets/icons/emotion-line.svg'
import luna from '../../assets/icons/moon-line.svg'
import sol from '../../assets/icons/sun-line.svg'
import moment from 'moment';
import 'moment/locale/es';
import ToolTip from "../../Components/ToolTip/ToolTip";


function Home() {
  const dispatch = useDispatch()
  const [dataEmpleados, setDataEmpleados] = useState([])
  const empresaInfo = useSelector(state => state.negocioInfo)
  const [saludo, setSaludo] = useState('');
  const [imagenSaludo, setImagenSaludo] = useState('');
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

return (
    <div className="container">
      <Navbar />
      <div className="content">
        <div className="saludo">
          <img src={imagenSaludo} alt="" />
          <h1 className="clarito">{saludo} {empresaInfo.nombreNegocio}</h1>
        </div>
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
                <ToolTip mensaje="Utilice este boton para agregar productos a la informacion del empleado" titulo="Empleado"/>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
