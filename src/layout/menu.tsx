import type { FC, ReactElement } from "react";
import { Menu } from "antd";
import { useNavigate } from "react-router-dom";
// import { CustomIcon } from "./customIcon";
import {
  DashboardOutlined,
  BookOutlined,
  DollarOutlined,
} from "@ant-design/icons";

type MenuItem = {
  code: string;
  icon?: ReactElement;
  path: string;
  children?: MenuItem[];
};
type MenuList = MenuItem[];

type MenuProps = {
  openKey?: string;
  onChangeOpenKey: (key?: string) => void;
  selectedKey: string;
  onChangeSelectedKey: (key: string) => void;
};

const MenuComponent: FC<MenuProps> = (props) => {
  const { openKey, onChangeOpenKey, selectedKey, onChangeSelectedKey } = props;

  const navigate = useNavigate();

  const menuList: MenuList = [
    {
      code: "Dashboard",
      icon: <DashboardOutlined />,
      path: "/dashboard",
    },
    {
      code: "Projects",
      icon: <BookOutlined />,
      path: "/projects",
    },
    {
      code: "Estimations",
      icon: <DollarOutlined />,
      path: "/estimations",
    },
  ];

  const getTitle = (menu: MenuList[0]) => {
    return (
      <span style={{ display: "flex", alignItems: "center" }}>
        {menu.icon}
        <span>{menu.code}</span>
      </span>
    );
  };

  const onMenuClick = (path: string) => {
    onChangeSelectedKey(path);
    navigate(path);
  };

  const onOpenChange = (keys: string[]) => {
    const key = keys.pop();
    onChangeOpenKey(key);
  };

  return (
    <Menu
      mode="inline"
      selectedKeys={[selectedKey]}
      openKeys={openKey ? [openKey] : []}
      onOpenChange={onOpenChange}
      onSelect={(k) => onMenuClick(k.key)}
      className="layout-page-sider-menu text-2"
      items={menuList.map((menu) => {
        return menu.children
          ? {
              key: menu.code,
              label: getTitle(menu),
              children: menu.children.map((child) => ({
                key: child.path,
                label: child.code,
              })),
            }
          : {
              key: menu.path,
              label: menu.code,
            };
      })}
    ></Menu>
  );
};

export default MenuComponent;
