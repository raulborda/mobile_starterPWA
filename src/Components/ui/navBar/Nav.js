/* eslint-disable no-unused-vars */
import React, { useContext, useRef } from "react";
import { Dialog, Image, Modal, NavBar, Space } from "antd-mobile";
import { MoreOutline, AddOutline } from "antd-mobile-icons";
import { useHistory } from "react-router-dom";
import "./Nav.css";
import useAuth from "../../../auth/useAuth";
import { GlobalContext } from "../../context/GlobalContext";
import { removeDataInStorage } from "../../storage/manageStorage";
import duo from "../login/logo-crm-prod.svg";

const Nav = ({ titulo, modo }) => {
  let history = useHistory();
  const auth = useAuth();
  const { setUserData, setLogoutAlert, logoutAlert, userId } =
    useContext(GlobalContext);

  const handleModalSalir = () => {
    setUserData({});
    removeDataInStorage("userInfo");
    setLogoutAlert(false);
    history.push("/");
    auth.logout();
  };

  const handleModalCrearTarea = () => {
    history.push("/nuevatarea");
  };


  const right = (
    <div style={{ fontSize: 24 }}>
      <Space style={{ "--gap": "16px" }}>
        <AddOutline
          color="#56b43c"
          onClick={() => handleModalCrearTarea()}
        />
        <MoreOutline
          style={{ transform: "rotate(90deg)" }}
          color="#56b43c"
          onClick={async () => {
            await Dialog.confirm({
              content: "¿Cerrar Sesión?",
              cancelText: "Cancelar",
              confirmText: "Cerrar",
              onConfirm: handleModalSalir,
            });
          }}
        />
      </Space>
    </div>
  );

  if (modo === "sinBack") {
    return (
      <NavBar className="navBar" right={right} backArrow={false}>
        {titulo ? (
          titulo
        ) : (
          null
          // <Image src={duo} width={100} height={50} style={{}} />
          
        )}
      </NavBar>
    );
  } else if (modo === "sinOp") {
    return (
      <NavBar className="navBar" onBack={() => history.goBack()}>
        {titulo ? (
          titulo
        ) : (
          null
          // <Image src={duo} width={100} height={50} style={{}} />
        )}
      </NavBar>
    );
  } else {
    return (
      <NavBar className="navBar" right={right} onBack={() => history.goBack()}>
        {titulo ? (
          titulo
        ) : (
          null
          // <Image src={duo} width={100} height={50} style={{}} />
        )}
      </NavBar>
    );
  }
};

export default Nav;
