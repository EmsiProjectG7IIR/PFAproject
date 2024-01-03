import React, { useState, useEffect } from "react";
import axios from "axios";
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
import DatePicker from "react-datepicker";
import Select from "react-select";
import "react-datepicker/dist/react-datepicker.css";
import authHeader from "../services/auth-header";
import { useNavigate, useParams } from "react-router-dom";

const EditDemande = () => {
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [dateCreation, setDateCreation] = useState(new Date());
  const [etat, setEtat] = useState("");
  const [user, setUser] = useState([]);
  const [userId, setUserId] = useState("");

  // Convert the date string to a Date object
  useEffect(() => {
    if (dateCreation) {
      setDateCreation(new Date(dateCreation));
    }
  }, [dateCreation]);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    loadRfq();
  }, []);

  const loadRfq = async () => {
    const result = await axios.get(`/api/demande/id/${id}`);
    const rfqData = result.data;

    setDescription(rfqData.description);
    setType(rfqData.type);
    setDateCreation(rfqData.date);
    setEtat(rfqData.status);
    setUser(result.data.utilisateur);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .put(
        `/api/demande/update/${id}`,
        {
          id: id,
          description: description,
          type: type,
          date: dateCreation,
          status: etat,
          utilisateur: {
            id: userId,
          },
        },
        { headers: authHeader() }
      )
      .then(() => {
        navigate("/RequestForQuote");
      })
      .catch((error) => {
        console.error("Error updating RFQ:", error);
      });
  };

  return (
    <div>
      <div>
        <MDBNavbar expand="lg" light bgColor="light">
          <MDBContainer fluid>
            <MDBBreadcrumb>
              <MDBBreadcrumbItem>
                <a href="/Home">Home</a>
              </MDBBreadcrumbItem>
              <MDBBreadcrumbItem>
                <a href="/EditDemande">Edit Demande</a>
              </MDBBreadcrumbItem>
              <MDBBreadcrumbItem active>Form</MDBBreadcrumbItem>
            </MDBBreadcrumb>
          </MDBContainer>
        </MDBNavbar>
      </div>
      <div style={{ marginTop: 20, marginLeft: 70, marginRight: 70 }}>
        <h1 style={{ fontSize: "2rem", marginBottom: "2rem" }}>Edit Demande</h1>
        <MDBValidation onSubmit={handleSubmit} className="row g-3" isValidated>
          <div className="col-md-6">
            <MDBValidationItem feedback="" invalid>
              <MDBInput
                value={description}
                name="description"
                onChange={(event) => setDescription(event.target.value)}
                id="description"
                required
                label="Description"
              />
            </MDBValidationItem>
          </div>
          <div className="col-md-6">
            <MDBValidationItem feedback="" invalid>
              <MDBInput
                value={type}
                name="type"
                onChange={(event) => setType(event.target.value)}
                id="type"
                required
                label="Type"
              />
            </MDBValidationItem>
          </div>
          <div className="col-md-6">
            <MDBValidationItem feedback="" invalid>
              <label htmlFor="date" className="form-label">
                Date De Creation
              </label>
              <DatePicker
                selected={dateCreation}
                name="fin"
                onChange={(date) => setDateCreation(date)}
                id="fin"
                required
                className="form-control"
              />
            </MDBValidationItem>
          </div>
          <div className="col-md-6">
            <MDBValidationItem feedback="" invalid>
              <MDBInput
                value={etat}
                name="etat"
                onChange={(event) => setEtat(event.target.value)}
                id="etat"
                required
                label="Etat"
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
            <MDBBtn type="submit">Edit</MDBBtn>
          </div>
        </MDBValidation>
      </div>
    </div>
  );
};

export default EditDemande;
