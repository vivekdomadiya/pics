import axios from "axios";

export default axios.create({
  baseURL: "https://api.unsplash.com/",
  headers: {
    Authorization: "Client-ID J-Gq9L2pa4yT17cN0ZknmptH9ILo8zOTv4P0Ik-2Frg",
  },
});
