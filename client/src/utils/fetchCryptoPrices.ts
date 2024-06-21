import axios from 'axios';

interface HistoricalPrice {
  time: number;
  price: number;
}

export async function fetchCryptoComparePrices(
  cryptoSymbol: string,
  days: number = 30
): Promise<HistoricalPrice[]> {
  const apiKey = import.meta.env.VITE_CRYPTOCOMPARE_API_KEY; // Replace with your CryptoCompare API key
  const url = `https://min-api.cryptocompare.com/data/v2/histoday`;
  const params = {
    fsym: cryptoSymbol,
    tsym: 'USD',
    limit: days,
    api_key: apiKey,
  };

  try {
    const response = await axios.get(url, { params });
    const data = response.data.Data.Data || [];

    const prices = data.map((priceData: { time: number; close: number }) => ({
      time: priceData.time * 1000, // Convert to milliseconds
      price: priceData.close,
    }));
    return prices;
  } catch (error) {
    console.error(
      `Error fetching historical prices for ${cryptoSymbol}:`,
      error
    );
    return [];
  }
}
