"use client";

import { useState, useEffect } from "react";

export default function AIFetcher() {
  const [data, setData] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("https://www.albertsons.com/weeklyad", {
        headers: {
          Accept: "text/html",
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const text = await response.text();
      setData(text);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Albertsons Weekly Ad Fetcher</h1>

      <button
        onClick={fetchData}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
        disabled={loading}
      >
        {loading ? "Loading..." : "Refresh Data"}
      </button>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          Error: {error}
        </div>
      )}

      {loading && <div className="text-gray-600">Loading data...</div>}

      {data && !loading && !error && (
        <div className="mt-4">
          <h2 className="text-xl font-semibold mb-2">Fetched Content:</h2>
          <div className="bg-gray-100 p-4 rounded overflow-auto max-h-[600px]">
            <pre className="whitespace-pre-wrap">{data}</pre>
          </div>
        </div>
      )}
    </div>
  );
}
