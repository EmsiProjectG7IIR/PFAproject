import logo from "./logo.svg";
import "./App.css";
import UserList from "./UserComponent/UserList";

import { Route, Routes } from "react-router-dom";
import Login from "./Register/Login";
import SignIn from "./Register/SignIn";
import DemandeList from "./DemandeComponent/DemandeList";
import AddDemande from "./DemandeComponent/AddDemande";
import EditDemande from "./DemandeComponent/EditDemande";
import {
  MDBCollapse,
  MDBContainer,
  MDBDropdown,
  MDBDropdownItem,
  MDBDropdownMenu,
  MDBDropdownToggle,
  MDBIcon,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBNavbarNav,
  MDBNavbarToggler,
  MDBBtn,
} from "mdb-react-ui-kit";
import React, { useState } from "react";
import Sidebar from "./SideBar";
import AddUser from "./UserComponent/AddUser";

function App() {
  const [openBasic, setOpenBasic] = useState(false);

  return (
    <div>
      <MDBNavbar expand="lg" light bgColor="light">
        <MDBContainer fluid>
          <MDBNavbarBrand href="#">Gestion de Demandes</MDBNavbarBrand>

          <MDBNavbarToggler
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
            onClick={() => setOpenBasic(!openBasic)}
          >
            <MDBIcon icon="bars" fas />
          </MDBNavbarToggler>

          <MDBCollapse navbar open={openBasic}>
            <MDBNavbarNav className="mr-auto mb-2 mb-lg-0">
              <MDBNavbarItem>
                <MDBNavbarLink active aria-current="page" href="#">
                  Home
                </MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <MDBNavbarLink href="#">Link</MDBNavbarLink>
              </MDBNavbarItem>

              <MDBNavbarItem>
                <MDBDropdown>
                  <MDBDropdownToggle tag="a" className="nav-link" role="button">
                    Dropdown
                  </MDBDropdownToggle>
                  <MDBDropdownMenu>
                    <MDBDropdownItem link>Action</MDBDropdownItem>
                    <MDBDropdownItem link>Another action</MDBDropdownItem>
                    <MDBDropdownItem link>Something else here</MDBDropdownItem>
                  </MDBDropdownMenu>
                </MDBDropdown>
              </MDBNavbarItem>

              <MDBNavbarItem>
                <MDBNavbarLink
                  disabled
                  href="#"
                  tabIndex={-1}
                  aria-disabled="true"
                >
                  Disabled
                </MDBNavbarLink>
              </MDBNavbarItem>
            </MDBNavbarNav>
          </MDBCollapse>
        </MDBContainer>
      </MDBNavbar>

      <Routes>
        {/* Add the following lines for SignIn and SignUp routes */}

        <Route path="/" element={<Login />} />
        <Route path="/register" element={<SignIn />} />
        <Route path="/user" element={<UserList />} />
        <Route path="/AddUser" element={<AddUser />} />
        <Route path="/demandelist" element={<DemandeList />} />
        <Route path="/addDemande" element={<AddDemande />} />
        <Route path="/editDemande" element={<EditDemande />} />
      </Routes>
    </div>
  );
}

export default App;
