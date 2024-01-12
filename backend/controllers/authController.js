// const User = require("../models/User");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");

// const bcryptSalt = bcrypt.genSaltSync(10);
// const jwtSecret = "fdsadasda45dsadsa32dsa5das";

// const register = async (req, res) => {
//   const { name, email, password } = req.body;
//   try {
//     const user = await User.create({
//       name,
//       email,
//       password: bcrypt.hashSync(password, bcryptSalt),
//     });
//     res.json(user);
//   } catch (error) {
//     res.status(422).json(error);
//   }
// };

// const login = async (req, res) => {
//   const { email, password } = req.body;
//   const user = await User.findOne({ email });
//   if (user) {
//     const passOk = bcrypt.compareSync(password, user.password);
//     if (passOk) {
//       jwt.sign(
//         {
//           email: user.email,
//           id: user._id,
//         },
//         jwtSecret,
//         {},
//         (err, token) => {
//           if (err) throw err;
//           res.cookie("token", token).json(user);
//         }
//       );
//     } else {
//       res.status(422).json("pass not ok");
//     }
//   } else {
//     res.status(400).json("not found");
//   }
// };

// module.exports = {
//   register,
//   login,
// };
