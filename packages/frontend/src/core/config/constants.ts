export const APP_CONSTANTS = {
  ROUTES: {
    LOGIN: "/login",
    REGISTER: "/register",
    DASHBOARD: "/dashboard",
    HOME: "/",
  },
  API: {
    BASE_URL: import.meta.env.VITE_API_URL,
    ENDPOINTS: {
      AUTH: {
        LOGIN: "/auth/login",
        REGISTER: "/auth/register",
      },
      PHISHING: {
        SEND: "/phishing/send",
        LIST: "/phishing",
      },
    },
  },
  STORAGE_KEYS: {
    TOKEN: "token",
  },
};

export type ApiEndpoints = typeof APP_CONSTANTS.API.ENDPOINTS;
