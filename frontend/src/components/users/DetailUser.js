import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotateLeft } from "@fortawesome/free-solid-svg-icons";

const DetailUser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [level, setLevel] = useState("");
  const [file, setFile] = useState("");
  const [preview, setPreview] = useState("");
  const { id_user } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    getUserById();
  }, []);

  const getUserById = async () => {
    const response = await axios.get(`http://localhost:5000/user/${id_user}`);
    setName(response.data.name);
    setEmail(response.data.email);
    setLevel(response.data.level);
    setFile(response.data.image);
    setPreview(response.data.url);
  };

  return (
    <div className="container-fluid">
      <div className="row">
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
                  <li className="breadcrumb-item">
                    <a href="/user">Users</a>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Edit User
                  </li>
                </ol>
              </nav>
            </div>
          </div>

          <div className="container">
            <div className="card">
              <div className="card-header">
                <div className="text-end">
                  <a href="/user" className="btn btn-warning btn-sm">
                    <FontAwesomeIcon icon={faRotateLeft}></FontAwesomeIcon> Back
                  </a>
                </div>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-lg-6 mb-3">
                    <div className="form-group">
                      <label htmlFor="name">Full Name</label>
                      <input
                        type="text"
                        name="name"
                        className="form-control"
                        id="name"
                        placeholder="Full Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        disabled
                      />
                    </div>
                  </div>
                  <div className="col-lg-6 mb-3">
                    <div className="form-group">
                      <label htmlFor="email">Email</label>
                      <input
                        type="email"
                        name="email"
                        className="form-control"
                        id="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-6 mb-3">
                    <div className="form-group">
                      <label htmlFor="level">Level</label>
                      <select
                        name="level"
                        className="form-control"
                        id="level"
                        value={level}
                        onChange={(e) => setLevel(e.target.value)}
                        disabled
                      >
                        <option value="">Select Level</option>
                        <option value="1">Admin</option>
                        <option value="2">User</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-lg-6 mb-3">
                    <div className="form-group">
                      <label htmlFor="image" className="text-label">
                        Image
                      </label>
                      <div className="mb-3" id="img-prev">
                        {preview ? (
                          <img
                            className="img-preview img-fluid"
                            src={preview}
                            alt="Preview"
                            width="200px"
                            height="200px"
                          />
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailUser;
