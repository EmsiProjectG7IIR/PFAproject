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
import userService from "../services/user.service";

const EditUser = () => {
    const [userId, setUserId] = useState("");
    const [initialUser, setInitialUser] = useState([]);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState({});
    const [roleId, setRoleId] = useState("");
    const [roleName, setRoleName] = useState("");
    const [roles, setRoles] = useState([]);
    const [users, setUsers] = useState([]);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        loadUsers();
        loadRoles();
    }, []);

    const loadUsers = async () => {
        try {
            const result = await axios.get(`http://localhost:8092/api/auth/findById/${id}`, { headers: authHeader() });
            const userData = result.data;
            setUsername(userData.username);
            setPassword(userData.password);
            setEmail(userData.email);
            setRoles(userData.roles);
            setRoleName(roles.map((role) => ({ value: role.id, label: role.name })))
            console.log("User Data:", userData);
            console.log("User Rore:", roleName);
        } catch (error) {
            console.error("Error loading user:", error);
        }
    };

    const loadRoles = async () => {
        try {
            const response = await axios.get("http://localhost:8092/api/auth/users", { headers: authHeader() });
            setRoles(response.data);
            console.log("Roles Data:", response.data);
        } catch (error) {
            console.error("Error loading roles:", error);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        axios
            .put(
                `http://localhost:8092/api/demande/update/${id}`,
                {
                    id: id,
                    username: username,
                    email: email,
                    password: password,
                    roles: {
                        id: roleId,
                    },
                },
                { headers: authHeader() }
            )
            .then(() => {
                navigate("/user");
            })
            .catch((error) => {
                console.error("Error updating user:", error);
            });
    };

    const handleRoleChange = (selectedOption) => {
        setRoleId(selectedOption.value);
    };

    return (
        <div>
            <MDBNavbar expand="lg" light bgColor="light">
                <MDBContainer fluid>
                    <MDBBreadcrumb>
                        <MDBBreadcrumbItem>
                            <a href="/">Home</a>
                        </MDBBreadcrumbItem>
                        <MDBBreadcrumbItem>
                            <a href="/editUser">Edit User</a>
                        </MDBBreadcrumbItem>
                        <MDBBreadcrumbItem active>Form</MDBBreadcrumbItem>
                    </MDBBreadcrumb>
                </MDBContainer>
            </MDBNavbar>
            <div style={{ marginTop: 20, marginLeft: 70, marginRight: 70 }}>
                <h1 style={{ fontSize: "2rem", marginBottom: "2rem" }}>Edit User</h1>
                <MDBValidation onSubmit={handleSubmit} className="row g-3" isValidated>
                    <div className="col-md-6">
                        <label htmlFor="tech" className="form-label">
                            Username
                        </label>
                        <MDBValidationItem feedback="" invalid>
                            <MDBInput
                                value={username}
                                name="username"
                                onChange={(event) => setUsername(event.target.value)}
                                id="username"
                                required

                            />
                        </MDBValidationItem>
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="tech" className="form-label">
                            Email
                        </label>
                        <MDBValidationItem feedback="" invalid>
                            <MDBInput
                                value={email}
                                name="email"
                                onChange={(event) => setEmail(event.target.value)}
                                id="email"
                                required
                            />
                        </MDBValidationItem>
                    </div>


                    <div className="col-md-6">
                        <label htmlFor="tech" className="form-label">
                            Password
                        </label>
                        <MDBValidationItem feedback="" invalid>
                            <MDBInput
                                value={password}
                                name="password"
                                type="password"
                                onChange={(event) => setPassword(event.target.value)}
                                id="password"
                                required

                            />
                        </MDBValidationItem>
                    </div>

                    <div className='col-md-6'>
                        <MDBValidationItem feedback='' invalid>
                            <label htmlFor='select2' className='form-label'>
                                User
                            </label>
                            <Select
                                id='select2'
                                required
                                className='form-control'
                                value={roleId}
                                onChange={handleRoleChange}
                                options={roles.map((role) => ({ value: role.id, label: role.name }))}
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

export default EditUser;
