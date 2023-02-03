import {Navbar, Container} from 'react-bootstrap'

const NavbarBs = () => {
    return (            
        <Navbar bg="primary" variant="dark">
          <Container  >
          <h2 className="text-light">Facturas de compras</h2>
            <Navbar.Brand href="#home">
              <img
                alt=""
                src="img/ns.png"              
                height="40px"
                className="d-inline-block align-top"
              />            
            </Navbar.Brand>            
           
          </Container>
        </Navbar>
    );
}

export default NavbarBs;