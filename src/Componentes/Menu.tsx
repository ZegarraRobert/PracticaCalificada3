import { Container, Nav, Navbar } from "react-bootstrap"
import { Link } from "react-router-dom"

function Menu() {
    return (
        <Navbar bg="primary" data-bs-theme="dark" expand="lg">
            <Container>
                <Navbar.Brand as={Link} to='/'>Farmacia UTP</Navbar.Brand>
                <Navbar.Toggle aria-controls="menu-farmacia" />
                <Navbar.Collapse id="menu-farmacia">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to='/Proveedores'>Proveedores</Nav.Link>
                        <Nav.Link as={Link} to='/Productos'>Productos</Nav.Link>
                        <Nav.Link as={Link} to='/Clientes'>Clientes</Nav.Link>
                        <Nav.Link as={Link} to='/Ventas'>Ventas</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Menu