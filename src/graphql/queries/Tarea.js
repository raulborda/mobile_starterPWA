import { gql } from '@apollo/client';

export const GET_TAREAS = gql `
query getTareasIframe($idUsuario:Int,$filtroFecha:String,$fecha:String,$estado:Int,$idUsuarioFiltro:String,$idClienteFiltro:Int){
	getTareasIframeResolver(idUsuario:$idUsuario,filtroFecha:$filtroFecha,fecha:$fecha,estado:$estado,idUsuarioFiltro:$idUsuarioFiltro,idClienteFiltro:$idClienteFiltro)
  }
`;
