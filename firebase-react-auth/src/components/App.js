import React from "react"
import Signup from "./Signup"
import { Container } from "react-bootstrap"
import { AuthProvider } from "../contexts/AuthContext"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Dashboard from "./Dashboard"
import Login from "./Login"
import PrivateRoute from "./PrivateRoute"
import ForgotPassword from "./ForgotPassword"
import Profile from "./Profile"
import UpdateProfile from "./UpdateProfile"
import NavbarComponent from './NavbarComponent'
// import FindMy from './FindMy'

function App() {
  return (
    <>
      <NavbarComponent />
      <Container 
        className="d-flex align-items-center justify-content-center"
        style={{minHeight: "90vh"}}
      >
        <div className="w-100" style={{maxWidth: "400px"}}>
          <Router>
            <AuthProvider>
              <Routes>
                <Route exact path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>}/>
                <Route path="/signup" element={<Signup/>} />
                <Route path="/login" element={<Login/>} />
                <Route path="/forgot-password" element={<ForgotPassword/>} />
                <Route path="/profile" element={<PrivateRoute><Profile/></PrivateRoute>}/>
                <Route path="/update-profile" element={<PrivateRoute><UpdateProfile/></PrivateRoute>}/>
                {/* <Route path="/findmy" element={<PrivateRoute><FindMy/></PrivateRoute>}/> */}
              </Routes>
            </AuthProvider>
          </Router>
        </div>
      </Container>
    </>
  )
}

export default App;
