import axios from "axios";

export const getChart = async (id: string) => {
  const res = await axios.get(`/api/chart?id=${id}`);
  return res.data;
};
