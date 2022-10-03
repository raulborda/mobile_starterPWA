import {
  UnorderedListOutline,
  UserOutline,
  SetOutline,
} from "antd-mobile-icons";
import { TabBar } from "antd-mobile";
import "./Menu.css";
import { useHistory, useLocation } from "react-router-dom";
import { useContext } from "react";
import { GlobalContext } from "../../context/GlobalContext";

const Menu = () => {
  let history = useHistory();
  const location = useLocation();
  const { pathname } = location;

  const { plataforma } = useContext(GlobalContext);

  const tabs = [
    {
      key: "/tareas",
      icon: <UnorderedListOutline />,
    },
    {
      key: "/clientes",
      icon: <UserOutline />,
    },
    {
      key: "/configuracion",
      icon: <SetOutline />,
    },
  ];
  return (
    <TabBar
      activeKey={pathname}
      onChange={(key) => history.push(key)}
      className={plataforma === "IPHONE" && "menu_tabs"}
    >
      {tabs.map((item) => (
        <TabBar.Item key={item.key} icon={item.icon} className="menu_items" />
      ))}
    </TabBar>
  );
};

export default Menu;
