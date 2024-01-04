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

const DemandeDetails = () => {
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
    useEffect(() => {

    }, []);

    const loadRfq = async () => {
        const result = await axios.get(`http://localhost:8092/api/demande/find/${id}`);
        const rfqData = result.data;

        setDescription(rfqData.description);
        setType(rfqData.type);
        setDateCreation(rfqData.date);
        setEtat(rfqData.status);
        setUser(rfqData.utilisateur);
        console.log("wikwik " + rfqData.utilisateur.username);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        axios
            .put(
                `http://localhost:8092/api/demande/update/${id}`,
                {
                    id: id,
                    description: description,
                    type: type,
                    date: dateCreation,
                    status: etat,
                    utilisateur: {
                        id: userId,
                    },
                }

            )
            .then(() => {
                navigate("/demandelist");
            })
            .catch((error) => {
                console.error("Error updating RFQ:", error);
            });
    };
    const handleUserChange = (selectedOption) => {
        const UserId = selectedOption.value;
        setUserId(UserId);
    };
    useEffect(() => {
        axios.get("http://localhost:8092/api/user/all").then((response) => {
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
                                <a href="/DemandeDetails"> Demande Details</a>
                            </MDBBreadcrumbItem>
                            <MDBBreadcrumbItem active>Form</MDBBreadcrumbItem>
                        </MDBBreadcrumb>
                    </MDBContainer>
                </MDBNavbar>
            </div>
            <div style={{ marginTop: 20, marginLeft: 70, marginRight: 70 }}>
                <h1 style={{ fontSize: "2rem", marginBottom: "2rem" }}>Demande Details</h1>
                <MDBValidation onSubmit={handleSubmit} className="row g-3" isValidated>
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
                                disabled

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
                                disabled
                            />
                        </MDBValidationItem>
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="date" className="form-label">
                            Date De Creation
                        </label>
                        <MDBValidationItem feedback="" invalid className="col-md-6">
                            <DatePicker
                                selected={dateCreation}
                                name="fin"
                                onChange={(date) => setDateCreation(date)}
                                id="fin"
                                required
                                className="form-control"
                                disabled
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
                                disabled

                            />
                        </MDBValidationItem>
                    </div>
                    <div className="col-md-6">
                        <MDBValidationItem feedback="" invalid>
                            <label htmlFor="select3" className="form-label">
                                User
                            </label>
                            <MDBInput
                                value={user.email}
                                name="user"
                                id="user"
                                required
                                disabled

                            />
                        </MDBValidationItem>
                    </div>


                </MDBValidation>
            </div>
        </div>
    );
};

export default DemandeDetails;
