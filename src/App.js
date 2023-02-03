import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from "react";


import Footer from './Components/Footer';
import DataCard from './Components/Card';
import {getData} from './Components/MiApi';

import {  Form, Navbar, Table, Container, Row, Col } from 'react-bootstrap';

const App = () =>  {

  // Conversor de fechas Unix
  const unixToDate = (unixTimestamp) =>{
    let date = new Date(unixTimestamp * 1000);
    let formattedDate = date.toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric"
    });
    return formattedDate.replace(/(\d+)\/(\d+)\/(\d+)/, "$2-$1-$3");
  }

  //Carga de datos de la API
    const [items, setItems] = useState([]);
  
    useEffect(() => {
      getData().then(data => setItems(data));
    }, []);

  /* Funcion que ordena la tabla alfabeticamente*/
    const [sortOrder, setSortOrder] = useState("asc");

    const handleSort = (key) => {
      const sortedItems = [...items].sort((a, b) => {
        if (sortOrder === "asc") {
          if (a[key] > b[key]) return 1;
          if (a[key] < b[key]) return -1;
        } else {
          if (a[key] < b[key]) return 1;
          if (a[key] > b[key]) return -1;
        }
        return 0;
      });
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
      setItems(sortedItems);
    };

    /* Listado unico de proveedores */

    const suppliers = Array.from(new Set(items.map(item => item.clientActivity)))
    .filter(activity => activity);
    
    const [filterItems, setFilterItems] = useState(items);
    const handleFilter = (event) => {
      const selectedSupplier = event.target.value;
      if (selectedSupplier === "all") {
        setFilterItems(items);
      } else {
        setFilterItems(items.filter(item => item.clientActivity === selectedSupplier));
      }
    };

    /* Datos Resumen */
    let totalIVA = 0;
    let totalNet = 0;

  filterItems.forEach(item => {
    totalIVA += item.ivaAmount;
    totalNet += item.netAmount;
  });

  return (
    <div className="App">
      <Navbar bg="primary"
        variant="dark"
        style ={{display:'flex',
        flexdirection:'row',
        justifyContent:'space-between',
        width: '100%',
        height: '70px',
        padding: '20px'}} >            
          <Navbar.Brand href="#home" >
              <h3>Facturas de Proveedores</h3>                   
          </Navbar.Brand>
          <Navbar.Brand>
              <Form  className="mb-3" style={{paddingTop: '15px'}}>
                <Form.Group className="mb-3" style={{diplay: 'flex'}} >                        
                  <Form.Control as="select" name="supplier" id="supplier" defaultValue="all"  onChange={handleFilter}>
                    <option value="">Selecciona al proveedor </option>
                    <option value="all">Todos</option>
                    {suppliers.map(item =>{
                      return (<option value={item}>{item}</option>)
                    })}                          
                  </Form.Control>
                </Form.Group>
              </Form>                       
          </Navbar.Brand>                      
      </Navbar>   
      <Container bg="light" className="light p-5 auto" style= {{minHeight: "100vh"}}>
        <Row className="p-6 mt-6 tCard">
          <Col>
            <DataCard title="Total Neto" value={totalNet.toLocaleString('es-CL', {style: 'currency', currency: 'CLP'})} className="tCard"/>
          </Col>          
          <Col className="p-20 m-20">
            <DataCard title="Total IVA" value={totalIVA.toLocaleString('es-CL', {style: 'currency', currency: 'CLP'})}/>
          </Col>
        </Row>
        <Row>
          <Table striped className="text-center p-6 sTable" style={{width: '100%', height: 'auto'}}>
            <thead>
              <tr>
                <th onClick={() => handleSort("emissionDate")}>Fecha</th>
                <th onClick={() => handleSort("number")}>Folio</th>
                <th onClick={() => handleSort("clientCode")}>RUT</th>
                <th onClick={() => handleSort("clientActivity")}>Proveedor</th>
                <th onClick={() => handleSort("netAmount")}>Neto</th>
                <th onClick={() => handleSort("ivaAmount")}>IVA</th>
                <th onClick={() => handleSort("totalAmount")}>Total</th>
              </tr>
            </thead>
            <tbody>
              {filterItems.map(item => (
                totalIVA += item.ivaAmount,                
                totalNet += item.netAmount,
                <tr key={item.id}>
                  <td>{unixToDate(item.emissionDate)}</td>
                  <td>{item.number}</td>
                  <td>{item.clientCode}</td>
                  <td>{item.clientActivity}</td>
                  <td>{item.netAmount.toLocaleString('es-CL', {style: 'currency', currency: 'CLP'})}</td>
                  <td>{item.ivaAmount.toLocaleString('es-CL', {style: 'currency', currency: 'CLP'})}</td>
                  <td>{item.totalAmount.toLocaleString('es-CL', {style: 'currency', currency: 'CLP'})}</td>
                </tr>
              ))}
            </tbody>
          </Table>
          </Row>       
      </Container>
      <Footer/>   
    </div>
  );
};

export default App;
