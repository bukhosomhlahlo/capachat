import axios from "axios";

const baseURL = "http://localhost:5000"; // Adjust the port if necessary

const instance = axios.create({
  baseURL: baseURL,
});

export default instance;