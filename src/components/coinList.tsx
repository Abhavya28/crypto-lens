"use client"

import { useEffect, useState } from "react";
import { getCoinsList } from "../services/coinApi";
import { CoinListType } from "../types";
import Link from "next/link";
import LoadingUI from "./common/loadingUI";
import StarButton from "./common/starButton";
import { RefreshCw } from "lucide-react";
import RefreshButton from "./common/refreshButton";

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
        <section className="min-h-screen bg-[#0b1120] text-white p-4 md:p-6">
            <div className="max-w-6xl mx-auto">
                <div className="flex items-center justify-between">
                    <h1 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">
                        Top Cryptocurrencies
                    </h1>
                    <div>
                        <RefreshButton />
                    </div>
                </div>

                {/* Desktop Table */}
                <div className="hidden md:block bg-white/5 rounded-xl overflow-hidden border border-white/10">

                    <div className="grid grid-cols-8 p-4 text-gray-400 text-sm border-b border-white/10">
                        <h1></h1>
                        <h1>#</h1>
                        <h1>Coin</h1>
                        <h1>Price</h1>
                        <h1>24h</h1>
                        <h1>Market Cap</h1>
                        <h1>Volume</h1>
                        <h1>7D</h1>
                    </div>

                    {coins.map((coin) => (
                        <Link href={`/coin/${coin.id}`} key={coin.id}>
                            <div className="grid grid-cols-8 items-center p-4 border-b border-white/5 hover:bg-white/5 transition">

                                <StarButton coin={coin} />

                                <p>{coin.market_cap_rank}</p>

                                <div className="flex items-center gap-3">
                                    <img src={coin.image} className="w-8 h-8" />
                                    <div>
                                        <p className="font-medium">{coin.name}</p>
                                        <p className="text-xs text-gray-400">
                                            {coin.symbol.toUpperCase()}
                                        </p>
                                    </div>
                                </div>

                                <p>$ {coin.current_price.toFixed(2)}</p>

                                <p className={coin.price_change_percentage_24h > 0 ? "text-green-400" : "text-red-400"}>
                                    {coin.price_change_percentage_24h?.toFixed(2)}%
                                </p>

                                <p>$ {(coin.market_cap / 1e12).toFixed(2)}T</p>
                                <p>$ {(coin.total_volume / 1e9).toFixed(2)}B</p>
                                <p className="text-gray-400">--</p>

                            </div>
                        </Link>
                    ))}

                </div>

                {/* Mobile Cards */}
                <div className="md:hidden space-y-3">
                    <div className="flex flex-col gap-2">
                        {coins.map((coin) => (
                            <Link href={`/coin/${coin.id}`} key={coin.id}>
                                <div className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-3">

                                    <div className="flex justify-between items-center">
                                        <div className="flex items-center gap-3">
                                            <img src={coin.image} className="w-8 h-8" />
                                            <div>
                                                <p className="font-medium">{coin.name}</p>
                                                <p className="text-xs text-gray-400">
                                                    {coin.symbol.toUpperCase()}
                                                </p>
                                            </div>
                                        </div>

                                        <StarButton coin={coin} />
                                    </div>

                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-400">Price</span>
                                        <span>$ {coin.current_price.toFixed(2)}</span>
                                    </div>

                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-400">24h</span>
                                        <span className={coin.price_change_percentage_24h > 0 ? "text-green-400" : "text-red-400"}>
                                            {coin.price_change_percentage_24h?.toFixed(2)}%
                                        </span>
                                    </div>

                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-400">Market Cap</span>
                                        <span>$ {(coin.market_cap / 1e12).toFixed(2)}T</span>
                                    </div>

                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-400">Volume</span>
                                        <span>$ {(coin.total_volume / 1e9).toFixed(2)}B</span>
                                    </div>

                                </div>
                            </Link>
                        ))}
                    </div>

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