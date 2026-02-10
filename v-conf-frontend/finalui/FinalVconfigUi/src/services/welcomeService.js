import axios from "axios";

const API = "http://localhost:8080/api/welcome";

export const welcomeService = {
  getSegments: async () => {
    const res = await axios.get(`${API}/segments`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return res.data;
  },

  getManufacturers: async (segId) => {
    const res = await axios.get(`${API}/manufacturers/${segId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return res.data;
  },

  getModels: async (mfgId, segId) => {
    const res = await axios.get(`${API}/models?mfgId=${mfgId}&segId=${segId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return res.data;
  },
};
