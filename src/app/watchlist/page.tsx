"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { getWatchlist } from "@/src/utils/watchlist";
import StarButton from "@/src/components/common/starButton";
import RefreshButton from "@/src/components/common/refreshButton";

const Watchlist = () => {
  const [coins, setCoins] = useState<any[]>([]);
  const [marketData, setMarketData] = useState<any[]>([]);

  const loadWatchlist = () => {
    const list = getWatchlist();
    setCoins(list);
  };

  useEffect(() => {
    loadWatchlist();
  }, []);

  useEffect(() => {
    const fetchPrices = async () => {
      if (coins.length === 0) return;

      const ids = coins.map((c) => c.id).join(",");

      try {
        const res = await axios.get(
          `https://api.coingecko.com/api/v3/coins/markets`,
          {
            params: {
              vs_currency: "usd",
              ids,
            },
          }
        );

        setMarketData(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchPrices();
  }, [coins]);

  return (
    <section className="min-h-screen bg-[#0b1120] text-white p-6">

      <div className="max-w-6xl mx-auto">

        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold mb-6">
            My Watchlist
          </h1>
          <RefreshButton />
        </div>

        {coins.length === 0 ? (
          <p className="text-gray-400">No coins added yet</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">

            {marketData.map((coin) => (
              <div
                key={coin.id}
                className="p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition"
              >
                <div className="flex items-center justify-between">

                  {/* Left */}
                  <Link href={`/coin/${coin.id}`} className="flex items-center gap-3">
                    <img src={coin.image} className="w-8 h-8" />

                    <div>
                      <p className="font-semibold">
                        {coin.name}
                      </p>
                      <span className="text-xs text-gray-400 uppercase">
                        {coin.symbol}
                      </span>
                    </div>
                  </Link>

                  <StarButton
                    coin={{
                      id: coin.id,
                      name: coin.name,
                      symbol: coin.symbol,
                      thumb: coin.image,
                    }}
                    onUpdate={loadWatchlist}
                  />

                </div>

                <div className="mt-4 flex items-center justify-between">

                  <p className="text-lg font-bold">
                    ${coin.current_price.toLocaleString()}
                  </p>

                  <p
                    className={`text-sm font-semibold ${coin.price_change_percentage_24h > 0
                      ? "text-green-400"
                      : "text-red-400"
                      }`}
                  >
                    {coin.price_change_percentage_24h?.toFixed(2)}%
                  </p>

                </div>

              </div>
            ))}

          </div>
        )}

      </div>

    </section>
  );
};

export default Watchlist;