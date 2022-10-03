import { gql } from "@apollo/client";

export const GET_HISTORIAL_POR_NEGOCIO = gql`
  query getHistorialByNegocio($idNegocio: Int) {
    getHistorialByNegocioResolver(idNegocio: $idNegocio) {
      his_detalle
      eta_id
      his_etaprevia
      his_fechaupdate
      his_fechaprevia
      his_id
      usu_id
      usu_nombre
    }
  }
`;

export const GET_TIMELINE_POR_NEGOCIO = gql`
  query getTimeLineByNegocioResolver($idNegocio: Int, $estadoTarea: Int) {
    getTimeLineByNegocioResolver(idNegocio: $idNegocio, estadoTarea: $estadoTarea)
  }
`;