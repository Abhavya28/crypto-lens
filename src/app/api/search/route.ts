import axios from "axios";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("query")?.trim();

  if (!query) {
    return Response.json(
      { error: "Query is required" },
      { status: 400 }
    );
  }

  try {
    const res = await axios.get(
      `https://api.coingecko.com/api/v3/search?query=${query}`
    );

    return Response.json({
      coins: res.data.coins,
    });

  } catch (error) {
    return Response.json(
      { error: "Search API failed" },
      { status: 500 }
    );
  }
}