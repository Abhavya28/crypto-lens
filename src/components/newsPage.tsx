"use client";

import { useEffect, useState } from "react";
import { getNews } from "../services/newsApi";

const NewsPage = () => {
    const [news, setNews] = useState<any[]>([]);

    useEffect(() => {
        const fetchNews = async () => {
            const data = await getNews();
            setNews(data.results || []);
        };

        fetchNews();
    }, []);

    console.log(news, "news");

    return (
        <section className="py-10 px-6">

            <div className="max-w-6xl mx-auto">

                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-white">
                        Latest Crypto News
                    </h2>
                </div>

                <div className="grid md:grid-cols-3 gap-5">

                    {news.map((article, index) => (
                        <a
                            key={index}
                            href={article.link}
                            target="_blank"
                            className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 transition"
                        >

                            <img
                                src={article.image_url || "/news.jpg"}
                                alt={article.title}
                                className="w-full h-52 object-cover"
                                onError={(e) => {
                                    e.currentTarget.src = "/news.jpg";
                                }}
                            />
                            <div className="p-4 space-y-3">

                                <p className="text-xs text-blue-400">
                                    {article.source_name}
                                </p>

                                <h3 className="font-semibold line-clamp-2 text-white">
                                    {article.title}
                                </h3>

                                <p className="text-sm text-gray-400 line-clamp-3">
                                    {article.description}
                                </p>

                                <p className="text-xs text-gray-500">
                                    {article.pubDate}
                                </p>

                            </div>

                        </a>
                    ))}

                </div>

            </div>

        </section>
    );
};

export default NewsPage;