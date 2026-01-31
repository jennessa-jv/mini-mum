export const getPregnancyWeek = (startDate) => {
  const diff = Date.now() - new Date(startDate).getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24 * 7));
};
