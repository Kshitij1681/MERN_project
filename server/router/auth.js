const express = require("express");
const router = express.Router();
const mernUser = require("../model/schema");
const bcrypt = require("bcryptjs");
const authenticate = require("../middleware/authenticate");

router.get("/", (req, res) => {
  res.send({ status: "server is running!", content: "home section" });
});

router.get("/about", authenticate, (req, res) => {
  // console.log(req.rootUser);
  const { _id, name, email, phone, profession, date } = req.rootUser;
  res.json({ content: { _id, name, email, phone, profession, date } });
});

router.get("/getData", authenticate, (req, res) => {
  // console.log(req.rootUser);
  const { _id, name, email, phone, profession, date } = req.rootUser;
  res.json({ content: { _id, name, email, phone, profession, date } });
});

router.get("/logout", authenticate, async (req, res) => {
  try {
    const tokenDoc = await mernUser.findOne({ _id: req.userID });
    if (tokenDoc) {
      const modifiedDoc = await tokenDoc.removeToken(req.token);
      if (modifiedDoc) {
        res.clearCookie("jwt_token");
        return res.json({ message: "logout successful!" });
      }
    }
    res.status(422).json({ error: "logout error" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "internal server error" });
  }
});

router.post("/contact", authenticate, async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;
    if (!name || !email || !phone || !message) {
      return res.status(400).json({ error: "can't send empty message or incomplete details!" });
    }
    const userContact = await mernUser.findOne({ _id: req.userID });
    if (userContact) {
      const userMsg = await userContact.addMsg(name, email, phone, message);
      return res.status(201).json({ message: "message sent successfully", msgDetail: userMsg });
    }
    res.status(400).json({ error: "invalid sender credentials!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
});

// using promises
/*
router.post("/register", (req, res) => {
  const { name, email, phone, profession, password } = req.body;

  if (!name || !email || !phone || !profession || !password) {
    res.status(422).json({ error: "please fill all the required details!" });
  } else {
    mernUser
      .findOne({ email })
      .then((response) => {
        if (response) {
          res.status(422).json({ error: "email id already exists!" });
        } else {
          const newUser = new mernUser({ name, email, phone, profession, password });

          newUser
            .save()
            .then((data) => {
              res.status(201).json({ message: "user registeration successful!" });
            })
            .catch((err) => {
              res.status(500).json({ message: "registration failed!", error: err });
            });
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send(err);
      });
  }
});
*/

// using async await
router.post("/register", async (req, res) => {
  const { name, email, phone, profession, password, confirm_password } = req.body;

  try {
    if (!name || !email || !phone || !profession || !password || !confirm_password) {
      res.status(422).json({ error: "please fill all the required details!" });
    } else {
      const response = await mernUser.findOne({ email });
      if (response) res.status(422).json({ error: "Email id already exists" });
      else if (password !== confirm_password) res.status(422).json({ error: "passwords don't match correctly" });
      else {
        const newUser = new mernUser({ name, email, phone, profession, password });
        await newUser.save();
        res.status(201).json({ message: "user registration successful" });
      }
    }
  } catch (error) {
    console.log(err);
    res.status(500).json({ error: err });
  }
});

// login route
router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) res.status(400).json({ error: "please fill all the required details" });
    else {
      const userLogin = await mernUser.findOne({ email });
      if (userLogin) {
        const authenticate = await bcrypt.compare(password, userLogin.password);
        if (authenticate) {
          const token = await userLogin.generateAuthToken();
          // console.log(token);
          res.cookie("jwt_token", token, { expires: new Date(Date.now() + 2592000000), httpOnly: true });
          res.json({ message: "User logged in , successfully" });
        } else res.status(400).json({ error: "Invalid Credentials" });
      } else res.status(400).json({ error: "Invalid Credentials!" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
});

module.exports = router;
