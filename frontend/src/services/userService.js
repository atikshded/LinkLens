import api from "./api";

export const getProfile = async () => {
    const response = await api.get("/users/me");
    return response.data;
};

export const getStats = async () => {
    const response = await api.get("/users/stats");
    return response.data;
};

export const deleteAccount = async () => {
    await api.delete("/users/me");
};