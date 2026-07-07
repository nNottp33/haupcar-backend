export const getOffset = (page: number, limit: number) => {
  return page > 1 ? (page - 1) * limit : 0;
};
