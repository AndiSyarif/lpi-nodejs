import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotateLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useParams } from "react-router-dom";

const DetailEmployee = () => {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [position, setPosition] = useState("");
  const [join_date, setJoin_date] = useState("");
  const [salary, setSalary] = useState("");
  const [file, setFile] = useState("");
  const [preview, setPreview] = useState("");
  const { id_employees } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    getEmployeeById();
  }, []);

  const getEmployeeById = async () => {
    const response = await axios.get(
      `http://localhost:5000/employee/${id_employees}`
    );
    setId(response.data.id);
    setName(response.data.name);
    setPhone(response.data.phone);
    setAddress(response.data.address);
    setPosition(response.data.position);

    // Format the join_date before setting it in the state
    const formattedJoinDate = new Date(response.data.join_date)
      .toISOString()
      .split("T")[0];
    setJoin_date(formattedJoinDate);

    setSalary(response.data.salary);
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
                  <li className="breadcrumb-item">
                    <a href="/employee">Employee</a>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Edit Employee
                  </li>
                </ol>
              </nav>
            </div>
          </div>

          <div className="container">
            <div className="card">
              <div className="card-header">
                <div className="text-end">
                  <a href="/employee" className="btn btn-warning btn-sm">
                    <FontAwesomeIcon icon={faRotateLeft}></FontAwesomeIcon> Back
                  </a>
                </div>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-lg-6 mb-3">
                    <div className="form-group">
                      <label htmlFor="id">ID Employee</label>
                      <input
                        type="number"
                        name="id"
                        className="form-control"
                        id="id"
                        placeholder="ID Employee"
                        value={id}
                        onChange={(e) => setId(e.target.value)}
                        disabled
                      />
                    </div>
                  </div>
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
                </div>
                <div className="row">
                  <div className="col-lg-6 mb-3">
                    <div className="form-group">
                      <label htmlFor="phone">Phone</label>
                      <input
                        type="number"
                        name="phone"
                        className="form-control"
                        id="phone"
                        placeholder="Phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        disabled
                      />
                    </div>
                  </div>
                  <div className="col-lg-6 mb-3">
                    <div className="form-group">
                      <label htmlFor="position">Position</label>
                      <input
                        type="text"
                        name="position"
                        className="form-control"
                        id="position"
                        placeholder="Position"
                        value={position}
                        onChange={(e) => setPosition(e.target.value)}
                        disabled
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-6 mb-3">
                    <div className="form-group">
                      <label htmlFor="join_date">Join Date</label>
                      <input
                        type="date"
                        name="join_date"
                        className="form-control"
                        id="join_date"
                        placeholder="Join Date"
                        value={join_date.split(" ")[0]}
                        onChange={(e) => setJoin_date(e.target.value)}
                        disabled
                      />
                    </div>
                  </div>
                  <div className="col-lg-6 mb-3">
                    <div className="form-group">
                      <label htmlFor="salary">Salary</label>
                      <input
                        type="number"
                        name="salary"
                        className="form-control"
                        id="salary"
                        placeholder="Salary"
                        value={salary}
                        onChange={(e) => setSalary(e.target.value)}
                        disabled
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-6 mb-3">
                    <div className="form-group">
                      <label htmlFor="address" className="text-label">
                        Address
                      </label>
                      <textarea
                        name="address"
                        className="form-control"
                        id="address"
                        placeholder="Address"
                        rows={3}
                        cols={100}
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        disabled
                      />
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

export default DetailEmployee;
