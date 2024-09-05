import { ConfigProvider, Spin, theme as antdTheme } from "antd";
import "dayjs/locale/zh-cn";
import "./i18n";
import { Suspense, useEffect } from "react";
import RenderRouter from "./routes";
// import { setGlobalState } from "./stores/global.store";
import useGlobalStore from "./stores/globalStore";

const App: React.FC = () => {
  // const { theme, loading } = useSelector((state: any) => state.GlobalStore);
  const GlobalStore = useGlobalStore();

  const setTheme = (dark = true) => {
    // dispatch(
    GlobalStore.setGlobalState({
      theme: dark ? "dark" : "light",
      loading: false,
    });
    // );
  };

  /** initial theme */
  useEffect(() => {
    setTheme(GlobalStore.initialState.theme === "dark");

    // watch system theme change
    if (!localStorage.getItem("theme")) {
      const mql = window.matchMedia("(prefers-color-scheme: dark)");

      function matchMode(e: MediaQueryListEvent) {
        setTheme(e.matches);
      }

      mql.addEventListener("change", matchMode);
    }
  }, []);

  return (
    <ConfigProvider
      componentSize="middle"
      theme={{
        token: { colorPrimary: "#13c2c2" },
        algorithm:
          GlobalStore.initialState.theme === "dark"
            ? antdTheme.darkAlgorithm
            : antdTheme.defaultAlgorithm,
      }}
    >
      <Suspense fallback={null}>
        <Spin
          spinning={GlobalStore.initialState.loading}
          className="app-loading-wrapper"
          style={{
            backgroundColor:
              GlobalStore.initialState.theme === "dark"
                ? "rgba(0, 0, 0, 0.44)"
                : "rgba(255, 255, 255, 0.44)",
          }}
          // tip={<LocaleFormatter id="gloabal.tips.loading" />}
        ></Spin>
        <RenderRouter />
      </Suspense>
      {/* <RenderRouter /> */}
    </ConfigProvider>
  );
};

export default App;
