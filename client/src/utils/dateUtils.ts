export const get24HourDateTime = (date: Date): string => {
  const time = date.toLocaleString('es-GB', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  const dateString = `${year}-${month}-${day}`;

  return `${dateString} ${time}`;
};


export const getFromDateTime = (range: string): string => {
  const now = new Date();
  let fromDateTime;

  switch (range) {
    case '1D':
      fromDateTime = new Date(now);
      fromDateTime.setDate(now.getDate() - 1);
      break;
    case '1M':
      fromDateTime = new Date(now);
      fromDateTime.setMonth(now.getMonth() - 1);
      break;
    case '1Y':
      fromDateTime = new Date(now);
      fromDateTime.setFullYear(now.getFullYear() - 1);
      break;
    default:
      // throw new Error('Invalid time range');
      fromDateTime = new Date(now);
      fromDateTime.setMonth(now.getMonth() - 1);
  }
  console.log(fromDateTime)
  return fromDateTime.toISOString();
}