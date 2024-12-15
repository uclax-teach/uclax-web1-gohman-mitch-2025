import axiosObj from "axios";

const axios = axiosObj.create({
    baseURL: import.meta.env.VITE_API_URL,
});

export default axios;
