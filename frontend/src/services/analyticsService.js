import api from "./api";

export const getAnalytics = async (linkId) => {
  const response = await api.get(`/links/${linkId}/analytics`);
  return response.data;
};

export const getDailyClicks = async (linkId) => {
  const response = await api.get(`/links/${linkId}/daily-clicks`);
  return response.data;
};

export const getQRCode = (linkId) => {
  return `${api.defaults.baseURL}/links/${linkId}/qr`;
};

export const getVariantPerformance = async (linkId) => {
    const response = await api.get(
        `/links/${linkId}/variants`
    );
    return response.data;
};

export const getAiSummary = async (linkId) => {
    const response = await api.get(`/links/${linkId}/ai-summary`);
    return response.data;
};