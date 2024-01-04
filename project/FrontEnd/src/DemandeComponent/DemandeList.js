import {
  MDBBreadcrumb,
  MDBBreadcrumbItem,
  MDBContainer,
  MDBNavbar,
  MDBIcon,
  MDBTypography,
} from "mdb-react-ui-kit";
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import {
  MDBBadge,
  MDBBtn,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
} from "mdb-react-ui-kit";
import {
  faCircle,
  faCircleInfo,
  faPen,
  faTrash,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";

import axios from "axios";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
import authHeader from "../services/auth-header";

import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function OffreList() {
  const [searchQuery, setSearchQuery] = useState("");
  const [offres, setOffres] = useState([]);

  const [filteredOffres, setFilteredOffres] = useState([
    {
      id: 1,
      description: "John",
      type: "iiii@gmail.com",
      dateCreation: "jjj",
      etat: "active",
      user: "oumaima",
    },
    {
      id: 2,
      description: "Alice",
      type: "jjjj@gmail.com",
      dateCreation: "ooo",
      etat: "inactive",
      user: "oumaima",
    },
    {
      id: 3,
      description: "Bob",
      type: "lllll@gmail.com",
      dateCreation: "pppp",
      etat: "active",
      user: "oumaima",
    },
    // Add more static values as needed
  ]);

  useEffect(() => {
    fetchOffreList();
  }, []);

  const fetchOffreList = () => {
    axios
      .get("http://localhost:8092/api/demande/all", { headers : authHeader()})
      .then((response) => {
        setOffres(response.data);
        setFilteredOffres(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(offres);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Offres");
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const data = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    saveAs(data, "offres.xlsx");
  };

  const handleSearchQueryChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);

    const filteredOffres = offres.filter((offre) => {
      return (
        offre.description.toLowerCase().includes(query.toLowerCase()) ||
        offre.type.toLowerCase().includes(query.toLowerCase()) ||
        offre.etat.toLowerCase().includes(query.toLowerCase())
      );
    });

    setFilteredOffres(filteredOffres);
  };

  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  // Calculate the total number of pages
  const totalPages = Math.ceil(offres.length / itemsPerPage);
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const handleDelete = (id) => {
    if (
      window.confirm("Are you sure you want to delete this requestForQuote?")
    ) {
      axios
        .delete("/api/demande/id", {
          data: { id: id },
        }, { headers : authHeader()})
        .then(() => {
          setOffres(offres.filter((item) => item.id !== id));
          //setFilteredUsers(rfqs.filter((item) => item.id !== id));
        });
    }
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
                <a href="/RequestForQuote">Demande List</a>
              </MDBBreadcrumbItem>
              <MDBBreadcrumbItem active>Data</MDBBreadcrumbItem>
            </MDBBreadcrumb>
          </MDBContainer>
        </MDBNavbar>
      </div>
      <div>
        <div className="container mt-5 mb-5 d-flex justify-content-center ms-2">
          <div className="row">
            <div
              className="col-lg-4 col-sm-12  col-md-4 "
              style={{ textAlign: "center" }}
            >
              <Link to="/addDemande">
                <FontAwesomeIcon icon="fa-solid fa-plus" />
                <MDBBtn color="success">Add</MDBBtn>
              </Link>

              <MDBBtn
                color="info"
                onClick={exportToExcel}
                style={{ marginLeft: "5px" }}
              >
                Export Excel
              </MDBBtn>
            </div>
            <div className="col-lg-5 col-sm-6 col-md-5  mt-2 ">
              <h1 style={{ textAlign: "center", fontSize: "1.5rem" }}>
                {" "}
                <MDBTypography tag="small" className="text-muted text-sm">
                  Request for quote
                </MDBTypography>{" "}
                Details{" "}
              </h1>
            </div>
            <div className="col-lg-3 col-sm-6 col-md-3">
              <div className=" d-flex justify-content-center">
                <div className="input-group rounded ">
                  <input
                    type="search"
                    class="form-control rounded"
                    placeholder="Search"
                    aria-label="Search"
                    aria-describedby="search-addon"
                    value={searchQuery}
                    onChange={handleSearchQueryChange}
                  />
                  <span class="input-group-text border-0" id="search-addon">
                    <i className="text-primary h1">
                      <FontAwesomeIcon icon={faSearch} size="2xs" />{" "}
                    </i>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div style={{ marginTop: 5, marginLeft: 70, marginRight: 70 }}>
          <div className="table-responsive">
            <MDBTable align="middle">
              <MDBTableHead>
                <tr className="table-primary">
                  <th scope="col">ID</th>
                  <th scope="col">Description</th>
                  <th scope="col">Type</th>
                  <th scope="col">Date De Creation</th>
                  <th scope="col">Etat</th>
                  <th scope="col">User</th>
                  <th scope="col">Action</th>
                </tr>
              </MDBTableHead>
              <MDBTableBody>
                {offres.map((offre) => (
                  <tr key={offre.id}>
                    <td>
                      <p className="fw-normal mb-1">{offre.id}</p>
                    </td>
                    <td>
                      <div className="ms-3">
                        <p className="text-muted mb-1">{offre.description}</p>
                      </div>
                    </td>
                    <td>
                      <div className="ms-3">
                        <p className="text-muted mb-1">{offre.type}</p>
                      </div>
                    </td>
                    <td>
                      <div className="ms-3">
                        <p className="text-muted mb-1">{offre.date}</p>
                      </div>
                    </td>
                    <td>
                      <MDBBadge color="success" pill>
                        {offre.status}
                      </MDBBadge>
                    </td>
                    <td>
                      <div className="d-flex align-items-center">
                        <img
                          src="https://mdbootstrap.com/img/new/avatars/8.jpg"
                          alt=""
                          style={{ width: "45px", height: "45px" }}
                          className="rounded-circle"
                        />
                        <div className="ms-3">
                          <p className="fw-bold mb-1">

                          </p>
                        </div>
                      </div>
                    </td>
                    <td>
                      <Link
                        to={`/`}
                        className="btn btn-info btn-rounded btn-sm"
                        style={{ marginRight: 2 }}
                      >
                        <FontAwesomeIcon icon={faCircleInfo} />
                      </Link>

                      <Link
                        to={`/editDemande`}
                        style={{ marginRight: 2 }}
                        className="btn btn-warning btn-rounded btn-sm"
                      >
                        <FontAwesomeIcon icon={faPen} />
                      </Link>

                      <MDBBtn
                        color="danger"
                        rounded
                        size="sm"
                        onClick={() => handleDelete(offre.id)}
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </MDBBtn>
                    </td>
                  </tr>
                ))}
              </MDBTableBody>
            </MDBTable>
          </div>
          {/** Pagination  */}
          <div
            className="d-flex justify-content-end "
            style={{ paddingRight: "20px" }}
          >
            <MDBBtn
              color="primary"
              size="sm"
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
            >
              Previous
            </MDBBtn>
            {[...Array(totalPages)].map((_, index) => (
              <MDBBtn
                key={index}
                color={currentPage === index + 1 ? "primary" : "light"}
                size="sm"
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </MDBBtn>
            ))}
            <MDBBtn
              color="primary"
              size="sm"
              disabled={currentPage === totalPages}
              onClick={() => handlePageChange(currentPage + 1)}
            >
              Next
            </MDBBtn>
          </div>
          <br /> <br />
        </div>
      </div>
    </div>
  );
}
