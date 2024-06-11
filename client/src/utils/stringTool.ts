export const shortenString = (str: string, maxLength?: number): string => {
  if (maxLength) return `${str.slice(0, maxLength)}...`;

  return str;
};
