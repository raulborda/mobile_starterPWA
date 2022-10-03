/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
/* eslint-disable no-unused-vars */
import { Calendar, CapsuleTabs } from "antd-mobile";
import moment from "moment";
import ListaTarea from "../listaTareas/ListaTarea";
import { CalendarOutline } from "antd-mobile-icons";
import "./Tareas.css";
import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import { useQuery } from "@apollo/client";
import { GET_TAREAS } from "../../../graphql/queries/Tarea";
import { GET_TAREAS_CALENDARIO } from "../../../graphql/queries/TareaCalendario";
import QueryResult from "../../queryResult/QueryResult";
import { TareasSemana } from "../tareasSemana/TareasSemana";
import { TareasSemanaProxima } from "../tareasSemanaProxima/TareasSemanaProxima";
import { TareasVencidas } from "../tareasVencidas/TareasVencidas";


const Tareas = () => {
  const { tareas, setTareas, userId, setPollTareas } = useContext(GlobalContext);

  const [tareasCalendario, setTareasCalendario] = useState();
  const [activeKey, setActiveKey] = useState("1");

  /*Estados de consulta */
  const [filtroFecha, setFiltroFecha] = useState(moment().format("YYYY-MM-DD"));
  const [estado, setEstado] = useState(1);

  const { loading, error, data, startPolling, stopPolling } = useQuery(GET_TAREAS, {
    variables: {
      idUsuario: userId,
      filtroFecha: "date",
      fecha: filtroFecha,
      estado: estado,
      idUsuarioFiltro: "",
      idClienteFiltro: null,
    },
  });

  const { data: dataCalendario, } = useQuery(GET_TAREAS_CALENDARIO, {
    variables: {
      idUsuario: userId,
      fecha: "",
    },
  });

  const ordenarDatos = (tareas) => {
    let tareasOrdenadas;
    if (tareas) {
      tareasOrdenadas = tareas.sort(function (a, b) {
        return (
          new Date(
            moment(b.fechavencimiento, "DD/MM/YYYY").format("YYYY,MM,DD")
          ) -
          new Date(
            moment(a.fechavencimiento, "DD/MM/YYYY").format("YYYY,MM,DD")
          )
        );
      });
      setTareas(tareasOrdenadas);
    }
  };

  useEffect(() => {

    setPollTareas({inicial:startPolling, stop:stopPolling});

    if (data) {     
      ordenarDatos(JSON.parse(data.getTareasIframeResolver));

      console.log(JSON.parse(data.getTareasIframeResolver));
    }
  
    if (dataCalendario) {
      
      setTareasCalendario(
        JSON.parse(dataCalendario.getTareasParaCalendarioIframeResolver)
          .fechasVenc
      );
      console.log(JSON.parse(dataCalendario.getTareasParaCalendarioIframeResolver)
      .fechasVenc)

    }
  }, [data, dataCalendario]);

  const handleChange = (val) => {
    setFiltroFecha(moment(val).format("YYYY-MM-DD"));
  };

  useEffect(() => {}, [activeKey]);

  return (
    <CapsuleTabs
      className="capsule_contenedor"
      defaultActiveKey="1"
      onChange={(v) => setActiveKey(v)}
    >
      {/* PESTAÑA TAREAS HOY */}
      <CapsuleTabs.Tab title={<CalendarOutline />} key="1">
        {activeKey === "1" && (
          <>
            <div>
              <Calendar
                selectionMode="single"
                defaultValue={filtroFecha}
                renderLabel={
                  tareasCalendario &&
                  ((date) => {
                    let bandera = false;

                    tareasCalendario.map((tarea) => {
                      let fechaCalendario = moment(date).format("YYYY-MM-DD");

                      if (fechaCalendario === tarea.tar_vencimiento) {
                        return (bandera = true);
                      }
                    });

                    if (bandera === true) {
                      return (
                        <p
                          style={{
                            fontSize: "25px",
                            color: "#56b43c",
                            margin: "0px",
                          }}
                        >
                          •
                        </p>
                      );
                    }
                  })
                }
                onChange={(val) => handleChange(val)}
              />
            </div>
            <QueryResult loading={loading} error={error} data={tareas}>
              <div className="div_lista_calendario">
                {tareas && <ListaTarea itemListaTarea={tareas} />}
              </div>
            </QueryResult>
          </>
        )}
      </CapsuleTabs.Tab>

      <CapsuleTabs.Tab title="Semana" key="2">
        {activeKey === "2" && <TareasSemana />}
      </CapsuleTabs.Tab>

      <CapsuleTabs.Tab title="Semana Prox." key="3">
        {activeKey === "3" && <TareasSemanaProxima />}
      </CapsuleTabs.Tab>

      <CapsuleTabs.Tab title="Vencido" key="4">
        {activeKey === "4" && <TareasVencidas />}
      </CapsuleTabs.Tab>
    </CapsuleTabs>
  );
};

export default Tareas;
