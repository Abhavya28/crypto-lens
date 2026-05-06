import axios from "axios";

export const getCoinsList = async (page = 1) => {
  const res = await axios.get("/api/coins", {
    params: {
      page,
    },
  });

  return res.data;
};

export const getCoin = async (id: string) => {
  const res = await axios.get("/api/coin", {
    params: {
      id,
    },
  });

  return res.data;
};