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
  const [type, setType] = useState(null);
  const [types, setTypes] = useState([]);
  const [dateCreation, setDateCreation] = useState(null);
  const [status, setStatus] = useState("");
  const [user, setUser] = useState([]);
  const [userId, setUserId] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    // Fetch the user from local storage or wherever it's stored
    const storedUser = JSON.parse(localStorage.getItem('user'));
    setUser(storedUser);
    console.log(storedUser.id);
    setUserId(storedUser.id)
    console.log("wikwiiik" + userId);
    console.log(user.id);
  }, []);
  useEffect(() => {
    axios.get("http://localhost:8092/api/type/all", { headers: authHeader() })
      .then((response) => {
        setTypes(response.data);
        console.log("hhhh" + types);
      })
      .catch((error) => {
        console.error("Error fetching types:", error);
      });
  }, []);
  const handleSubmit = (event) => {
    event.preventDefault();

    axios.get("http://localhost:8092/api/auth/users", { headers: authHeader() })
      .then((response) => {
        const user = response.data;
        // Find the user with the logged-in user's ID
        const loggedInUser = user.find(u => u.id === user.id);
        console.log("Selected Type: ", type);
        axios.post("http://localhost:8092/api/demande/save", {
          description: description,
          type: {
            id: type.value
          },
          date: dateCreation,
          user: {
            id: userId,
          },
        }, { headers: authHeader() })
          .then(() => {
            navigate("/demandelist");
          });
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
              <textarea
                id="description"
                className="form-control"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                rows="4" // You can adjust the number of rows as needed
              />
            </MDBValidationItem>
          </div>
          <div className="col-md-6">
            <label htmlFor="type" className="form-label">
              Type
            </label>
            <MDBValidationItem feedback="" invalid>
              <Select
                options={types.map(t => ({ value: t.id, label: t.type }))}
                value={type}
                onChange={(selectedOption) => setType(selectedOption)}
                isSearchable
                placeholder="Select Type"
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






          <div className="col-12">
            <MDBBtn type="submit">Save</MDBBtn>
          </div>
        </MDBValidation>
      </div >
    </div >
  );
};

export default AddDemande;
