import React, { useState, useEffect } from "react";
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
} from "mdb-react-ui-kit";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faUser } from "@fortawesome/free-solid-svg-icons";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import AuthService from "./services/auth.service";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute";
import UserRoute from "./ProtectedRoute/UserRoute";
import NotFoundPage from "./ProtectedRoute/NoFoundPage";
import Login from "./Register/Login";
import SignIn from "./Register/SignIn";
import UserList from "./UserComponent/UserList";
import AddUser from "./UserComponent/AddUser";
import EditUser from "./UserComponent/EditUser";
import DemandeList from "./DemandeComponent/DemandeList";
import AddDemande from "./DemandeComponent/AddDemande";
import EditDemande from "./DemandeComponent/EditDemande";
import DemandeDetails from "./DemandeComponent/DemandeDetails";
import AppView from "./dashboard/view/app-view";
import Profile from "./profie/Profile";

const App = () => {
  const [showNavSecond, setShowNavSecond] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [showModeratorBoard, setShowModeratorBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [showUserBoard, setShowUserBoard] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
      setShowModeratorBoard(user.roles.includes("ROLE_MODERATOR"));
      setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
      setShowUserBoard(user.roles.includes("ROLE_USER"));
    }
  }, []);

  const logOut = () => {
    AuthService.logout();
    setShowModeratorBoard(false);
    setShowAdminBoard(false);
    setShowUserBoard(false);
    setCurrentUser(undefined);
  };

  const toggleNavSecond = () => {
    setShowNavSecond((prev) => !prev);
  };

  return (
    <div>
      <MDBNavbar expand="lg" light bgColor="#ffff">
        <MDBContainer fluid className="removeDot">
          <MDBNavbarBrand href="/Home">Offre</MDBNavbarBrand>
          <MDBNavbarToggler
            type="button"
            data-target="#navbarColor02"
            aria-controls="navbarColor02"
            aria-expanded="false"
            aria-label="Toggle navigation"
            onClick={toggleNavSecond}
          >
            <FontAwesomeIcon icon={faBars} />
          </MDBNavbarToggler>
          <MDBCollapse show={showNavSecond} navbar>
            <MDBNavbarNav className="me-auto mb-2 mb-lg-0">
              <MDBNavbarItem className="active">
                <MDBNavbarLink aria-current="page" href="/Home">
                  <MDBIcon icon="camera-retro" />
                  Home
                </MDBNavbarLink>
              </MDBNavbarItem>

              {showUserBoard && (
                <MDBNavbarItem>
                  <MDBNavbarLink href="/demandelist">
                    Demande List
                  </MDBNavbarLink>
                </MDBNavbarItem>
              )}

              {showUserBoard && (
                <MDBNavbarItem>
                  <MDBNavbarLink href="/user">User</MDBNavbarLink>
                </MDBNavbarItem>
              )}

              {currentUser ? (
                <MDBNavbarItem className="ms-auto">
                  <MDBDropdown>
                    <MDBDropdownToggle className="nav-link">
                      <FontAwesomeIcon
                        icon={faUser}
                        size="lg"
                        style={{ color: "#ffffff" }}
                      />
                    </MDBDropdownToggle>
                    <MDBDropdownMenu>
                      <Link to="/profile" className="dropdown-link">
                        <MDBDropdownItem
                          link
                          onClick={() => navigate("/profile")}
                        >
                          {currentUser.username}
                        </MDBDropdownItem>
                      </Link>
                      <Link to="/login" className="dropdown-link">
                        <MDBDropdownItem link onClick={logOut}>
                          Log out
                        </MDBDropdownItem>
                      </Link>
                    </MDBDropdownMenu>
                  </MDBDropdown>
                </MDBNavbarItem>
              ) : (
                <MDBNavbarItem className="ms-auto">
                  <MDBDropdown>
                    <MDBDropdownToggle className="nav-link">
                      <FontAwesomeIcon
                        icon={faUser}
                        size="lg"
                        style={{ color: "#ffffff" }}
                      />
                    </MDBDropdownToggle>
                    <MDBDropdownMenu>
                      <Link to="/login" className="dropdown-link">
                        <MDBDropdownItem link>Login</MDBDropdownItem>
                      </Link>
                      <Link to="/register" className="dropdown-link">
                        <MDBDropdownItem link>Register</MDBDropdownItem>
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
          <Route
            path="/"
            element={currentUser != undefined ? <AppView /> : <Login />}
          />
          <Route path="/profile" element={<Profile />} />

          <Route path="/login" element={<Login />} />
          <Route path="/dashboard/*" element={<AppView />} />

          <Route path="/register" element={<SignIn />} />
          <Route path="/NotFoundPage" element={<NotFoundPage />} />

          <Route element={<ProtectedRoute />}>
            <Route element={<UserRoute />}>
              <Route path="/user" element={<UserList />} />
              <Route path="/AddUser" element={<AddUser />} />
              <Route path="/editUser/:id" element={<EditUser />} />
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
};

export default App;
