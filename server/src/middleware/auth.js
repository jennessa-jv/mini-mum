import jwt from "jsonwebtoken";

const auth = (req, res, next) => { //next is important->wont go to the next part which requires authorization
  const token = req.headers.authorization?.split(" ")[1];
  console.log(token)
  if (!token) {
    console.log("token no ")
    return res.status(401).json({ message: "No token" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    // console.log("yay tok theere")
    next();
  } catch {
    res.status(401).json({ message: "Invalid token" });
  }
};

export default auth;
