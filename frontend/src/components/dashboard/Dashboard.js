import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserTie, faUsers } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const Dashboard = () => {
  const [users, setUser] = useState([]);
  const [employees, setEmployee] = useState([]);

  useEffect(() => {
    getUsers();
    getEmployees();
  }, []);

  const getUsers = async () => {
    const response = await axios.get("http://localhost:5000/users");
    setUser(response.data);
  };

  const getEmployees = async () => {
    const response = await axios.get("http://localhost:5000/employees");
    setEmployee(response.data);
  };

  return (
    <div className="container-fluid">
      <div className="row text-center">
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
              <a className="navbar-brand" href="/">
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
                    <a className="nav-link active" aria-current="page" href="/">
                      Home
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="/user">
                      Users
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="/employee">
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
                <ol class="breadcrumb">
                  <li class="breadcrumb-item">
                    <a href="/">Home</a>
                  </li>
                  <li class="breadcrumb-item active" aria-current="page">
                    List Users
                  </li>
                </ol>
              </nav>
            </div>
          </div>

          <div className="row">
            <div class="container-fluid">
              <div class="row mb-5">
                <div class="col-sm-12">
                  <h1 class="m-0">Dashboard</h1>
                </div>
              </div>
            </div>
          </div>

          <div class="container-fluid">
            <div class="row">
              <div class="col-lg-3 col-6 mx-auto">
                <div class="small-box bg-info">
                  <div class="inner">
                    <h3>{users.length}</h3>
                    <p>Users</p>
                  </div>
                  <div class="icon">
                    <FontAwesomeIcon icon={faUsers}></FontAwesomeIcon>
                  </div>
                  <a href="/user" class="small-box-footer">
                    More info <i class="fas fa-arrow-circle-right"></i>
                  </a>
                </div>
              </div>
              <div class="col-lg-3 col-6 mx-auto">
                <div class="small-box bg-success">
                  <div class="inner">
                    <h3>{employees.length}</h3>
                    <p>Employee</p>
                  </div>
                  <div class="icon">
                    <FontAwesomeIcon icon={faUserTie}></FontAwesomeIcon>
                  </div>
                  <a href="/employee" class="small-box-footer">
                    More info <i class="fas fa-arrow-circle-right"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
