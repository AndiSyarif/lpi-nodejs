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

const UserList = () => {
  const [users, setUser] = useState([]);

  useEffect(() => {
    getUsers();
    return () => {
      $(".table")
        .DataTable({
          responsive: true,
        })
        .destroy();
    };
  }, []);

  const getUsers = async () => {
    const response = await axios.get("http://localhost:5000/users");
    setUser(response.data);

    // Initialize DataTables on the table element
    $(document).ready(function () {
      $(".table").DataTable();
    });
  };

  const deleteUser = async (id_user) => {
    try {
      await axios.delete(`http://localhost:5000/user/${id_user}`);
      getUsers();
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
                    <a className="nav-link active" href="/user">
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
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <a href="/">Home</a>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    List Users
                  </li>
                </ol>
              </nav>
            </div>
          </div>

          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-header">
                  <h5 className="card-title">List Users</h5>
                  <div className="text-end">
                    <Link to={"/user/add"} className="btn btn-primary">
                      <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon> Add User
                    </Link>
                  </div>
                </div>
                <div className="card-body">
                  <table className="table table-striped table-hover text-center">
                    <thead>
                      <tr>
                        <th className="text-center">#</th>
                        <th className="text-center">Nama</th>
                        <th className="text-center">Email</th>
                        <th className="text-center">Level</th>
                        <th className="text-center">Avatar</th>
                        <th className="text-center">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((user, index) => (
                        <tr key={user.id_user}>
                          <td>{index + 1}</td>
                          <td>{user.name}</td>
                          <td>{user.email}</td>
                          <td>
                            {user.level == 1 ? (
                              <span className="badge bg-info">Admin</span>
                            ) : user.level == 2 ? (
                              <span className="badge bg-warning">User</span>
                            ) : /* Handle other cases if needed */
                            null}
                          </td>
                          <td>
                            <img
                              className="img-fluid rounded-circle"
                              style={{ width: 150, height: 150 }}
                              src={user.url}
                            ></img>
                          </td>
                          <td>
                            <Link
                              to={`/user/detail/${user.id_user}`}
                              className="btn btn-info rounded btn-sm me-1"
                            >
                              <FontAwesomeIcon
                                className="me-1"
                                icon={faEye}
                              ></FontAwesomeIcon>
                              Detail
                            </Link>
                            <Link
                              to={`/user/edit/${user.id_user}`}
                              type="submit"
                              className="btn btn-success rounded btn-sm me-1"
                            >
                              <FontAwesomeIcon
                                className="me-1"
                                icon={faEdit}
                              ></FontAwesomeIcon>
                              Edit
                            </Link>
                            <button
                              onClick={() => deleteUser(user.id_user)}
                              className="btn btn-danger rounded btn-sm"
                              id="btn-delete"
                            >
                              <FontAwesomeIcon
                                className="me-1"
                                icon={faTrash}
                              ></FontAwesomeIcon>
                              Delete
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

export default UserList;
