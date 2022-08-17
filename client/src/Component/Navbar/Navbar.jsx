import { Navbar, Nav, Container } from "react-bootstrap"
import { Outlet, Link } from "react-router-dom"
import navlog from '../../assets/logo23.jpeg'
import './Navbar.css'
import '../Home/Text.css'
import perfil from '../../assets/perfil.png'
import firebaseApp from "../../Credential/index";
import { getAuth, signOut } from "firebase/auth";
import { useSelector } from "react-redux"


const NavBarExample = ({user}) => {
    

    const auth = getAuth(firebaseApp);
    console.log('auth', auth)
    
    // const userEmail=localStorage.getItem("Email")
    // console.log('navBar',userEmail)
    return(
       <>    
       <Navbar className="navBg" variant="dark" expand="lg">
        <Container>
            <Navbar.Brand className="nav2" as={Link} to="/" ><img src={navlog} width="120px" height="100px"/></Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
                <Nav.Link as={Link} to="/" className="space">Home </Nav.Link>
                <Nav.Link as={Link} to="/services" className="space">Servicios</Nav.Link> 
                <Nav.Link as={Link} to="/home/validate" className="space"><img src={perfil} width="50px" height="50px" />  </Nav.Link>
                {
                    
                <div className="SignOut">
                 <button className="btn highlighted-btn" onClick={() => signOut(auth)}>Cerrar sesion</button> 
                 </div>
                }
            </Nav>
            </Navbar.Collapse>
        </Container>
        </Navbar>  

        <section>
            <Outlet>
               <Nav.Link as={Link} to="/">Home</Nav.Link>
                <Nav.Link as={Link} to="/home/validate">Inicia Sesión</Nav.Link>     
            </Outlet>
        </section> 
       </> 
    )
}
export default NavBarExample