import axios from "axios";
import { Platform } from "react-native";

let API_URL = "http://localhost:3000";

export const api = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
});
