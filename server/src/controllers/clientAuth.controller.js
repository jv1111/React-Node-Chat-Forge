const clientAuthService = require("../services/clientAuth.service");

const login = async (req, res) => {
  try {
    const result = await clientAuthService.login(req.body);

    return res.status(200).json({
      success: true,
      message: "Login successful.",
      data: result,
    });
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  login,
};
