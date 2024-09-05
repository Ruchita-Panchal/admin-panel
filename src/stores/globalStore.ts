import { create } from "zustand";

interface GlobalState {
  theme: "light" | "dark";
  loading: boolean;
}

interface UserGlobalStore {
  initialState: GlobalState;
  setGlobalState: (payload: any) => void;
}

const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
  ? "dark"
  : "light";
const userTheme = localStorage.getItem("theme") as GlobalState["theme"];

const initialState: GlobalState = {
  theme: userTheme || systemTheme,
  loading: false,
};

const useGlobalStore = create<UserGlobalStore>((set) => ({
  initialState: initialState,
  setGlobalState: (payload: any) => {
    set((state) => ({ initialState: { ...state, ...payload } }));
  },
}));

export default useGlobalStore;
