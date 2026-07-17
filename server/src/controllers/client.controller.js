const clientService = require("../services/client.service");

const createClient = async (req, res) => {
  try {
    const { projectCode, username, password, firstName, middleName, lastName } =
      req.body;

    const client = await clientService.createClient({
      projectCode,
      username,
      password,
      firstName,
      middleName,
      lastName,
    });

    return res.status(201).json({
      success: true,
      message: "Client created successfully.",
      data: client,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const getClients = async (req, res) => {
  try {
    const { projectCode, page = 1, limit = 20 } = req.query;

    const result = await clientService.getClients({
      projectCode,
      page: Number(page),
      limit: Number(limit),
    });

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createClient,
  getClients,
};
