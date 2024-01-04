import logo from "./logo.svg";
import "./App.css";
import UserList from "./UserComponent/UserList";
import {
  faBars,
  faCircle,
  faCircleInfo,
  faPen,
  faTrash,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { Link, Route, Routes } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
import React, { Component, useState } from "react";
import Sidebar from "./SideBar";
import AddUser from "./UserComponent/AddUser";
import AuthService from "./services/auth.service";
import DemandeDetails from "./DemandeComponent/DemandeDetails";
import UserRoute from "./ProtectedRoute/UserRoute";
import NotFoundPage from "./ProtectedRoute/NoFoundPage";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute";

class App extends Component {



  constructor(props) {
    super(props);
    this.state = {
      showNavColor: false,
      showSidebar: false
    };
    this.logOut = this.logOut.bind(this);

    this.state = {
      showModeratorBoard: false,
      showAdminBoard: false,
      showUserBoard: false,
      currentUser: undefined,
    };
  }
  handleToggleSidebar = () => {
    this.setState((prevState) => ({
      showSidebar: !prevState.showSidebar
    }));
  };
  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
        showModeratorBoard: user.roles.includes("ROLE_MODERATOR"),
        showAdminBoard: user.roles.includes("ROLE_ADMIN"),
        showUserBoard: user.roles.includes("ROLE_USER"),
      });
    }
  }

  logOut() {
    AuthService.logout();
    this.setState({
      showModeratorBoard: false,
      showAdminBoard: false,
      showUserBoard: false,
      currentUser: undefined,
    });
  }
  toggleNavSecond = () => {
    this.setState(prevState => ({
      showNavSecond: !prevState.showNavSecond
    }));
  };

  render() {

    const { currentUser, showModeratorBoard, showAdminBoard, showUserBoard } = this.state;
    const { showNavSecond } = this.state;
    return (
      <div>
        <MDBNavbar expand='lg' light bgColor='#ffff'>
          <MDBContainer fluid className="removeDot">

            <MDBNavbarBrand href='/Home'>Offre</MDBNavbarBrand>
            <MDBNavbarToggler
              type='button'
              data-target='#navbarColor02'
              aria-controls='navbarColor02'
              aria-expanded='false'
              aria-label='Toggle navigation'
              onClick={this.toggleNavSecond}
            >
              <FontAwesomeIcon icon={faBars} />
            </MDBNavbarToggler>
            <MDBCollapse show={showNavSecond} navbar>
              <MDBNavbarNav className='me-auto mb-2 mb-lg-0'>
                <MDBNavbarItem className='active'>
                  <MDBNavbarLink aria-current='page' href='/Home'>
                    <MDBIcon icon='camera-retro' />
                    Home
                  </MDBNavbarLink>
                </MDBNavbarItem>



                {showUserBoard && (


                  <MDBNavbarItem>
                    <MDBNavbarLink href='/demandelist'>Demande List</MDBNavbarLink>
                  </MDBNavbarItem>


                )}

                {showUserBoard && (


                  <MDBNavbarItem>
                    <MDBNavbarLink href='/user'>User</MDBNavbarLink>
                  </MDBNavbarItem>


                )}

























                {currentUser ? (
                  <MDBNavbarItem className='ms-auto'>
                    <MDBDropdown>
                      <MDBDropdownToggle className="nav-link">
                        <FontAwesomeIcon icon={faUser} size="lg" style={{ color: "#ffffff" }} />
                      </MDBDropdownToggle>
                      <MDBDropdownMenu>
                        <Link to="/profile" className="dropdown-link">
                          <MDBDropdownItem link>
                            {currentUser.username}
                          </MDBDropdownItem>
                        </Link>
                        <Link to="/login" className="dropdown-link">
                          <MDBDropdownItem link onClick={this.logOut}>
                            Log out
                          </MDBDropdownItem>
                        </Link>
                      </MDBDropdownMenu>
                    </MDBDropdown>
                  </MDBNavbarItem>
                ) : (
                  <MDBNavbarItem className='ms-auto'>
                    <MDBDropdown >
                      <MDBDropdownToggle className="nav-link" >
                        <FontAwesomeIcon icon={faUser} size="lg" style={{ color: "#ffffff" }} />
                      </MDBDropdownToggle>
                      <MDBDropdownMenu>
                        <Link to="/login" className="dropdown-link">
                          <MDBDropdownItem link>
                            Login
                          </MDBDropdownItem>
                        </Link>
                        <Link to="/register" className="dropdown-link">
                          <MDBDropdownItem link>
                            Register
                          </MDBDropdownItem>
                        </Link>
                      </MDBDropdownMenu>
                    </MDBDropdown>
                  </MDBNavbarItem>
                )}



              </MDBNavbarNav>





            </MDBCollapse>



          </MDBContainer>
        </MDBNavbar>




        <div>
          <Routes>
            {/* Add the following lines for SignIn and SignUp routes */}
            <Route path="/" element={<Login />} />

            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<SignIn />} />



            <Route path="/NotFoundPage" element={<NotFoundPage />} />


            <Route element={<ProtectedRoute />} >

              <Route element={<UserRoute />} >
                <Route path="/user" element={<UserList />} />
                <Route path="/AddUser" element={<AddUser />} />
                <Route path="/demandelist" element={<DemandeList />} />
                <Route path="/addDemande" element={<AddDemande />} />
                <Route path="/editDemande/:id" element={<EditDemande />} />
                <Route path="/DemandeDetails/:id" element={<DemandeDetails />} />
              </Route>
            </Route>
          </Routes>
        </div>
      </div>
    );
  }
}

export default App;
