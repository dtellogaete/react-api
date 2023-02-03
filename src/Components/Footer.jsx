import React from 'react';
import {Navbar, Container} from 'react-bootstrap';

const Footer = () => {
    return (
        <Navbar className="bg-primary py-3 text-center" style={{width: "auto"}}>
            <Container>
                <p style={{color:"white"}}>Copyright © 2023 </p>
            </Container>           
        </Navbar>
    );
}

export default Footer;