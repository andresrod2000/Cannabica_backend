import jwt from "jsonwebtoken";

const userId = "6808701bd8e35bb9960f95d2";
const secret = "UNACONTRAPRUEBA123";

const token = jwt.sign({ id: userId }, secret, { expiresIn: "1d" });
console.log(token);
