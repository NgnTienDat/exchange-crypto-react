import axios from "axios";
import { BASE_URL } from "./Url";

export const API = axios.create({
  baseURL: BASE_URL,
});

export const AUTH_REQUEST = axios.create({
  baseURL: BASE_URL,
});
