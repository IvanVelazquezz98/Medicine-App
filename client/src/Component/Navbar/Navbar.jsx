

import { Navbar, Nav, Container } from "react-bootstrap";
import React from "react";
import "./Navbar.css";
/* import "../Home/Text.css"; */
import { Link, useNavigate } from "react-router-dom";
import navlog from "../../assets/logo23.jpeg";
import perfil from "../../assets/perfil.png";
import firebaseApp from "../../Credential/index";
import { getAuth, signOut } from "firebase/auth";
import { useSelector } from "react-redux";

const NavBarExample = () => {
  const auth = getAuth(firebaseApp);
  const user = useSelector((state) => state.userValidated)
  //console.log("auth", auth);
  const navigate = useNavigate();

  function closeSession() {
    signOut(auth);
    localStorage.removeItem('Email')
    let path = '/';
    navigate(path);
  }

  return (
    <>
      <Navbar className="navBg" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand className="nav2" as={Link} to="/">
            <img src={navlog} className="logoNAv" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/" className="spaceX">
                Home{" "}
              </Nav.Link>
              <Nav.Link as={Link} to="/services" className="spaceX">
                Servicios
              </Nav.Link>

              {
                (user?.email)?
                <div>
              <Nav.Link as={Link} to="/home/validate" className="spaceX">
               <p>Hola, {user.email}</p> <img className="imagenPerfil" src={perfil} />{" "}
              </Nav.Link>
                    <Nav.Link>
                      <div className="buttonNav" onClick={closeSession}>
                        Cerrar sesion
                      </div>
                    </Nav.Link>

                </div>:
                <Nav.Link as={Link} to="/home/validate" className="spaceX">
               <img className="imagenPerfil" src={perfil} />{" "}
              </Nav.Link>
              }
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

    </>
  );
};
export default NavBarExample;
