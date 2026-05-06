export const getWatchlist = () => {
  if (typeof window === "undefined") return [];
  return JSON.parse(localStorage.getItem("watchlist") || "[]");
};

export const toggleWatchlist = (coin: any) => {
  let list = getWatchlist();

  const exists = list.find((c: any) => c.id === coin.id);

  if (exists) {
    list = list.filter((c: any) => c.id !== coin.id);
  } else {
    list.push(coin);
  }

  localStorage.setItem("watchlist", JSON.stringify(list));
  return list;
};