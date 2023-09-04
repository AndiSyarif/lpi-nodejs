import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faPlus,
  faEdit,
  faTrash,
  faFloppyDisk,
  faRotateLeft,
  faArrowsRotate,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import $ from "jquery";
import "datatables.net-bs4/css/dataTables.bootstrap4.min.css";
import "datatables.net-bs4/js/dataTables.bootstrap4.min.js";

const EmployeeList = () => {
  const [employees, setEmployee] = useState([]);

  useEffect(() => {
    getEmployees();
    return () => {
      $(".table")
        .DataTable({
          responsive: true,
        })
        .destroy();
    };
  }, []);

  const getEmployees = async () => {
    const response = await axios.get("http://localhost:5000/employees");
    const formattedEmployees = response.data.map((employee) => ({
      ...employee,
      join_date: formatDate(employee.join_date),
      salary: formatSalary(employee.salary),
    }));
    setEmployee(formattedEmployees);

    // Initialize DataTables on the table element
    $(document).ready(function () {
      $(".table").DataTable();
    });
  };

  const formatDate = (dateString) => {
    const options = { day: "numeric", month: "long", year: "numeric" };
    return new Date(dateString).toLocaleDateString("en-GB", options);
  };

  const formatSalary = (salary) => {
    return `${salary
      .toLocaleString("id-ID", {
        style: "currency",
        currency: "IDR",
      })
      .replace(",00", "")}`;
  };

  const deleteEmployee = async (id_employees) => {
    try {
      await axios.delete(`http://localhost:5000/employee/${id_employees}`);
      getEmployees();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container-fluid">
      <div className="row text-center">
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
              <a className="navbar-brand" href="#">
                Andis Dev
              </a>
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div
                className="collapse navbar-collapse"
                id="navbarSupportedContent"
              >
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  <li className="nav-item">
                    <a className="nav-link " aria-current="page" href="/">
                      Home
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link " href="/user">
                      Users
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link active" href="/employee">
                      Employee
                    </a>
                  </li>
                </ul>
                <form className="d-flex">
                  <button className="btn btn-outline-danger" type="submit">
                    Log Out
                  </button>
                </form>
              </div>
            </div>
          </nav>

          <div className="row d-inline">
            <div className="d-flex justify-content-end">
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <a href="/">Home</a>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    List Employee
                  </li>
                </ol>
              </nav>
            </div>
          </div>

          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-header">
                  <h5 className="card-title">List Employees</h5>
                  <div className="text-end">
                    <Link to={"/employee/add"} className="btn btn-primary">
                      <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon> Add
                      employee
                    </Link>
                  </div>
                </div>
                <div className="card-body">
                  <table className="table table-striped table-hover text-center">
                    <thead>
                      <tr>
                        <th className="text-center">#</th>
                        <th className="text-center">ID</th>
                        <th className="text-center">Name</th>
                        <th className="text-center">Phone</th>
                        <th className="text-center">Position</th>
                        <th className="text-center">Join Date</th>
                        <th className="text-center">Salary</th>
                        <th className="text-center">Image</th>
                        <th className="text-center">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {employees.map((employee, index) => (
                        <tr key={employee.id_employees}>
                          <td>{index + 1}</td>
                          <td>{employee.id}</td>
                          <td>{employee.name}</td>
                          <td>{employee.phone}</td>
                          <td>{employee.position}</td>
                          <td>{employee.join_date}</td>
                          <td>{employee.salary}</td>
                          <td>
                            <img
                              className="img-fluid rounded-circle"
                              style={{ width: 150, height: 150 }}
                              src={employee.url}
                            ></img>
                          </td>
                          <td>
                            <Link
                              to={`/employee/detail/${employee.id_employees}`}
                              className="btn btn-info rounded btn-sm me-1"
                              title="Detail"
                            >
                              <FontAwesomeIcon icon={faEye}></FontAwesomeIcon>
                            </Link>
                            <Link
                              to={`/employee/edit/${employee.id_employees}`}
                              type="submit"
                              className="btn btn-success rounded btn-sm me-1"
                              title="Edit"
                            >
                              <FontAwesomeIcon icon={faEdit}></FontAwesomeIcon>
                            </Link>
                            <button
                              onClick={() =>
                                deleteEmployee(employee.id_employees)
                              }
                              className="btn btn-danger rounded btn-sm"
                              id="btn-delete"
                              title="Delete"
                            >
                              <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeList;
