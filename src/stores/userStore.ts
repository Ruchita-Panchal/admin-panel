import { create } from "zustand";

type Role = "Guest" | "Admin";
type UserState = {
  username: string;
  token: string;
  logged: boolean;
  collapsed: boolean;
  role: Role;
};

interface UserStore {
  initialState: UserState;
  setUserItem: (payload: any) => void;
}

const initialState: UserState = {
  logged: localStorage.getItem("t") ? true : false,
  token: "",
  username: localStorage.getItem("username") || "",
  collapsed: false,
  role: (localStorage.getItem("username") || "") as Role,
};

const useUserStore = create<UserStore>((set) => ({
  initialState: initialState,
  setUserItem: (payload: any) => {
    set((state) => ({ initialState: { ...state, ...payload } }));
  },
}));

export default useUserStore;
