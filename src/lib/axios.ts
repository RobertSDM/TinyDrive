import axios from "axios";
import { BackendURL as BackendURL } from "@/constants.ts";

export const axiosClient = axios.create({
    baseURL: BackendURL,
});
