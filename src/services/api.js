import axios from "axios";

const client = axios.create({
  baseURL: "https://happy-gold-shrimp.cyclic.cloud",
  timeout: 1000,
  headers: {
    Authorization: `Osama__${localStorage.getItem("token")}`,
  },
});

export default client;
