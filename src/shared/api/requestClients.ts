import axios from "axios";
import { BackendUrl } from "../constants/envVariables.ts";

export const ServerClient = axios.create({
    baseURL: BackendUrl,
});
