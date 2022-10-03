import "./listaNegocios.css";
import {
  UserOutline,
  ClockCircleOutline,
  ShopbagOutline,
} from "antd-mobile-icons";
import moment from "moment";
import { Popover } from "antd-mobile";
import { useHistory } from "react-router-dom";

export const ListaNegocios = ({ negocios }) => {

  let history = useHistory();

  let fechaActual = moment();

  const dateHandler = (fecha) => {
    let fechaParametro = moment(fecha, "YYYY-MM-DD");

    const diff = moment(fechaParametro).diff(fechaActual, "days");

    switch (true) {
      case diff <= 0:
        return "#F44336";
      case diff > 0 && diff <= 5:
        return "#faad14";

      default:
        return "#00b33c";
    }
  };

  const onCardClick = (id) => {
    let negocio = negocios.filter((negocio) => negocio.neg_id === id);

    return history.push({
      pathname: `/negocio-completo/${id}`,
      state: { ...negocio },
    });
  };

  return (
    <div className="contenedor-negocios-principal">
      <div className="contenedor-negocios">
        {negocios && negocios.map((negocio) => {
          return (
            <div
              className="card-negocio"
              key={negocio.neg_id}
              onClick={() => onCardClick(negocio.neg_id)}
            >
              <p className="card-negocio-asunto">{negocio.neg_asunto}</p>
              <p className="card-negocio-cliente">
                <span className="span-negocio-cliente">
                  <ShopbagOutline />
                </span>
                {negocio.cli_nombre}
              </p>
              <div className="card-negocio-footer">
                <p className="footer-importe">
                  {negocio.mon_iso +
                    " " +
                    negocio.neg_valor.toLocaleString("de-DE", {
                      minimumFractionDigits: 0,
                    })}
                </p>
                <div className="importe-iconos">
                  {negocio.con_nombre && (
                    <Popover
                      content={
                        <p className="popover-negocios">{negocio.con_nombre}</p>
                      }
                      trigger="click"
                      mode="dark"
                      placement="top-end"
                    >
                      <UserOutline />
                    </Popover>
                  )}
                  <Popover
                    content={
                      <p className="popover-negocios">{`Fecha de cierre: ${negocio.neg_fechacierreestimado}`}</p>
                    }
                    placement="top-end"
                    trigger="click"
                    mode="dark"
                  >
                    <ClockCircleOutline
                      style={{
                        marginLeft: "1rem",
                        color: dateHandler(negocio.neg_fechacierreestimado),
                      }}
                    />
                  </Popover>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
