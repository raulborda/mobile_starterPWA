import { gql } from '@apollo/client';

export const GET_USUARIOS = gql`
	query getUsuarios($input: String) {
		getUsuariosResolver(input: $input) {
			usu_id
			usu_nombre
		}
	}
`;
