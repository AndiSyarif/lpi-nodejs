import Employee from "../models/EmployeeModel.js";
import { Op } from "sequelize";

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
    await Employee.create(req.body);
    res.status(201).json({ msg: "Employee has been saved !" });
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

    await Employee.update(req.body, {
      where: {
        id_employees: req.params.id_employees,
      },
    });
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

    await Employee.destroy({
      where: {
        id_employees: req.params.id_employees,
      },
    });
    res.status(200).json({ msg: "Employee has been deleted !" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};
