import jwt from "jsonwebtoken"


const generateToken = (id) => {
  return jwt.sign({ id }, "myjwtsecret", { expiresIn: "1d" });
};

export default generateToken 