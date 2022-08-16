import { Navbar, Nav, Container } from "react-bootstrap"
import { Outlet, Link } from "react-router-dom"
import navlog from '../../assets/logo23.jpeg'
import './Navbar.css'
import perfil from '../../assets/perfil.png'


const NavBarExample = () => {
    return(
       <>    
       <Navbar className="navBg" variant="dark" expand="lg">
        <Container>
            <Navbar.Brand className="nav2" as={Link} to="/" ><img src={navlog} width="120px" height="100px"/></Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
                <Nav.Link as={Link} to="/" className="space">Home </Nav.Link>
                <Nav.Link as={Link} to="/services" className="space">servicios         </Nav.Link> 
                <Nav.Link as={Link} to="/home/validate" className="space"><img src={perfil} width="50px" height="50px" />  </Nav.Link> 
            </Nav>
            </Navbar.Collapse>
        </Container>
        </Navbar>  

        <section>
            <Outlet>
               <Nav.Link as={Link} to="/">Home</Nav.Link>
                <Nav.Link as={Link} to="/home/validate">Inicia Sección</Nav.Link>     
            </Outlet>
        </section> 
       </> 
    )
}
export default NavBarExample