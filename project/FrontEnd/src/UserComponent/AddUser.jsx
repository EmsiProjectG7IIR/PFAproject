import React, { useState, useEffect } from "react";
import axios from "axios";
import { Calendar } from 'primereact/calendar';
import { Navigate, useNavigate } from "react-router-dom";
import {
    MDBInput, MDBInputGroup, MDBBtn, MDBRadio, MDBCheckbox, MDBValidation, MDBValidationItem, MDBBreadcrumb, MDBBreadcrumbItem, MDBContainer, MDBNavbar,

} from 'mdb-react-ui-kit';
import DatePicker from 'react-datepicker';
import Select from 'react-select';
import 'react-datepicker/dist/react-datepicker.css';
import authHeader from "../services/auth-header";



const AddUser = () => {
    const [username, setUsername] = useState([]);
    const [password, setPassword] = useState([]);
    const [email, setEmail] = useState([]);

    const [roles, setRoles] = useState([]);
    const navigate = useNavigate();


    const handleSubmit2 = (event) => {
        event.preventDefault();

        axios
            .post('http://localhost:8092/api/auth/signup',{
                username: username,
                password: password,
                email: email,
                roles: [roles],
            }, { headers: authHeader() })
            .then((response) => {
                navigate('/user');
            })
            .catch((error) => {
                console.log(error);
            });
    };


    const handleTypeChange = (selectedOption) => {
        setRoles(selectedOption.value);
    };

    return (
        <div >

            <div>
                <MDBNavbar expand='lg' light bgColor='light'>
                    <MDBContainer fluid>
                        <MDBBreadcrumb>
                            <MDBBreadcrumbItem>
                                <a href='/'>Home</a>
                            </MDBBreadcrumbItem>
                            <MDBBreadcrumbItem>
                                <a href='/AddUser'>AddUser</a>
                            </MDBBreadcrumbItem>
                            <MDBBreadcrumbItem active>
                                Form
                            </MDBBreadcrumbItem>
                        </MDBBreadcrumb>
                    </MDBContainer>
                </MDBNavbar>
            </div>
            <div style={{ marginTop: 20, marginLeft: 70, marginRight: 70 }}>
                <h1 style={{ fontSize: '2rem', marginBottom: '2rem' }}>Add User</h1>
                <MDBValidation onSubmit={handleSubmit2} className='row g-3' isValidated>
                    <div className='col-md-6'>
                        <MDBValidationItem feedback='' invalid>
                            <MDBInput
                                value={username}
                                name='username'
                                onChange={(event) => setUsername(event.target.value)}
                                id='username'
                                required
                                label='Username'
                            />
                        </MDBValidationItem>
                    </div>
                    <div className='col-md-6'>
                        <MDBValidationItem feedback='' invalid>
                            <MDBInput
                                value={email}
                                name='email'
                                onChange={(event) => setEmail(event.target.value)}
                                id='email'
                                required
                                label='Email'
                            />
                        </MDBValidationItem>
                    </div>
                    <div className='col-md-6'>
                        <MDBValidationItem feedback='' invalid>
                            <MDBInput
                                value={password}
                                name='password'
                                onChange={(event) => setPassword(event.target.value)}
                                id='password'
                                required
                                label='Password'
                            />
                        </MDBValidationItem>
                    </div>
                    <div className='col-md-6'>
                        <MDBValidationItem feedback='' invalid>
                            <label htmlFor='select1' className='form-label'>
                                Role
                            </label>
                            <Select
                                id='select1'
                                required
                                className='form-control'
                                onChange={handleTypeChange}
                                options={[
                                    { value: "admin", label: 'Admin' },
                                    { value: "user", label: 'User' }
                                ]}
                            />
                        </MDBValidationItem>

                    </div>

                    <div className='col-12'>
                        <MDBBtn type='submit'>Save</MDBBtn>
                    </div>
                </MDBValidation>
            </div>

        </div>
    );
};

export default AddUser;
