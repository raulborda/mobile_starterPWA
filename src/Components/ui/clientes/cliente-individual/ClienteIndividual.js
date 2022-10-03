/* eslint-disable react-hooks/exhaustive-deps */
import { CapsuleTabs } from "antd-mobile";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import InfoCliente from "../../infoCliente/InfoCliente";
import { ClienteTareas } from "./ClienteTareas";
import "./clienteIndividual.css";
import { ClienteNegocios } from "./ClienteNegocios";

export const ClienteIndividual = () => {
  const [activeKey, setActiveKey] = useState("1");

  const location = useLocation();

  useEffect(() => {}, [activeKey]);

  return (
    <CapsuleTabs
      className="contenedor-cliente-individual"
      onChange={(v) => setActiveKey(v)}
    >
      <CapsuleTabs.Tab title="Info" key="1">
        {activeKey === "1" && <InfoCliente clienteSelect={location.state[0]} />}
      </CapsuleTabs.Tab>
      <CapsuleTabs.Tab title="Tareas" key="2">
        {activeKey === "2" && <ClienteTareas cliente={location.state[0]} />}
      </CapsuleTabs.Tab>
      <CapsuleTabs.Tab title="Negocios" key="3">
        {activeKey === "3" && <ClienteNegocios cliente={location.state[0]} />}
      </CapsuleTabs.Tab>
    </CapsuleTabs>
  );
};
