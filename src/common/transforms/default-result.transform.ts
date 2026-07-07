export const transformDefaultResult = <T>(
  statusCode: number,
  message: string,
  data?: T
) => ({
  statusCode,
  message,
  ...(data !== undefined ? { data } : {}),
});
