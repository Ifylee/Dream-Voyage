const { User } = require("../models");
const { password } = require("../models/User");
const { signToken, AuthenticationError } = require("../utils/auth");

const resolvers = {
  Query: {
    allUsers: async () => {
      return await User.find();
    },
  },
  Mutation: {
    addUser: async (parent, args) => {
      try {
        const user = await User.create({...args});
        const token = signToken(user);
        return { user, token };
      } catch (error) {
        console.log(error);
      }
    },
    login: async (parent, { email, password }) => {
      try {
        const user = await User.findOne({ email });

        if (!user) {
          throw AuthenticationError;
        }
        const correctPassword = await user.isCorrectPassword(password);

        if (!correctPassword) {
          throw AuthenticationError;
        }

        const token = signToken(user);

        return { user, token };
      } catch (error) {
        console.log(error);
      }
    },
  },
};

module.exports = resolvers;
