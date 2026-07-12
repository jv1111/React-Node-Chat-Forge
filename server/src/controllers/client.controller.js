const clientService = require("../services/client.service");

const createClient = async (req, res) => {
  try {
    const { projectCode, firstName, middleName, lastName } = req.body;

    const client = await clientService.createClient({
      projectCode,
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

module.exports = {
  createClient,
};
