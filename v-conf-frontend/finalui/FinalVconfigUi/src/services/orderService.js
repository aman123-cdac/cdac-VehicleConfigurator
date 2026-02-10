import API from "../api/api";

export const orderService = {
  confirmOrder() {
    return API.post("/api/orders/confirm").then((res) => res.data);
  },
};
