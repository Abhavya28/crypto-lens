"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

const navLinks = [
  { title: "Dashboard", href: "/" },
  { title: "Watchlist", href: "/watchlist" },
  { title: "Blogs", href: "/blogs"},
];

const Navbar = () => {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [coins, setCoins] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const fetchCoins = async (q: string) => {
    const res = await axios.get(`/api/search?query=${q}`);
    setCoins(res.data.coins);
  };

  useEffect(() => {
    if (!query) return;

    const timeout = setTimeout(() => {
      fetchCoins(query);
    }, 300);

    return () => clearTimeout(timeout);
  }, [query]);

  return (
    <nav className="flex flex-col md:flex-row md:items-center justify-between px-4 md:px-6 py-4 border-b border-gray-700 gap-4">
      <div className="flex items-center justify-between w-full md:w-auto">
        <Link href="/">
          <h1 className="text-2xl font-bold">
            Crypto<span className="text-blue-400">Lens</span>
          </h1>
        </Link>

        <button
          className="md:hidden text-white"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>

      </div>

      <div
        className={`flex-col md:flex-row md:flex gap-6 w-full md:w-auto ${menuOpen ? "flex" : "hidden md:flex"
          }`}
      >
        {navLinks.map((l) => (
          <Link key={l.href} href={l.href} className="hover:text-blue-400">
            {l.title}
          </Link>
        ))}
      </div>

      <div className="relative w-full md:w-64">

        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setOpen(true)}
          onBlur={() => setTimeout(() => setOpen(false), 200)}
          placeholder="Search coin..."
          className="w-full px-3 py-2 bg-white/10 text-white rounded-lg outline-none"
        />

        {open && query && (
          <div className="absolute top-full mt-2 w-full bg-[#0b1120] border border-white/10 rounded-lg max-h-60 overflow-y-auto z-50">

            {coins.length === 0 ? (
              <p className="p-3 text-sm text-gray-400">No coins found</p>
            ) : (
              coins.map((coin) => (
                <div
                  key={coin.id}
                  onClick={() => {
                    router.push(`/coin/${coin.id}`);
                    setQuery("");
                    setCoins([]);
                    setOpen(false);
                  }}
                  className="flex items-center gap-2 p-3 hover:bg-white/10 cursor-pointer"
                >
                  <img src={coin.thumb} className="w-5 h-5" />
                  <div>
                    <p className="text-sm">{coin.name}</p>
                    <span className="text-xs text-gray-400 uppercase">
                      {coin.symbol}
                    </span>
                  </div>
                </div>
              ))
            )}

          </div>
        )}
      </div>

    </nav>
  );
};

export default Navbar;