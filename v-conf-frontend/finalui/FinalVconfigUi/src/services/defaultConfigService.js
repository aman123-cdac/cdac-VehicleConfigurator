import apiClient from "../api/api";

export const defaultConfigService = {
  getDefaultConfiguration(modelId, qty) {
    return apiClient
      .get(`/api/default-config/${modelId}`, {
        params: { qty },
      })
      .then((res) => res.data);
  },
};
