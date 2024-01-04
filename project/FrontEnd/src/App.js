import logo from "./logo.svg";
import "./App.css";
import UserList from "./UserComponent/UserList";
import {
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
import React, {Component, useState} from "react";
import Sidebar from "./SideBar";
import AddUser from "./UserComponent/AddUser";
import AuthService from "./services/auth.service";

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
        <MDBNavbar expand="lg" light bgColor="light">
          <MDBContainer fluid>
            <MDBNavbarBrand href="#">Gestion de Demandes</MDBNavbarBrand>

            <MDBNavbarToggler
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
                onClick={this.toggleNavSecond}
            >
              <MDBIcon icon="bars" fas />
            </MDBNavbarToggler>

            <MDBCollapse  show={showNavSecond}>
              <MDBNavbarNav className="mr-auto mb-2 mb-lg-0">
                <MDBNavbarItem>
                  <MDBNavbarLink active aria-current="page" href="#">
                    Home
                  </MDBNavbarLink>
                </MDBNavbarItem>
                {showUserBoard && (


                    <MDBNavbarItem>
                      <MDBNavbarLink href="/demandelist">Demande</MDBNavbarLink>
                    </MDBNavbarItem> )}
                {showUserBoard && (
                  <MDBNavbarItem>
                  <MDBNavbarLink href="/userlist">User</MDBNavbarLink>
                  </MDBNavbarItem>)}






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
                <MDBNavbarItem className='ms-auto' light bgColor="light">
                  <MDBDropdown >
                    <MDBDropdownToggle className="nav-link" >
                      <FontAwesomeIcon size="lg" icon={faUser} style={{ color: "#ffff" }} />
                    </MDBDropdownToggle>
                    <MDBDropdownMenu light bgColor="light">
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
              </MDBNavbarNav>
            </MDBCollapse>
          </MDBContainer>
        </MDBNavbar>
<div>
    <Routes>
      {/* Add the following lines for SignIn and SignUp routes */}

      <Route path="/" element={<Login />} />
      <Route path="/register" element={<SignIn />} />
      <Route path="/user" element={<UserList />} />
      <Route path="/AddUser" element={<AddUser />} />
      <Route path="/demandelist" element={<DemandeList />} />
      <Route path="/addDemande" element={<AddDemande />} />
      <Route path="/editDemande/:id" element={<EditDemande />} />

    </Routes>
</div>
        </div>
    );
  }
}

export default App;
