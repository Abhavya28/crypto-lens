"use client"

import { useEffect, useState } from "react";
import { getCoinsList } from "../services/coinApi";
import { CoinListType } from "../types";
import Link from "next/link";
import LoadingUI from "./common/loadingUI";

const CoinList = () => {
    const [coins, setCoins] = useState<CoinListType[]>([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCoins = async () => {
            setLoading(true);
            const data = await getCoinsList(page);
            console.log(data);
            setCoins(data);
            setLoading(false);
        };
        fetchCoins();
    }, [page])

    if (loading) return <LoadingUI />;


    return (
        <section className="min-h-screen bg-[#0b1120] text-white p-6">
            <div className="max-w-6xl mx-auto">

                <h1 className="text-2xl font-bold mb-6">Top Cryptocurrencies</h1>

                <div className="bg-white/5 backdrop-blur rounded-xl overflow-hidden border border-white/10">

                    <div className="grid grid-cols-6 p-4 text-gray-400 text-sm border-b border-white/10">
                        <h1>#</h1>
                        <h1>Coin</h1>
                        <h1>Price</h1>
                        <h1>24h</h1>
                        <h1>Market Cap</h1>
                        <h1>Volume</h1>
                    </div>

                    {coins.map((coin) => (
                        <Link href={`/coin/${coin.id}`}>
                            <div
                                key={coin.id}
                                className="grid grid-cols-6 items-center p-4 border-b border-white/5 hover:bg-white/5 transition"
                            >
                                <p>{coin.market_cap_rank}</p>

                                <div className="flex items-center gap-3">
                                    <img src={coin.image} className="w-8 h-8" />
                                    <div>
                                        <p className="font-medium hover:underline underline-offset-2">{coin.name}</p>
                                        <p className="text-xs text-gray-400">
                                            {coin.symbol.toUpperCase()}
                                        </p>
                                    </div>
                                </div>

                                <p>$ {coin.current_price.toFixed(4)}</p>

                                <p
                                    className={
                                        coin.price_change_percentage_24h > 0
                                            ? "text-green-400"
                                            : "text-red-400"
                                    }
                                >
                                    {coin.price_change_percentage_24h !== null
                                        ? coin.price_change_percentage_24h.toFixed(2)
                                        : "N/A"}%
                                </p>

                                <p>$ {(coin.market_cap / 1e12).toFixed(2)} T</p>

                                <p>$ {(coin.total_volume / 1e9).toFixed(2)} B</p>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Pagination */}
                <div className="flex justify-center mt-6 gap-2">
                    <button
                        onClick={() => setPage(page - 1)}
                        className="px-3 py-1 bg-white/10 rounded disabled:opacity-50"
                        disabled={page === 1}
                    >
                        Prev
                    </button>

                    <p className="px-3 py-1">{page}</p>

                    <button
                        onClick={() => setPage(page + 1)}
                        className="px-3 py-1 bg-white/10 rounded"
                    >
                        Next
                    </button>
                </div>

            </div>
        </section>
    );
}

export default CoinList