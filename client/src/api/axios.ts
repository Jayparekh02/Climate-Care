// src/api/axios.js
import axios from "axios";
import { store } from "../app/store";
import { logout } from "../features/auth/loginSlice";

const instance = axios.create({
  baseURL: "http://localhost:4000",
});

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      store.dispatch(logout());
    }
    return Promise.reject(error);
  }
);

export default instance;
