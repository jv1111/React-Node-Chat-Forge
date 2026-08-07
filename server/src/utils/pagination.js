const getPagination = (page, limit) => {
  const safeLimit = Math.min(Math.max(limit, 1), 100);

  return {
    limit: safeLimit,
    skip: (page - 1) * safeLimit,
  };
};
