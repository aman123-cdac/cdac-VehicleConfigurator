import axios from "axios";

export const invoiceService = {
  generateInvoice(data) {
    return axios.post("http://localhost:8080/api/invoice/confirm", data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    });
  },
};
