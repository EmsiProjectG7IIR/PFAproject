import { MDBBreadcrumb, MDBBreadcrumbItem, MDBContainer, MDBNavbar, MDBIcon } from 'mdb-react-ui-kit';
import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { MDBBadge, MDBBtn, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';

import axios from "axios";
import { Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import authHeader from '../services/auth-header';

import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";

//import QRCode from 'qrcode.react';

export default function UserList() {

    const [searchQuery, setSearchQuery] = useState('');
    const [filteredUsers, setFilteredUsers] = useState([]);

    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchUserList();
    }, []);


    const fetchUserList = () => {
        axios
            .get('http://localhost:8092/api/user/all')
            .then((response) => {
                setUsers(response.data);
                console.log(response.data);
                setFilteredUsers(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    // export excel
    const exportToExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(users);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Users');
        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        const data = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        saveAs(data, 'users.xlsx');
    };

    // Function to handle search query change
    const handleSearchQueryChange = (event) => {
        const query = event.target.value;
        setSearchQuery(query);

        const filteredUsers = users.filter((user) => {
            return (
                user.username.toLowerCase().includes(query.toLowerCase()) ||
                user.email.toLowerCase().includes(query.toLowerCase()) ||
                user.roles.some((role) => role.name.toLowerCase().includes(query.toLowerCase()))
            );
        });

        setFilteredUsers(filteredUsers);
    };


    // Calculate the number of items per page
    const itemsPerPage = 5;


    // Define the current page number (initially set to the first page)
    const [currentPage, setCurrentPage] = useState(1);

    // Calculate the index range of the items to be displayed on the current page
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this user?")) {
            axios.delete(`http://localhost:8092/api/user/deleteById/${id}`)
                .then(() => {
                    setUsers(users.filter((item) => item.id !== id));
                });
        }
    };

    // Function to handle page change
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (


        <div>
            <div>
                <div>
                </div>
                <div style={{ marginTop: 15, marginLeft: 70 }} className='d-flex justify-content-begin mb-3'>
                    <Link to="/AddUser">
                        <MDBBtn color="success" rounded>
                            <MDBIcon icon="plus" fas /> Add
                        </MDBBtn>

                    </Link>
                    <MDBBtn color="info" rounded onClick={exportToExcel}>
                        <MDBIcon icon="plus" fas /> Export Excel
                    </MDBBtn>
                </div>

                <div style={{ marginTop: 5, marginLeft: 70, marginRight: 70 }}>
                    <h1 style={{ fontSize: '2rem', marginBottom: '2rem' }}>Users List</h1>

                    <div className='mb-3'>
                        <input
                            type='text'
                            className='form-control'
                            placeholder='Search'
                            value={searchQuery}
                            onChange={handleSearchQueryChange}
                        />
                    </div>
                    <div className='table-responsive'>
                        <MDBTable align='middle'>
                            <MDBTableHead>
                                <tr className='table-primary'>
                                    <th scope='col'>ID</th>
                                    <th scope='col'>USERNAME</th>
                                    <th scope='col'>EMAIL</th>
                                    <th scope='col'>ROLE</th>
                                    <th scope='col'>ACTIONS</th>

                                </tr>
                            </MDBTableHead>
                            <MDBTableBody>
                                {users.map((user) => (
                                    <tr key={user.id}>
                                        <td>
                                            <p className='fw-normal mb-1'>{user.id}</p>

                                        </td>
                                        <td>
                                            <div className='d-flex align-items-center'>
                                                <img
                                                    src='https://mdbootstrap.com/img/new/avatars/8.jpg'
                                                    alt=''
                                                    style={{ width: '45px', height: '45px' }}
                                                    className='rounded-circle'
                                                />
                                                <div className='ms-3'>
                                                    <p className='fw-bold mb-1'>{user.username}</p>

                                                </div>

                                            </div>
                                        </td>
                                        <td>
                                            <div className='ms-3'>

                                                <p className='text-muted mb-1'>{user.email}</p>

                                            </div>

                                        </td>

                                        <td>
                                            <div className='ms-3'>
                                                <p className='fw-normal mb-1'>{user.role}</p>
                                            </div>
                                        </td>
                                        <td>
                                            <Link to={`/EditUser/${user.id}`} style={{ marginRight: 2 }} className="btn btn-warning btn-rounded btn-sm">
                                                <FontAwesomeIcon icon={faPen} />
                                            </Link>
                                            <MDBBtn color='danger' rounded size='sm' onClick={() => handleDelete(user.id)}>
                                                <FontAwesomeIcon icon={faTrash} />
                                            </MDBBtn>
                                        </td>
                                    </tr>))}

                            </MDBTableBody>
                        </MDBTable>
                    </div>
                    <div className="d-flex justify-content-center">
                        <MDBBtn
                            color="primary"
                            size="sm"
                            disabled={currentPage === 1}
                            onClick={() => handlePageChange(currentPage - 1)}
                        >
                            Previous
                        </MDBBtn>

                    </div>


                </div>
            </div>


        </div>
    );
}