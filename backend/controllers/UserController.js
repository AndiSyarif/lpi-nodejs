import User from "../models/UserModel.js";
import { Op } from "sequelize";
import bcrypt from "bcrypt";
import path from "path";
import fs from "fs";

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
    if (req.files === null)
      return res.status(400).json({ msg: "No File Uploaded" });

    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const level = req.body.level;
    const file = req.files.file;
    const fileSize = file.data.length;
    const ext = path.extname(file.name);
    const fileName = file.md5 + ext;
    const url = `${req.protocol}://${req.get("host")}/user/images/${fileName}`;
    const allowedType = [".jpg", ".jpeg"];

    if (!allowedType.includes(ext.toLocaleLowerCase()))
      return res.status(422).json({ msg: "Invalid Image" });
    if (fileSize > 300000)
      return res
        .status(422)
        .json({ msg: "Image must be less or equals 300 kb" });

    file.mv(`./public/user/images/${fileName}`, async (err) => {
      if (err) return res.status(500).json({ msg: err.message });
      try {
        await User.create({
          name: name,
          email: email,
          password: password,
          level: level,
          image: fileName,
          url: url,
        });
        res.status(201).json({ msg: "User has been saved !" });
      } catch (error) {
        console.log(error.message);
      }
    });
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

    let fileName = "";
    if (req.files === null) {
      fileName = User.image;
    } else {
      const file = req.files.file;
      const fileSize = file.data.length;
      const ext = path.extname(file.name);
      fileName = file.md5 + ext;
      const allowedType = [".jpg", ".jpeg"];

      if (!allowedType.includes(ext.toLocaleLowerCase()))
        return res.status(422).json({ msg: "Invalid Image" });
      if (fileSize > 300000)
        return res
          .status(422)
          .json({ msg: "Image must be less or equals 300 kb" });

      const filepath = `./public/user/images/${user.image}`;
      fs.unlinkSync(filepath);

      file.mv(`./public/user/images/${fileName}`, (err) => {
        if (err) return res.status(500).json({ msg: err.message });
      });
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

    const name = req.body.name;
    const email = req.body.email;
    //const password = req.body.password;
    const level = req.body.level;
    const url = `${req.protocol}://${req.get("host")}/user/images/${fileName}`;

    try {
      if (req.body.password) {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

        await User.update(
          {
            name: name,
            email: email,
            password: hashedPassword,
            level: level,
            image: fileName,
            url: url,
          },
          {
            where: {
              id_user: req.params.id_user,
            },
          }
        );
      } else {
        await User.update(
          {
            name: name,
            email: email,
            level: level,
            image: fileName,
            url: url,
          },
          {
            where: {
              id_user: req.params.id_user,
            },
          }
        );
      }
      res.status(200).json({ msg: "User has been updated!" });
    } catch (error) {
      console.log(error.message);
    }
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

    try {
      const filepath = `./public/user/images/${user.image}`;
      fs.unlinkSync(filepath);
      await User.destroy({
        where: {
          id_user: req.params.id_user,
        },
      });
      res.status(200).json({ msg: "User has been deleted !" });
    } catch (error) {
      console.log(error.message);
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};
