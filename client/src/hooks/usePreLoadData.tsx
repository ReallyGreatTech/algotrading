import { useEffect, useMemo, useState } from 'react';
import { loadTokens } from '../redux/api/tokens';
import { _fetchMarketOptions } from '../redux/api/marketsOptions';

const usePreLoadData = () => {
  const [tokensLoading, setTokensLoading] = useState(true);
  const [tokens, setTokens] = useState<string[]>([]);

  const [exchangesLoading, setExchangesLoading] = useState(true);
  const [exchanges, setExchanges] = useState<string[]>([]);

  const handleLoadTokens = async () => {
    setTokensLoading(true);

    try {
      const tokens = await loadTokens();
      setTokens(tokens);
    } catch (err) {
    } finally {
      setTokensLoading(false);
    }
  };

  const handleLoadMarketOptions = async () => {
    try {
      const data = await _fetchMarketOptions();
      const exchanges = Array.from(new Set(data.map((mo) => mo.exchange)));
      setExchanges(exchanges);
    } catch (err) {
    } finally {
      setExchangesLoading(false);
    }
  };

  useEffect(() => {
    handleLoadMarketOptions();
    handleLoadTokens();
  }, []);

  return {
    tokens: {
      data: tokens,
      loading: tokensLoading,
    },
    exchanges: {
      data: exchanges,
      loading: exchangesLoading,
    },
  };
};

export default usePreLoadData;
