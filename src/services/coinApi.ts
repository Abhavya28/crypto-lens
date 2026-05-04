import axios from "axios";

export const getCoinsList = async (page = 1) => {
  const res = await axios.get(`/api/coins?page=${page}`);
  return res.data;
};

export const getCoin = async (id: string) =>{
  const res  = await axios.get(`/api/coin?id=${id}`);
  return res.data;
};