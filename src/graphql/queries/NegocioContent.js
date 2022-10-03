import { gql } from "@apollo/client";

export const GET_NEGOCIO_CONTENT = gql`
  query getNegocioById($idNegocio: Int) {
    getNegocioByIdResolver(idNegocio: $idNegocio)
  }
`;

export const GET_COUNT_TAREAS = gql`
query tiposTareasCantidad($idNegocio:Int){
    tiposTareasCantidadResolver(idNegocio:$idNegocio){
      tip_id
      tip_desc
      cantidadTipoTarea
      porcentajeTipoTarea
    }
  }
`;