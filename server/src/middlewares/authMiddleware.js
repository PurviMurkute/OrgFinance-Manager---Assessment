import jwt from "jsonwebtoken";

const verifyJwt = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({
      success: false,
      data: null,
      message: "Authorization token required",
    });
  }

  try {
    const token = await authorization.split(" ")[1];
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();

    console.log("DECODED:", decoded);
  } catch (error) {
    return res.status(401).json({
      success: false,
      data: null,
      message: "Invalid or expired token",
    });
  }
};

export default verifyJwt;
