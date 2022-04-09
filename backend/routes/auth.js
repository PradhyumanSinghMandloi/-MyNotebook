const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require(`express-validator`);
const bcrypt = require(`bcryptjs`);
var jwt = require(`jsonwebtoken`);

const JWT_SECRET =
  "It is string which  is used as a sign in webtoken using this";

//ROUTE - 1
// : create a User using :POST "/api/auth". Doesnt require auth
router.post(
  "/createuser",
  [
    body(`name`, `Enter a valid name`).isLength({ min: 3 }),
    body(`email`, `Enter a valid email`).isEmail(),
    body(`password`, `password must be atleast 5 characters`).isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    //if there are errors , return errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    //check for unique email before creating email
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ error: "Sorry a user with this email already exists" });
      }

      //generating securied password using bycrypt and salt mechanism and both return promise
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);

      user = await User.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email,
      });

      // basically we are generating data which JWT token required and we are providing id of user which is unique
      const data = {
        user: {
          id: user.id,
        },
      };

      //jwttoken comprises of 3 things 1)algorithm 2) data you want to send 3) secret sign

      //it is synchronus call and we sign the JWT_token using data and secret sign
      const authToken = jwt.sign(data, JWT_SECRET);

      //res.json(user)
      res.json({ authToken });
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Internal Server  error occured");
    }
  }
);

//ROUTE - 2
//authenticate a user using JWT_token
router.post(
  "/login",
  [
    body(`email`, `Enter a valid email`).isEmail(),
    body(`password`, `Password cannot be a blank`).exists(),
  ],
  async (req, res) => {
    //check for errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      //checking is user exists with this id
      if (!user)
        return res
          .status(400)
          .json({ error: "Please try to enter with correct credentials" });

      //compare the existing password with input password
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare)
        return res
          .status(400)
          .json({ error: "Please try to enter with correct credentials" });

      const data = {
        user: {
          id: user.id,
        },
      };

      const authtoken = jwt.sign(data, JWT_SECRET);
      res.send({ authtoken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server error occured");
    }
  }
);



module.exports = router;
