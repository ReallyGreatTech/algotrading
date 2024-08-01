export const formatNumber = (num: number) => {
  // Use Intl.NumberFormat for initial formatting
  const formatted = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 3,
    maximumFractionDigits: 3,
  }).format(num);

  // Remove unnecessary trailing zeros
  return formatted.replace(/\.0+$/, ".0").replace(/(\.\d*[1-9])0+$/, "$1");
};

export const formatPercentage = (num: number) => {
  return `${formatNumber(num)} %`;
};

export const formatCurrency = (num: number) => {
  return `$ ${formatNumber(num)}`;
};
