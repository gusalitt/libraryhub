import axios from "axios";

const api = axios.create({
	baseURL: import.meta.env.VITE_API_BASE_URL,
	withCredentials: true,
	headers: {
		Authorization: `Bearer ${localStorage.getItem('authToken') || ''}`,
	}
});

api.interceptors.response.use(
	(response) => response,
	(error) => {
		if (error.response?.status === 401) {
			console.warn("Unauthorized, redirecting...");
		}
		return Promise.reject(error);
	}
);

export default api;
