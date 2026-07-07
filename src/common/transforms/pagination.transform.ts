export type PaginationOptions = {
  total: number;
  page: number;
  limit: number;
};

export const transformPagination = <T>(
  message: string,
  data: T[],
  { total, page, limit }: PaginationOptions
) => ({
  statusCode: 200,
  message,
  data,
  total,
  totalPages: Math.ceil(total / limit),
  page,
  limit,
});
