import axios from "axios";

/* =====================================================
   AXIOS INSTANCE
===================================================== */
const apiClient = axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: false, // IMPORTANT: ignore OAuth for now
});

/* =====================================================
   VEHICLE SERVICE
===================================================== */
export const vehicleService = {
  /* -------------------------------------
     MODELS (Welcome Page)
     Controller: VehicleDetailController
     @RequestMapping("/vehicaldetail")
  ------------------------------------- */
  getModels: async () => {
    const res = await apiClient.get("/vehicaldetail/models");
    return res.data;
  },

  getModelDetails: async (modelId) => {
    const res = await apiClient.get(`/api/models/${modelId}`);
    return res.data;
  },

  /* -------------------------------------
     COMPONENTS (Configurator)
     Controller: VehicleConfigController
     @RequestMapping("/vehicle")
  ------------------------------------- */
  getStandard: async (modelId) => {
    const res = await apiClient.get(`/vehicle/${modelId}/standard`);
    return res.data;
  },

  getInterior: async (modelId) => {
    const res = await apiClient.get(`/vehicle/${modelId}/interior`);
    return res.data;
  },

  getExterior: async (modelId) => {
    const res = await apiClient.get(`/vehicle/${modelId}/exterior`);
    return res.data;
  },

  getAccessories: async (modelId) => {
    const res = await apiClient.get(`/vehicle/${modelId}/accessories`);
    return res.data;
  },

  /* -------------------------------------
     SAVE CONFIGURATION
     Controller: AlternateComponentController
     @RequestMapping("/api/alternate-component")
  ------------------------------------- */
  saveConfiguration: async (payload) => {
    /**
     * payload format:
     * {
     *   modelId: 1,
     *   components: [
     *     { compId: 10, altCompId: 21 },
     *     { compId: 11, altCompId: 35 }
     *   ]
     * }
     */
    const res = await apiClient.post("/api/alternate-component/save", payload);
    return res.data;
  },

  // OPTIONAL ALIAS (prevents future bugs)
  saveAlternateComponents: async (payload) => {
    const res = await apiClient.post("/api/alternate-component/save", payload);
    return res.data;
  },
};
