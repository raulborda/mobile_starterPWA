import { useQuery } from "@apollo/client";
import moment from "moment";
import { useContext, useEffect, useState } from "react";
import { GET_TAREAS } from "../../../graphql/queries/Tarea";
import { GlobalContext } from "../../context/GlobalContext";
import QueryResult from "../../queryResult/QueryResult";
import ListaTarea from "../listaTareas/ListaTarea";

export const TareasSemanaProxima = () => {
  const [tareas, setTareas] = useState();
  const [estado ] = useState(1);

  const { userId } = useContext(GlobalContext);

  const b1 = moment().year();
  const a1 = moment().week();
  const nextWeek = Number(a1) + 1;
  const c1 = `${b1}${nextWeek}`;

  const { loading, error, data } = useQuery(GET_TAREAS, {
    variables: {
      idUsuario: userId,
      filtroFecha: "week",
      fecha: c1,
      estado: estado,
      idUsuarioFiltro: "",
      idClienteFiltro: null,
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
    if (data) {
      ordenarDatos(JSON.parse(data.getTareasIframeResolver));
    }
  }, [data]);

  return (
    <QueryResult
      loading={loading}
      error={error}
      data={tareas}
    >
      {tareas && (
        <div className="div_lista">
          <ListaTarea itemListaTarea={tareas} />
        </div>
      )}
    </QueryResult>
  );
};
