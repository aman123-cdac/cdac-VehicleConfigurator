import API from "../api/api";

export const authService = {
  signIn(data) {
    return API.post("/auth/login", data);
  },

  register(data) {
    return API.post("/api/auth/register", data);
  },

  oauthRedirect(code) {
    return API.get(`/oauth2/redirect?code=${code}`);
  },
};
