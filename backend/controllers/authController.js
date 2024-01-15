const User = require("../models/User");
const jwt = require("jsonwebtoken");

const handleErrors = (err) => {
  console.log(err.message, err.code);
  let errors = {
    name: "",
    email: "",
    password: "",
  };
  //duplicate error code
  if (err.code === 11000) {
    errors.email = "Already have an account";
  }
  //validation errors
  if (err.message.includes("user validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  return errors;
};
const maxAge = 3 * 24 * 60 * 60;

const createToken = (id) => {
  return jwt.sign({ id }, "mecki secret", {
    expiresIn: maxAge,
  });
};

const createNewUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const user = await User.create({ name, email, password });
    const token = createToken(user._id);
    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: maxAge * 1000,
    });
    res.status(201).json({ user: user._id });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: maxAge * 1000,
    });
    res.status(200).json({ user: user._id });
  } catch (error) {
    res.status(400).json({});
  }
};

const logout = async (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.redirect("/");
};

module.exports = {
  createNewUser,
  login,
  logout,
};
