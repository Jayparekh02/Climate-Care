// /controllers/userController.js
import * as UserService from "../services/userServices.js";
import pino from "pino";

const logger = pino({
  transport: {
    target: "pino-pretty",
    options: { colorize: true },
  },
});

export const createUser = async (req, res) => {
  try {
    const user = await UserService.createUser(req.body);
    res.status(201).send(user);
  } catch (error) {
    logger.error(error);
    res.status(500).send("Error creating user");
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await UserService.findAllUsers();
    res.status(200).send(users);
  } catch (error) {
    logger.error(error);
    res.status(500).send("Error retrieving users");
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = await UserService.findUserById(req.params.id);
    res.status(200).send(user);
  } catch (error) {
    logger.error(error);
    res.status(500).send("Error retrieving user");
  }
};

export const updateUser = async (req, res) => {
  try {
    const user = await UserService.updateUser(req.params.id, req.body);
    res.status(200).send(user);
  } catch (error) {
    logger.error(error);
    res.status(500).send("Error updating user");
  }
};

export const deleteUser = async (req, res) => {
  try {
    await UserService.deleteUser(req.params.id);
    res.status(204).send();
  } catch (error) {
    logger.error(error);
    res.status(500).send("Error deleting user");
  }
};
