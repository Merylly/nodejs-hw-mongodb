const parseNumber = (number, defaultNumber) => {
  if (typeof number !== 'string') return defaultNumber;

  const parsedNumber = parseInt(number);

  if (Number.isNaN(parsedNumber)) return defaultNumber;

  return parsedNumber;
};

export const parsePaginationParams = (query) => {
  const { page, perPage } = query;

  return {
    page: parseNumber(page, 1),
    perPage: parseNumber(perPage, 10),
  };
};
