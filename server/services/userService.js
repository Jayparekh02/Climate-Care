// /services/userService.js
import User from "../models/userModel.js";

export const createUser = async (userData) => {
  try {
    return await User.create(userData);
  } catch (error) {
    throw Error("Error creating user");
  }
};

export const findAllUsers = async () => {
  try {
    return await User.find();
  } catch (error) {
    throw Error("Error finding users");
  }
};

export const findUserById = async (id) => {
  try {
    return await User.findById(id);
  } catch (error) {
    throw Error("Error finding user");
  }
};

export const updateUser = async (id, userData) => {
  try {
    return await User.findByIdAndUpdate(id, userData, { new: true });
  } catch (error) {
    throw Error("Error updating user");
  }
};

export const deleteUser = async (id) => {
  try {
    return await User.findByIdAndDelete(id);
  } catch (error) {
    throw Error("Error deleting user");
  }
};
