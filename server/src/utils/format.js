const capitalize = (text) => {
  if (!text) return "";

  return text
    .trim()
    .toLowerCase()
    .replace(/\b\p{L}/gu, (char) => char.toUpperCase());
};

module.exports = {
  capitalize,
};
