import jwt from "jsonwebtoken"

const generateRefreshToken = (id) => {
  return jwt.sign({ id }, "myjwtsecret", { expiresIn: "3d" });
};

export default  generateRefreshToken 