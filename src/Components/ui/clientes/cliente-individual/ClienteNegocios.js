import { useQuery } from "@apollo/client";
import moment from "moment";
import { useContext, useEffect, useState } from "react";
import { GET_NEGOCIOS } from "../../../../graphql/queries/Negocio";
import { GlobalContext } from "../../../context/GlobalContext";
import QueryResult from "../../../queryResult/QueryResult";
import { ListaNegocios } from "../../negocios/ListaNegocios";

export const ClienteNegocios = ({ cliente }) => {
  const { userId } = useContext(GlobalContext);
  const [ negocios, setNegocios ] = useState();

  const { loading, error, data } = useQuery(GET_NEGOCIOS, {
    variables: {
      idPipeline: null,
      idEstado: 0,
      fechaDesde: null,
      fechaHasta: null,
      idUsuario: userId,
      tipoFecha: "creacion",
      listadoEtiquetas: { listaIdEtiqueta: [] },
      usuarioFiltro: null,
      idCliente: parseInt(cliente.cli_id),
    },
  });

  const ordenarDatos = (negs) => {
    let negociosOrdenados;
    if (negs) {
      negociosOrdenados = negs.sort(function (a, b) {
        return (
          new Date(
            moment(b.neg_fechacreacion, "YYYY-MM-DD").format("YYYY,MM,DD")
          ) -
          new Date(
            moment(a.neg_fechacreacion, "YYYY-MM-DD").format("YYYY,MM,DD")
          )
        );
      });
      setNegocios(negociosOrdenados);
    }
  };

  useEffect(() => {
    if (data) {
      // console.log(JSON.parse(data.getNegocioResolver).dataNeg);
      ordenarDatos(JSON.parse(data.getNegocioResolver).dataNeg);
      // ordenarDatos(JSON.parse(dataNegocios.getNegocioResolver));
    }
  }, [data]);

  useEffect(() => {
    // console.log(negocios);
  }, [negocios]);

  return (
    <QueryResult loading={loading} error={error} data={negocios}>
      <div className="div_lista_negocios">
        <ListaNegocios negocios={negocios} />
      </div>
    </QueryResult>
  );
};
