import { gql } from "@apollo/client";

export const GET_TAREAS_MOBILE = gql`
  query getTareasPropias($idUsuario: Int) {
    getTareasMobileResolver(idUsuario: $idUsuario)
  }
`;
