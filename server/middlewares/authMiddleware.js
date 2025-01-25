// middleware/authMiddleware.js
import { verifyToken } from "../services/jwtService.js";
export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return res.sendStatus(401);
  }

  try {
    const decoded = verifyToken(token);
    req.user = decoded.user;
    next();
  } catch (error) {
    return res.sendStatus(403);
  }
};

export const checkUserType = (requiredType) => {
  return (req, res, next) => {
    if (req.user && req.user.userType === requiredType) {
      next();
    } else {
      res.status(403).send("Access denied: Unauthorized user type");
    }
  };
};
