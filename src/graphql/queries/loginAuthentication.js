import { gql } from "@apollo/client";

export const LOGIN_AUTHENTICATION = gql`
    query loginAuth($credentials: credentialsInput) {
        loginIframeResolver(credentials: $credentials){
            status,
            message,
            idUser
        } 
    }
`;