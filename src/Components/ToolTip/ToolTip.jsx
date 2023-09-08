import icon from "../../assets/icons/error-warning-line.svg";
import "./ToolTip.css";

export default function ToolTip({ titulo, mensaje }) {
    return (
        <div className="icono">
            <img className="imgIcon" src={icon} alt="" />
            <div className="mensajeContainer">
                <h3 className="tooltipTitulo">{titulo}</h3>
                <span>{mensaje}</span>
            </div>
        </div>
    );
}
