// Define the type for the input data
interface Result {
  id: number;
  exchange: string;
  token: string;
  origin_funding: number;
  hourly_funding: number;
  daily_funding: number;
  annual_funding: number;
  timestamp: string;
  trading_pair: number;
}

export const getUniqueExchanges = (results: Result[]): string[] => {
  // Create a set to store unique exchanges
  const uniqueExchanges = new Set<string>();

  // Iterate over each item in the results array
  results.forEach((item) => {
    uniqueExchanges.add(item.exchange);
  });

  // Convert the set back to an array and return
  return Array.from(uniqueExchanges);
}

// Example usage
const results: Result[] = [
  {
    id: 61729,
    exchange: "hmx-arbitrum",
    token: "BTC",
    origin_funding: 0.0053177962,
    hourly_funding: 0.0053177962,
    daily_funding: 0.1276271095,
    annual_funding: 46.583894712,
    timestamp: "2024-06-12T11:00:05.511304",
    trading_pair: 179,
  },
  {
    id: 61737,
    exchange: "oxfun",
    token: "BTC",
    origin_funding: 0.00008,
    hourly_funding: 0.00008,
    daily_funding: 0.00192,
    annual_funding: 0.7008,
    timestamp: "2024-06-12T11:00:00.552000",
    trading_pair: 245,
  },
  {
    id: 61735,
    exchange: "hyperliquid",
    token: "BTC",
    origin_funding: 0.00004614,
    hourly_funding: 0.004614,
    daily_funding: 0.110736,
    annual_funding: 40.41864,
    timestamp: "2024-06-12T11:00:00.073000",
    trading_pair: 1,
  },
  {
    id: 62008,
    exchange: "aevo",
    token: "BTC",
    origin_funding: 0.000006,
    hourly_funding: 0.0006,
    daily_funding: 0.0144,
    annual_funding: 5.256,
    timestamp: "2024-06-12T11:00:00",
    trading_pair: 131,
  },
  {
    id: 61356,
    exchange: "hmx-arbitrum",
    token: "BTC",
    origin_funding: 0.0052644821,
    hourly_funding: 0.0052644821,
    daily_funding: 0.1263475707,
    annual_funding: 46.116863196,
    timestamp: "2024-06-12T10:00:03.483235",
    trading_pair: 179,
  },
  // Add more items as needed
];

console.log(getUniqueExchanges(results));


