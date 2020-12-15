export const range = (start = 0, end) => {
  return [...Array(end).keys()].map((i) => i + start);
};
