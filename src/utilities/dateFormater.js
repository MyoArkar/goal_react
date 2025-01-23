export const  formatDate = (isoString) => {
  const date = new Date(isoString);
  return date.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
};

export const convertToISOString = (datetimeString) => {
  const date = new Date(datetimeString); // Create a Date object
  // Return in the desired format
  return `${date.toISOString().split(".")[0]}.000000Z`;
};

export const convertToDateTime = (isoString) => {
  const date = new Date(isoString);

  return  date.toISOString().slice(0, 16);
}