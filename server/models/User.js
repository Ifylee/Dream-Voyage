const { Schema, model } = require("mongoose");

const bcyrpt = require("bcrypt");

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
  },
});

userSchema.pre("save", async (next) => {
  if (this.isNew || this.isModified("password")) {
    const saltRounds = 10;
    this.password = await bcyrpt.hash(this.password, saltRounds);
  }

  next();
});


userSchema.methods.isCorrectPassword = async (password) =>{
    return await bcyrpt.compare(password, this.password);
}

const User = model('User', userSchema)

module.exports = User;
