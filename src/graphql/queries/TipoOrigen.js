import { gql } from "@apollo/client";

export const GET_TIPO_ORIGEN = gql`
  query getOrigen {
    getOrigenesResolver {
      ori_id
      ori_desc

    }
  }
`;
