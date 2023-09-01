const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// schema and data validation
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    validate: {
      validator: (value) => validator.isEmail(value),
      message: "Invalid Email id!",
    },
  },
  phone: {
    type: Number,
    required: true,
    validate: {
      validator: (value) => value.toString().length == 10,
      message: "Invalid phone number!",
    },
  },
  profession: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  messages: [
    {
      name: {
        type: String,
      },
      email: {
        type: String,
        validate: {
          validator: (value) => validator.isEmail(value),
          message: "Invalid Email id!",
        },
      },
      phone: {
        type: Number,
        validate: {
          validator: (value) => value.toString().length == 10,
          message: "Invalid phone number!",
        },
      },
      message: {
        type: String,
      },
    },
  ],
  tokens: [{ token: { type: String } }],
});

// defining custom method
userSchema.methods.generateAuthToken = async function () {
  try {
    const token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY, { expiresIn: "30d" });
    this.tokens = this.tokens.concat([{ token }]);
    await this.save();
    return token;
  } catch (err) {
    console.log(err);
  }
};

userSchema.methods.addMsg = async function (name, email, phone, message) {
  try {
    const newMsg = { name, email, phone, message };
    this.messages = this.messages.concat(newMsg);
    await this.save();
    return newMsg;
  } catch (err) {
    console.log(err);
  }
};

userSchema.methods.removeToken = async function (token) {
  try {
    this.tokens = this.tokens.filter((curr) => curr.token !== token);
    await this.save();
    return this;
  } catch (err) {
    console.log(err);
  }
};

// pre hook for hashing password
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);
  }
  next();
});

// collection creation
const mernUser = mongoose.model("Mernuser", userSchema);

module.exports = mernUser;
