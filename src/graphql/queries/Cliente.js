import { gql } from "@apollo/client";

export const GET_CLIENTE = gql`
  query getClientes($input: String, $idUsuario: Int) {
    getClientesLimitResolver(input: $input, idUsuario: $idUsuario){
      cli_id
      cli_nombre
      cli_telefono1
      cli_email1
    }
  }
`;
