import Employee from "../models/EmployeeModel.js";
import { Op } from "sequelize";
import path from "path";
import fs from "fs";

export const getEmployees = async (req, res) => {
  try {
    const response = await Employee.findAll();
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const getEmployeeById = async (req, res) => {
  try {
    const response = await Employee.findOne({
      where: {
        id_employees: req.params.id_employees,
      },
    });

    if (!response) {
      res.status(404).json({ error: "Employee not found." });
      return;
    }

    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const createEmployee = async (req, res) => {
  try {
    if (req.files === null)
      return res.status(400).json({ msg: "No File Uploaded" });

    const id = req.body.id;
    const name = req.body.name;
    const phone = req.body.phone;
    const address = req.body.address;
    const position = req.body.position;
    const join_date = req.body.join_date;
    const salary = req.body.salary;
    const file = req.files.file;
    const fileSize = file.data.length;
    const ext = path.extname(file.name);
    const fileName = file.md5 + ext;
    const url = `${req.protocol}://${req.get(
      "host"
    )}/employee/images/${fileName}`;
    const allowedType = [".jpg", ".jpeg"];

    if (!allowedType.includes(ext.toLocaleLowerCase()))
      return res.status(422).json({ msg: "Invalid Image" });
    if (fileSize > 300000)
      return res
        .status(422)
        .json({ msg: "Image must be less or equals 300 kb" });

    file.mv(`./public/employee/images/${fileName}`, async (err) => {
      if (err) return res.status(500).json({ msg: err.message });
      try {
        await Employee.create({
          id: id,
          name: name,
          phone: phone,
          address: address,
          position: position,
          join_date: join_date,
          salary: salary,
          image: fileName,
          url: url,
        });
        res.status(201).json({ msg: "Employee has been saved !" });
      } catch (error) {
        console.log(error.message);
      }
    });
  } catch (error) {
    if (error.name == "SequelizeUniqueConstraintError") {
      res.status(400).json({ msg: "ID employee already exists." });
    } else {
      console.log(error.message);
      res.status(500).json({ msg: "Internal Server Error" });
    }
  }
};

export const updateEmployee = async (req, res) => {
  try {
    const employee = await Employee.findOne({
      where: {
        id_employees: req.params.id_employees,
      },
    });

    if (!employee) {
      res.status(404).json({ msg: "Employee not found." });
      return;
    }

    let fileName = "";
    if (req.files === null) {
      fileName = Employee.image;
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

      const filepath = `./public/employee/images/${employee.image}`;
      fs.unlinkSync(filepath);

      file.mv(`./public/employee/images/${fileName}`, (err) => {
        if (err) return res.status(500).json({ msg: err.message });
      });
    }

    const existingemployee = await Employee.findOne({
      where: {
        id: req.body.id,
        id_employees: {
          [Op.not]: req.params.id_employees,
        },
      },
    });

    if (existingemployee) {
      res.status(400).json({ msg: "ID Employee already exists." });
      return;
    }

    const id = req.body.id;
    const name = req.body.name;
    const phone = req.body.phone;
    const address = req.body.address;
    const position = req.body.position;
    const join_date = req.body.join_date;
    const salary = req.body.salary;
    const url = `${req.protocol}://${req.get(
      "host"
    )}/employee/images/${fileName}`;

    await Employee.update(
      {
        id: id,
        name: name,
        phone: phone,
        address: address,
        position: position,
        join_date: join_date,
        salary: salary,
        image: fileName,
        url: url,
      },
      {
        where: {
          id_employees: req.params.id_employees,
        },
      }
    );
    res.status(200).json({ msg: "Employee has been updated!" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

export const deleteEmployee = async (req, res) => {
  try {
    const employee = await Employee.findOne({
      where: {
        id_employees: req.params.id_employees,
      },
    });

    if (!employee) {
      res.status(404).json({ msg: "Employee not found." });
      return;
    }

    try {
      const filepath = `./public/employee/images/${employee.image}`;
      fs.unlinkSync(filepath);
      await Employee.destroy({
        where: {
          id_employees: req.params.id_employees,
        },
      });
      res.status(200).json({ msg: "Employee has been deleted !" });
    } catch (error) {
      console.log(error.message);
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};
