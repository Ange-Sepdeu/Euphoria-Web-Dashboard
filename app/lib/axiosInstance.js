import axios from "axios";

const axiosInstance = axios.create({
    baseUrl: "http://localhost:5000",
    headers: {
        "Content-Type": "application/json"
    }
});

export default axiosInstance;