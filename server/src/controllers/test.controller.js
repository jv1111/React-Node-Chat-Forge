const getMessage = (req, res) => {
  res.status(200).json({
    success: true,
    message: "GET request successful",
  });
};

const postMessage = (req, res) => {
  const { name } = req.body;

  res.status(201).json({
    success: true,
    message: "POST request successful",
    data: {
      name,
    },
  });
};

module.exports = {
  getMessage,
  postMessage,
};
