import { gql } from "@apollo/client";

export const GET_TIPO_TAREA = gql`
  query getTiposTareas($idCategoria: Int) {
    getTiposTareaResolver(idCategoria: $idCategoria) {
      tip_id
      tip_desc
    }
  }
`;
