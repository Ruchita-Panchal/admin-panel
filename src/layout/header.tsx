import {
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  MoonOutlined,
  SunOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { theme as antTheme, Dropdown, Layout, Tooltip } from "antd";
import type { FC } from "react";
import { useNavigate } from "react-router-dom";
import ReactSvg from "../assets/logo/react.svg";
import useGlobalStore from "../stores/globalStore";
import useUserStore from "../stores/userStore";
import { Avatar, Badge, Space } from "antd";

const { Header } = Layout;
interface HeaderProps {
  collapsed: boolean;
  toggle: () => void;
}
const HeaderComponent: FC<HeaderProps> = ({ collapsed, toggle }) => {
  const UserStore = useUserStore();
  const GlobalStore = useGlobalStore();
  const navigate = useNavigate();
  const token = antTheme.useToken();

  const onLogoutClick = async () => {
    localStorage.clear();
    let Obj = {
      logged: false,
    };
    UserStore.setUserItem(Obj);
    navigate("/login");
    return;
  };

  const toLogin = () => {
    navigate("/login");
  };

  const onChangeTheme = () => {
    const newTheme =
      GlobalStore.initialState.theme === "dark" ? "light" : "dark";
    localStorage.setItem("theme", newTheme);
    // dispatch(
    GlobalStore.setGlobalState({
      theme: newTheme,
      loading: false,
    });
    // );
  };

  return (
    <Header
      className="layout-page-header bg-2"
      style={{ backgroundColor: token.token.colorBgContainer }}
    >
      <div className="logo" style={{ width: collapsed ? 80 : 200 }}>
        <img
          src={ReactSvg}
          alt=""
          style={{ marginRight: collapsed ? "2px" : "20px" }}
        />
      </div>
      <div className="layout-page-header-main">
        <div onClick={toggle}>
          <span id="sidebar-trigger">
            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </span>
        </div>
        <div className="actions">
          <Tooltip title={`Toggle theme`}>
            <span onClick={onChangeTheme}>
              {GlobalStore.initialState.theme === "dark" ? (
                <SunOutlined />
              ) : (
                <MoonOutlined />
              )}
            </span>
          </Tooltip>

          {UserStore.initialState.logged ? (
            <Dropdown
              menu={{
                items: [
                  {
                    key: "1",
                    icon: <UserOutlined />,
                    label: (
                      <span onClick={() => navigate("/dashboard")}>
                        Account
                      </span>
                    ),
                  },
                  {
                    key: "2",
                    icon: <LogoutOutlined />,
                    label: <span onClick={() => onLogoutClick()}>Logout</span>,
                  },
                ],
              }}
            >
              <span className="user-action">
                <span
                  style={{ marginRight: "1px" }}
                >{`${UserStore.initialState.username} `}</span>
                <Badge className="user-avator">
                  <Avatar
                    shape="square"
                    style={{ backgroundColor: "#87d068" }}
                    icon={<UserOutlined />}
                  />{" "}
                </Badge>
              </span>
            </Dropdown>
          ) : (
            <span style={{ cursor: "pointer" }} onClick={toLogin}>
              Login
            </span>
          )}
        </div>
      </div>
    </Header>
  );
};

export default HeaderComponent;
