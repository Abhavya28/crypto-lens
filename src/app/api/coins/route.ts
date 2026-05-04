import axios from "axios";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const page = searchParams.get("page") || "1";

  try {
    const res = await axios.get(
      "https://api.coingecko.com/api/v3/coins/markets",
      {
        params: {
          vs_currency: "usd",
          order: "market_cap_desc",
          per_page: 10,
          page,
        },
      }
    );

    return Response.json(res.data);
  } catch (error) {
    return Response.json({ error: "API failed" }, { status: 500 });
  }
}