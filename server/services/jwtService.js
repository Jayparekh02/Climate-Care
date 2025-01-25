// services/jwtService.js
import jwt from "jsonwebtoken";

const jwtSecret = "your_jwt_secret";
const tokenExpiry = "1h"; // Token expiry time: 1 hour

export const generateToken = (user) => {
  return jwt.sign({ user }, jwtSecret, { expiresIn: tokenExpiry });
};

export const verifyToken = (token) => {
  return jwt.verify(token, jwtSecret);
};
