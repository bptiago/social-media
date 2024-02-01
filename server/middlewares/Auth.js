const { verify } = require("jsonwebtoken");

const validateToken = (req, res, next) => {
  const token = req.header("token");

  if (!token) return res.json({ error: "User not logged in!" });

  try {
    const decodedToken = verify(token, "AS]ipn*d!puXk4k");

    if (decodedToken) return res.json(decodedToken);
  } catch (e) {
    // Invalid token
    return res.json({ error: e });
  }
};

module.exports = { validateToken };
