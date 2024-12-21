import axiosObj from "axios";
import { config } from "@App/config";

const axios = axiosObj.create({
    baseURL: config.app.apiUrl,
});

export default axios;
