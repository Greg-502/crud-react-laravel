import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import 'bootstrap/dist/css/bootstrap.css'

import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import CreateProduct from './components/products/create'
import List from './components/products/list'

function App() {
  return (
    <BrowserRouter>
      <Navbar bg="primary">
        <Container>
          <Link to={"/"} className="navbar-brand text-white">
            Basic Crud App
          </Link>
        </Container>
      </Navbar>

      <Container className="mt-5">
        <Row>
          <Col md={12}></Col>
            <Routes>
              <Route path='/product/create' element={<CreateProduct />} />
              <Route path='/' element={<List />} />
            </Routes>
        </Row>
      </Container>
    </BrowserRouter>
  )
}

export default App
