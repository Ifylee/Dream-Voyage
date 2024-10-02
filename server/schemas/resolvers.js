const { User, Trip, Category } = require("../models");
const { password } = require("../models/User");
const { signToken, AuthenticationError } = require("../utils/auth");

const resolvers = {
  Query: {
    allUsers: async () => {
      return await User.find();
    },
    currentUser: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id);
        return user;
      }
    },
    categories: async (parent, args) => {
      return Category.find();
    },
    allTrips: async (parent, args)=>{
      return Trip.find();
    },
    oneTrip: async(parent, {id}) =>{
      return Trip.findById(id);
    }
  },
  Mutation: {
    addUser: async (parent, args) => {
      try {
        const user = await User.create({ ...args });
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
