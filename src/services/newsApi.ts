import axios from "axios";

export const getNews = async () => {
  const res = await axios.get("/api/news");
  return res.data;
};