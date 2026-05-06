import axios from "axios";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id")?.trim();
  const days = searchParams.get("days")?.trim();

  if (!id) {
    return Response.json({ error: "Coin id is required" }, { status: 400 });
  }

  if (!days) {
    return Response.json({ error: "Days is required" }, { status: 400 });
  }

  try {
    const res = await axios.get(
      `https://api.coingecko.com/api/v3/coins/${id}/market_chart`,
      {
        params: {
          vs_currency: "usd",
          days: days,
        },
      }
    );

    return Response.json(res.data);
  } catch (error) {
    return Response.json({ error: "Coin Chart API failed" }, { status: 500 });
  }
}