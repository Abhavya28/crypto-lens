import axios from "axios";

export const getChart = async (id: string, days: number) => {
  const res = await axios.get("/api/chart", {
    params: {
      id,
      days,
    },
  });

  return res.data;
};