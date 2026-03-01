import axios from "axios";

const apiClient = axios.create({
    baseURL: 'http://localhost:8080/api',
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
