import React, { useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowsRotate,
  faFloppyDisk,
  faRotateLeft,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const AddUser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [level, setLevel] = useState("");
  const [file, setFile] = useState("");
  const [preview, setPreview] = useState("");

  const navigate = useNavigate();

  const LoadImage = (e) => {
    const image = e.target.files[0];
    setFile(image);
    setPreview(URL.createObjectURL(image));
  };

  const saveUser = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("level", level);
    formData.append("file", file);

    try {
      await axios.post("http://localhost:5000/users", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      navigate("/user");
    } catch (error) {
      console.log(error);
    }
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
                    Add User
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
              <form onSubmit={saveUser}>
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
                          required
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
                          required
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-6 mb-3">
                      <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                          type="password"
                          name="password"
                          className="form-control"
                          id="password"
                          placeholder="Password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-lg-6 mb-3">
                      <div className="form-group">
                        <label htmlFor="level">Level</label>
                        <select
                          name="level"
                          className="form-control"
                          id="level"
                          value={level}
                          onChange={(e) => setLevel(e.target.value)}
                          required
                        >
                          <option value="">Select Level</option>
                          <option value="1">Admin</option>
                          <option value="2">User</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="row">
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
                        <input
                          type="file"
                          className="form-control"
                          id="image"
                          onChange={LoadImage}
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card-footer text-end">
                  <button className="btn btn-dark me-1" type="reset">
                    <FontAwesomeIcon icon={faArrowsRotate}></FontAwesomeIcon>
                    Reset
                  </button>
                  <button className="btn btn-success" type="submit">
                    <FontAwesomeIcon icon={faFloppyDisk}></FontAwesomeIcon> Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddUser;
