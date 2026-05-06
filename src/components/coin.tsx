"use client"

import { useEffect, useState } from 'react'
import { CoinType } from '../types';
import { getCoin } from '../services/coinApi';
import LoadingUI from './common/loadingUI';
import Chart from './chart';
import StarButton from './common/starButton';
import RefreshButton from './common/refreshButton';

const Coin = ({ id }: { id: string }) => {
    const [coin, setCoin] = useState<CoinType | null>(null);
    const [days, setDays] = useState(7);

    const TIME_RANGES = [
        { label: "24H", value: 1 },
        { label: "7D", value: 7 },
        { label: "1M", value: 30 },
        { label: "3M", value: 90 },
        { label: "1Y", value: 365 },
    ];

    useEffect(() => {
        const fetchCoin = async () => {
            const data = await getCoin(id);
            console.log(data);
            setCoin(data);
        };
        fetchCoin();
    }, [id])

    if (!coin) return <LoadingUI />

    return (
        <section className="min-h-screen bg-[#0b1120] text-white p-6">
            <div className="max-w-6xl mx-auto space-y-6 flex flex-col">

                <div className="flex items-center justify-between">
                    <div className="flex items-center justify-center gap-2">
                        <img src={coin.image.large} className="w-10 h-10" />
                        <div className="flex justify-center items-baseline gap-1">
                            <h1 className="text-3xl font-bold">{coin.name}</h1>
                            <p className="text-gray-400 uppercase">{coin.symbol}</p>

                            <span className="bg-white/10 px-2 rounded-3xl text-sm">
                                #{coin.market_cap_rank}
                            </span>
                        </div>
                    </div>

                    <div className='flex gap-2 items-center'>
                        <div className="bg-white/10 p-2 rounded-lg">
                            <StarButton
                                coin={{
                                    id: coin.id,
                                    name: coin.name,
                                    symbol: coin.symbol,
                                    thumb: coin.image.small,
                                }}
                            />
                        </div>
                        <RefreshButton />
                    </div>
                </div>

                <div className="flex gap-2 items-center">
                    <h2 className="text-3xl font-bold">
                        $ {coin.market_data.current_price.usd.toLocaleString()}
                    </h2>

                    <p
                        className={`text-sm font-bold ${coin.market_data.price_change_percentage_24h > 0
                            ? "text-green-400"
                            : "text-red-400"
                            }`}
                    >
                        {coin.market_data.price_change_percentage_24h?.toFixed(2)}% (24h)
                    </p>
                </div>

                {/* Statistics Section */}
                <div className="flex flex-col">
                    <h2 className="text-xl font-semibold mb-4">
                        {coin.name} Statistics
                    </h2>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-6 text-sm bg-white/5 p-6 rounded-xl border border-white/10">

                        <div>
                            <p className="text-gray-400">Market Cap</p>
                            <div className='flex items-baseline gap-2'>
                                <p className="font-semibold">
                                    $ {(coin.market_data.market_cap.usd / 1e12).toFixed(2)}T
                                </p>
                                <p
                                    className={`text-xs ${coin.market_data.market_cap_change_percentage_24h > 0
                                        ? "text-green-400"
                                        : "text-red-400"
                                        }`}
                                >
                                    {coin.market_data.market_cap_change_percentage_24h?.toFixed(2)}%
                                </p>
                            </div>
                        </div>

                        <div>
                            <p className="text-gray-400">Volume (24h)</p>
                            <div className='flex items-baseline gap-2'>
                                <p className="font-semibold">
                                    $ {(coin.market_data.total_volume.usd / 1e9).toFixed(2)}B
                                </p>
                            </div>
                        </div>

                        <div>
                            <p className="text-gray-400">Vol/Mkt Cap (24h)</p>
                            <p className="font-semibold">
                                {(
                                    (coin.market_data.total_volume.usd /
                                        coin.market_data.market_cap.usd) * 100
                                ).toFixed(2) + "%"}
                            </p>
                        </div>

                        <div>
                            <p className="text-gray-400">FDV</p>
                            <p className="font-semibold">
                                $ {(coin.market_data.fully_diluted_valuation.usd / 1e12).toFixed(2)}T
                            </p>
                        </div>

                        <div>
                            <p className="text-gray-400">Total supply</p>
                            <p className="font-semibold">
                                {(coin.market_data.total_supply / 1e6).toFixed(2)}M {coin.symbol.toUpperCase()}
                            </p>
                        </div>

                        <div>
                            <p className="text-gray-400">Max. supply</p>
                            <p className="font-semibold">
                                {(coin.market_data.max_supply / 1e6).toFixed(0)}M {coin.symbol.toUpperCase()}
                            </p>
                        </div>

                        <div>
                            <p className="text-gray-400">Circulating supply</p>
                            <p className="font-semibold">
                                {(coin.market_data.circulating_supply / 1e6).toFixed(2)}M {coin.symbol.toUpperCase()}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                    <h2 className="text-xl font-semibold mb-2">About</h2>
                    <p className="text-gray-300 text-sm leading-relaxed">
                        {coin.description.en
                            ? coin.description.en.replace(/<[^>]*>/g, "").slice(0, 300) + "..."
                            : "No description available."}
                    </p>
                </div>

                <div className="bg-white/5 p-6 rounded-2xl border border-white/10 space-y-4">

                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-bold text-white">
                            Price chart
                        </h2>

                        <p className="text-xs text-gray-500">
                            Last {days} day{days > 1 ? "s" : ""}
                        </p>
                    </div>

                    <div className="flex gap-2 bg-white/5 p-2 rounded-xl w-full justify-between">
                        {TIME_RANGES.map((t) => (
                            <button
                                key={t.value}
                                onClick={() => setDays(t.value)}
                                className={`px-3 py-1 rounded-lg text-xs font-medium transition ${days === t.value
                                    ? "bg-blue-500 text-white shadow-md"
                                    : "text-gray-300 hover:bg-white/10"
                                    }`}
                            >
                                {t.label}
                            </button>
                        ))}
                    </div>

                    <div className="h-[300px]">
                        <Chart id={id} days={days} />
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Coin