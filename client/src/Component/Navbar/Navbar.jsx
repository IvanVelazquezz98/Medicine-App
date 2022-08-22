
import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import "./Navbar.css";
/* import "../Home/Text.css"; */
import { Link, useNavigate } from "react-router-dom";
import navlog from "../../assets/logo23.jpeg";
import perfil from "../../assets/perfil.png";
import firebaseApp from "../../Credential/index";
import { getAuth, signOut } from "firebase/auth";

const NavBarExample = (props) => {
  
  const auth = getAuth(firebaseApp);
  const navigate = useNavigate();
  
  function closeSession(e) {
    
    signOut(auth);
    localStorage.removeItem("Email");
    let path = "/";
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
              <Nav.Link as={Link} to="/home/validate" className="spaceX">
                <img className="imagenPerfil" src={perfil} />{" "}
              </Nav.Link>
                <Nav.Link>
                  <div className="buttonNav" onClick={closeSession}>
                    Cerrar Sesión
                  </div>
                </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* <section>
        <Outlet>
          <Nav.Link as={Link} to="/">
            Home
          </Nav.Link>
          <Nav.Link as={Link} to="/home/validate">
            Inicia Sesión
          </Nav.Link>
        </Outlet>
      </section> */}
    </>
  );
};
export default NavBarExample;
