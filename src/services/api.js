import axios from "axios";

const client = axios.create({
  baseURL: "https://mealappbackend.onrender.com/",
  timeout: 1000,
  headers: {
    Authorization: `Osama__${localStorage.getItem("token")}`,
  },
});

export default client;
