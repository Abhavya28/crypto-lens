"use client";

import { useEffect, useState } from "react";
import { Star } from "lucide-react";
import { getWatchlist, toggleWatchlist } from "@/src/utils/watchlist";

const StarButton = ({ coin, onUpdate }: { coin: any; onUpdate?: () => void }) => {
  const [active, setActive] = useState(false);

  useEffect(() => {
    const list = getWatchlist();
    setActive(list.some((c: any) => c.id === coin.id));
  }, [coin.id]);

  const handleClick = () => {
    const updated = toggleWatchlist(coin);
    setActive(updated.some((c: any) => c.id === coin.id));
    if (onUpdate) onUpdate();
  };

  return (
    <Star
      onClick={handleClick}
      className={`cursor-pointer transition ${active ? "text-yellow-400 fill-yellow-400" : "text-gray-400"
        }`}
      size={28}
    />
  );
};

export default StarButton;