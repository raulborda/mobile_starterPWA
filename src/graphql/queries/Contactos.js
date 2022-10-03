import { gql } from "@apollo/client";

export const GET_CONTACTO = gql`
  query getContactos($id: Int) {
    getContactosResolver(id:$id){
      con_id
      con_nombre
      con_telefono1
      con_email1
    }
  }
`;