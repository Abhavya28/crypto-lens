import axios from "axios";

export async function GET() {
  try {
    const res = await axios.get(
      "https://newsdata.io/api/1/latest",
      {
        params: {
          apikey: process.env.NEWSDATA_API_KEY,
          q: "crypto blockchain",
          language: "en",
        },
      }
    );

    return Response.json(res.data);
  } catch (error) {
    return Response.json(
      { error: "Failed to fetch news" },
      { status: 500 }
    );
  }
}