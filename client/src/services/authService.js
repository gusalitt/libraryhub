import api from "@/services/axios";

export const loginUser = async (data) => {
	const response = await api.post("/auth/login", data, { withCredentials: true });
	if (response.data?.token) {
		localStorage.setItem("authToken", response.data.token);
	}
	return response;
};

export const registerUser = async (data) => {
	const response = await api.post("/auth/register", data, { withCredentials: true });
	if (response.data?.token) {
		localStorage.setItem("authToken", response.data.token);
	}
	return response;
};

export const logoutUser = async () => {
    const response = await api.post("/auth/logout", {}, { withCredentials: true });
    if (response.status === 200 || response.data?.status === "success") {
        localStorage.removeItem("authToken");
    }
    return response;
}

export const me = async () => await api.get("/auth/me", { withCredentials: true });
