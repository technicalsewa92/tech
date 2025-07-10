import axios from "axios";

export const AxiosCorsInstance = axios.create({
    baseURL: "api/https://www.technicalsewa.com/techsewa",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  })