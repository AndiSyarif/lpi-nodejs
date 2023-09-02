import express from "express";
import {
  getEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} from "../controllers/EmployeeController.js";

const router = express.Router();

router.get("/employees", getEmployees);
router.get("/employee/:id_employees", getEmployeeById);
router.post("/employees", createEmployee);
router.patch("/employee/:id_employees", updateEmployee);
router.delete("/employee/:id_employees", deleteEmployee);

export default router;
