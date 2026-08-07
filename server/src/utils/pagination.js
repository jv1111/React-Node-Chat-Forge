const getPagination = (page = 1, limit = 20, maxLimit = 100) => {
  const currentPage = Math.max(Number(page) || 1, 1);
  const safeLimit = Math.min(Math.max(Number(limit) || 1, 1), maxLimit);

  return {
    page: currentPage,
    limit: safeLimit,
    skip: (currentPage - 1) * safeLimit,
  };
};

const getPaginationMetadata = (page, limit, total) => ({
  page,
  limit,
  total,
  totalPages: Math.ceil(total / limit),
  hasNextPage: page * limit < total,
  hasPreviousPage: page > 1,
});

module.exports = {
  getPagination,
  getPaginationMetadata,
};
