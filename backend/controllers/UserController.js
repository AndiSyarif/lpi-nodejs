import User from "../models/UserModel.js";
import { Op } from "sequelize";
import bcrypt from "bcrypt";

export const getUsers = async (req, res) => {
  try {
    const response = await User.findAll();
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const getUserById = async (req, res) => {
  try {
    const response = await User.findOne({
      where: {
        id_user: req.params.id_user,
      },
    });

    if (!response) {
      res.status(404).json({ error: "User not found." });
      return;
    }

    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const createUser = async (req, res) => {
  try {
    await User.create(req.body);
    res.status(201).json({ msg: "User has been saved !" });
  } catch (error) {
    if (error.name == "SequelizeUniqueConstraintError") {
      res.status(400).json({ msg: "Email already exists." });
    } else {
      console.log(error.message);
      res.status(500).json({ msg: "Internal Server Error" });
    }
  }
};

export const updateUser = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        id_user: req.params.id_user,
      },
    });

    if (!user) {
      res.status(404).json({ msg: "User not found." });
      return;
    }

    const existingUser = await User.findOne({
      where: {
        email: req.body.email,
        id_user: {
          [Op.not]: req.params.id_user,
        },
      },
    });

    if (existingUser) {
      res.status(400).json({ msg: "Email already exists." });
      return;
    }

    if (req.body.password) {
      const saltRounds = 10;
      req.body.password = await bcrypt.hash(req.body.password, saltRounds);
    }

    await User.update(req.body, {
      where: {
        id_user: req.params.id_user,
      },
    });
    res.status(200).json({ msg: "User has been updated!" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        id_user: req.params.id_user,
      },
    });

    if (!user) {
      res.status(404).json({ msg: "User not found." });
      return;
    }

    if (user.islogin == "1") {
      res.status(400).json({ msg: "Cannot delete when user is logged in." });
      return;
    }

    await User.destroy({
      where: {
        id_user: req.params.id_user,
      },
    });
    res.status(200).json({ msg: "User has been deleted !" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};
