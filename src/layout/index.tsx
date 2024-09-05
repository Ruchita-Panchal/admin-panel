import { Layout, theme as antTheme } from "antd";
import type { FC } from "react";
import { Suspense, useState } from "react";
import { Outlet, useLocation } from "react-router";
import useUserStore from "../stores/userStore";
import HeaderComponent from "./header";
import "./index.less";
import MenuComponent from "./menu";

const { Sider, Content } = Layout;
// const WIDTH = 992;

const LayoutPage: FC = () => {
  const location = useLocation();
  const UserStore = useUserStore();
  const [openKey, setOpenkey] = useState<string>();
  const [selectedKey, setSelectedKey] = useState<string>(location.pathname);
  const token = antTheme.useToken();

  const toggle = () => {
    UserStore.setUserItem({
      collapsed: !UserStore.initialState.collapsed,
    });
  };

  return (
    <Layout className="layout-page">
      <HeaderComponent
        collapsed={UserStore.initialState.collapsed}
        toggle={toggle}
      />
      <Layout>
        <Sider
          className="layout-page-sider"
          trigger={null}
          collapsible
          style={{ backgroundColor: token.token.colorBgContainer }}
          collapsed={UserStore.initialState.collapsed}
          breakpoint="md"
        >
          <MenuComponent
            openKey={openKey}
            onChangeOpenKey={(k) => setOpenkey(k)}
            selectedKey={selectedKey}
            onChangeSelectedKey={(k) => setSelectedKey(k)}
          />
        </Sider>

        <Content className="layout-page-content">
          <Suspense fallback={null}>
            <Outlet />
          </Suspense>
        </Content>
      </Layout>
    </Layout>
  );
};

export default LayoutPage;
