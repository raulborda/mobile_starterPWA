import { Route, Redirect, useLocation } from "react-router-dom";
import useAuth from "../../auth/useAuth";

export default function PublicRoute({ component: Component, ...rest }) {
  const auth = useAuth();
  const location = useLocation();

  //* De esta manera aseguro que se quiere acceder a login o recuperar estando logeado. Por lo tanto redirigo al Home, caso contrario es una navegacion normal.
  let estado;
  if (location.pathname === "/" || location.pathname === "/recuperar") {
    estado = true;
  } else estado = false;

  return (
    <div>
      {estado && auth.isLogged() ? (
        <Redirect to={{ pathname: "/home", state: { from: location } }} />
      ) : (
        <Route {...rest}>
          <Component />
        </Route>
      )}
    </div>
  );
}
