import axios from "axios";

const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: {
        'Content-Type': 'application/ld+json',
        'Accept': 'application/ld+json',
    }
});

export const setAuthToken = (jwt?: string | null) => {
    if (jwt) {
        apiClient.defaults.headers.common.Authorization = `Bearer ${jwt}`;
    } else {
        delete apiClient.defaults.headers.common.Authorization;
    }
};

export default apiClient;
