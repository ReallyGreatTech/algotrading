export const formatTime = (timestamp: string): string => {
    const date = new Date(timestamp);
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };

//   export const formatTimestamp = (timestamp: string): string => {
//     const date = new Date(timestamp);
//     const options: Intl.DateTimeFormatOptions = {
//       year: "numeric",
//       month: "short",
//       day: "2-digit",
//       hour: "2-digit",
//       minute: "2-digit",
//       hour12: false,
//     };
//     return date.toLocaleString(undefined, options);
//   };
  

export const formatTimestamp = (timestamp: string): string => {
    const date = new Date(timestamp);
    const optionsDate: Intl.DateTimeFormatOptions = {
      month: "short",
      day: "2-digit",
    };
    const optionsTime: Intl.DateTimeFormatOptions = {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    };
    const formattedDate = date.toLocaleDateString(undefined, optionsDate);
    const formattedTime = date.toLocaleTimeString(undefined, optionsTime);
    return `${formattedDate} | ${formattedTime}`;
  };