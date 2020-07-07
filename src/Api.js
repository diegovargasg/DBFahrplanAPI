import axios from "axios";

const TOKEN = process.env.REACT_APP_API_TOKEN;
const APIURL = process.env.REACT_APP_API_URL;

export default axios.create({
  baseURL: APIURL,
  headers: { Authorization: `Bearer ${TOKEN}` },
});
