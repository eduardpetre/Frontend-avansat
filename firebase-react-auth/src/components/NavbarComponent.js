import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

export default function NavbarComponent() {
  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="/">DeviceSync</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/">Devices</Nav.Link>
            {/* <Nav.Link href="/findmy">Find My</Nav.Link> */}
            <Nav.Link href="/profile">Profile</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}