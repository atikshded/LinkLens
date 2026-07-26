import api from "./api";

export const getVariants = async (linkId) => {
    const response = await api.get(`/links/${linkId}/variants`);
    return response.data;
};

export const createVariant = async (linkId, payload) => {
    const response = await api.post(`/links/${linkId}/variants`, payload);
    return response.data;
};

export const updateVariant = async (linkId, variantId, payload) => {
    const response = await api.put(
        `/links/${linkId}/variants/${variantId}`,
        payload
    );
    return response.data;
};

export const deleteVariant = async (linkId, variantId) => {
    const response = await api.delete(
        `/links/${linkId}/variants/${variantId}`
    );
    return response.data;
};