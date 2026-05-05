"use client"

import { useEffect, useState } from 'react'
import { getChart } from '../services/chartApi';
import LoadingUI from './common/loadingUI';
import PriceChart from './common/priceChart';

const Chart = ({ id }: { id: string }) => {
    const [chart, setChart] = useState<any[]>([]);

    useEffect(() => {
        const fetchChart = async () => {
            const data = await getChart(id);

            const formatted = data.prices.map((item: any) => ({
                date: new Date(item[0]).toLocaleString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                }),
                price: item[1],
            }));

            setChart(formatted);
        };

        fetchChart();
    }, [id]);

    if (!chart.length) return <LoadingUI />;

    return (
        <div>
            <PriceChart data={chart} />
        </div>
    )
}

export default Chart;