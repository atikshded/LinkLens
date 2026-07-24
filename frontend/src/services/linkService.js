import api from "./api";

export const createLink = async (data) => {
  const response = await api.post("/links", data);
  return response.data;
};

export const getMyLinks = async () => {
  const response = await api.get("/links");
  return response.data;
};

export const deleteLink = async (id) => {
  const response = await api.delete(`/links/${id}`);
  return response.data;
};

export const getLinkDetails = async (id) => {
  const response = await api.get(`/links/${id}`);
  return response.data;
};

export const getAnalytics = async (id) => {
  const response = await api.get(`/links/${id}/analytics`);
  return response.data;
};

export const getDailyClicks = async (id) => {
  const response = await api.get(`/links/${id}/daily-clicks`);
  return response.data;
};

export const getQRCode = async (id) => {
  return `${api.defaults.baseURL}/links/${id}/qr`;
};