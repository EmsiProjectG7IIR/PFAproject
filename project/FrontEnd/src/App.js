import logo from './logo.svg';
import './App.css';
import UserList from "./UserComponent/UserList";

import { Route, Routes } from 'react-router-dom';
import Login from './Register/Login';
import SignIn from './Register/SignIn';


function App() {
  return (
    <div>
      <Routes>
        {/* Add the following lines for SignIn and SignUp routes */}

        <Route path="/" element={<Login />} />
        <Route path="/register" element={<SignIn />} />
        <Route path="/user" element={<UserList />} />


      </Routes>
    </div>
  );
}

export default App;
