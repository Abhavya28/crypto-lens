"use client"

import { useEffect, useState } from 'react'
import { CoinType } from '../types';
import { getCoin } from '../services/coinApi';

const Coin = ({ id }: { id: string }) => {
    const [coin, setCoin] = useState<CoinType | null>(null);

    useEffect(() => {
        const fetchCoin = async () => {
            const data = await getCoin(id);
            console.log(data);
            setCoin(data);
        };
        fetchCoin();
    },[id])

    if (!coin) return <p>Loading...</p>;

    return (
        <div>{coin.name}</div>
    )
}

export default Coin