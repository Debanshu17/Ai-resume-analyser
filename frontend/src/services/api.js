import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "https://ai-resume-backend-brns.onrender.com"
});

export default api;