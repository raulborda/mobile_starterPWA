import { gql } from '@apollo/client';

export const GET_TAREAS_CALENDARIO = gql`
  query getTareasParaCalendarioIframeResolver($idUsuario: Int, $fecha: String) {
    getTareasParaCalendarioIframeResolver(idUsuario: $idUsuario, fecha: $fecha)
  }
`;