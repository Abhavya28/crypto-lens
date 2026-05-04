import axios from "axios";

export const getCoins = async (page = 1) => {
  const res = await axios.get(`/api/coins?page=${page}`);
  return res.data;
};
