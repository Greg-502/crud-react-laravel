import 'bootstrap/dist/css/bootstrap.css'

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import CreateProduct from './components/products/create'
import List from './components/products/list'
import EditProduct from './components/products/edit'

function App() {
  return (
    <BrowserRouter>
      <div className='container'>
        <div>
            <Routes>
              <Route path='/product/create' element={<CreateProduct />} />
              <Route path='/product/edit/:id' element={<EditProduct />} />
              <Route path='/' element={<List />} />
            </Routes>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App
