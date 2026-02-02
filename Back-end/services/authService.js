const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.register = async ({ username, email, password }) => {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw new Error("Email already in use");
    }

    // 2️⃣ Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 3️⃣ Save user in DB
    const user = await User.create({
        username,
        email,
        password: hashedPassword,
    });

    // 4️⃣ Generate JWT token
    const token = jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET || "secretkey",
        { expiresIn: "7d" }
    );

    // 5️⃣ Return safe user data
    return {
        _id: user._id,
        username: user.username,
        email: user.email,
        token,
    };
};

exports.login = async ({ email, password }) => {
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error("Invalid email or password");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        throw new Error("Invalid email or password");
    }


  //  Generate token
  const token = jwt.sign(
    { id: user._id },
    process.env.JWT_SECRET || "secretkey",
    { expiresIn: "7d" }
  );

  return {
    _id: user._id,
    username: user.username,
    email: user.email,
    password : user.password,
    token,
  };
}