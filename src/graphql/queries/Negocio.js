import { gql } from "@apollo/client";

export const GET_NEGOCIOS = gql`
  query getNegocios(
    $idPipeline: Int
    $idEstado: Int
    $fechaDesde: String
    $fechaHasta: String
    $idUsuario: Int
    $tipoFecha: String
    $listadoEtiquetas: listaEtiquetas
    $usuarioFiltro: Int
    $idCliente: Int
  ) {
    getNegocioResolver(
      idPipeline: $idPipeline
      idEstado: $idEstado
      fechaDesde: $fechaDesde
      fechaHasta: $fechaHasta
      idUsuario: $idUsuario
      tipoFecha: $tipoFecha
      listadoEtiquetas: $listadoEtiquetas
      usuarioFiltro: $usuarioFiltro
      idCliente: $idCliente
    )
  }
`;
