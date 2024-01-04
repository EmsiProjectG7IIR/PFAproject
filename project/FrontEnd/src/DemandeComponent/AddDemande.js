import React, { useState, useEffect } from "react";
import axios from "axios";
import { Calendar } from "primereact/calendar";
import { Navigate, useNavigate } from "react-router-dom";
import {
  MDBInput,
  MDBBtn,
  MDBValidation,
  MDBValidationItem,
  MDBNavbar,
  MDBContainer,
  MDBBreadcrumb,
  MDBBreadcrumbItem,
} from "mdb-react-ui-kit";
import DatePicker from 'react-datepicker';


import Select from "react-select";
import authHeader from "../services/auth-header";

const AddDemande = () => {
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [dateCreation, setDateCreation] = useState(null);
  const [etat, setEtat] = useState("");
  const [user, setUser] = useState([]);
  const [userId, setUserId] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post(`http://localhost:8092/api/demande/save`, {
        description: description,
        type: type,
        date: dateCreation,
        status: etat,
        utilisateur: {
          id: userId,
        },
      },{ headers: authHeader()})
      .then((response) => {
        navigate("/demandelist");
      });
  };
  const handleUserChange = (selectedOption) => {
    const UserId = selectedOption.value;
    setUserId(UserId);
  };
  useEffect(() => {
    axios.get("http://localhost:8092/api/auth/users", { headers: authHeader() }).then((response) => {
      setUser(response.data);
      console.log(user);
    });
  }, []);

  return (
    <div>
      <div>
        <MDBNavbar expand="lg" light bgColor="light">
          <MDBContainer fluid>
            <MDBBreadcrumb>
              <MDBBreadcrumbItem>
                <a href="/">Home</a>
              </MDBBreadcrumbItem>
              <MDBBreadcrumbItem>
                <a href="/AddDemande">Add Demande</a>
              </MDBBreadcrumbItem>
              <MDBBreadcrumbItem active>Form</MDBBreadcrumbItem>
            </MDBBreadcrumb>
          </MDBContainer>
        </MDBNavbar>
      </div>
      <div style={{ marginTop: 20, marginLeft: 70, marginRight: 70 }}>
        <h1 style={{ fontSize: "2rem", marginBottom: "2rem" }}>Add Demande</h1>
        <MDBValidation onSubmit={handleSubmit} className="row g-3">
          <div className="col-md-6">
            <label htmlFor="tech" className="form-label">
              Description
            </label>
            <MDBValidationItem feedback="" invalid>
              <MDBInput
                value={description}
                name="description"
                onChange={(event) => setDescription(event.target.value)}
                id="description"
                required

              />
            </MDBValidationItem>
          </div>
          <div className="col-md-6">
            <label htmlFor="tech" className="form-label">
              Type
            </label>
            <MDBValidationItem feedback="" invalid>
              <MDBInput
                value={type}
                name="type"
                onChange={(event) => setType(event.target.value)}
                id="type"
                required

              />
            </MDBValidationItem>
          </div>
          <div className='col-md-6'>
            <label htmlFor="tech" className="form-label">
              Date De Creation
            </label>
            <MDBValidationItem feedback='' invalid>

              <DatePicker
                selected={dateCreation}
                name='tech'
                onChange={date => setDateCreation(date)}
                id='tech'
                required
                className='form-control'
              />
            </MDBValidationItem>
          </div>


          <div className="col-md-6">
            <label htmlFor="tech" className="form-label">
              Status
            </label>
            <MDBValidationItem feedback="" invalid>
              <MDBInput
                value={etat}
                name="etat"
                onChange={(event) => setEtat(event.target.value)}
                id="etat"
                required

              />
            </MDBValidationItem>
          </div>
          <div className="col-md-6">
            <MDBValidationItem feedback="" invalid>
              <label htmlFor="select3" className="form-label">
                User
              </label>
              <Select
                id="select3"
                required
                className="form-control"
                onChange={handleUserChange}
                options={user.map((kam) => ({
                  value: kam.id,
                  label: kam.username,
                }))}
              />
            </MDBValidationItem>
          </div>
          <div className="col-12">
            <MDBBtn type="submit">Save</MDBBtn>
          </div>
        </MDBValidation>
      </div>
    </div>
  );
};

export default AddDemande;
