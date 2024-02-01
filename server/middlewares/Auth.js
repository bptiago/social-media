const { verify } = require("jsonwebtoken");

const validateToken = (req, res, next) => {
  const token = req.header("token");

  if (!token) return res.json({ error: "User not logged in!" });

  try {
    const decodedToken = verify(token, "AS]ipn*d!puXk4k");

    // Creates an Object "User" inside the request(req). This can be accessed later.
    req.user = decodedToken;

    if (decodedToken) return next();
  } catch (e) {
    // Invalid token
    return res.json({ error: e });
  }
};

module.exports = { validateToken };
