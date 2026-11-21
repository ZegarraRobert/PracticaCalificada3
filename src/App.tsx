import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import React from 'react'
import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Menu from './Componentes/Menu'
import Inicio from './Componentes/Inicio'
import Proveedores from './Componentes/Proveedores'
import Productos from './Componentes/Productos'
import DetalleProducto from './Componentes/DetalleProducto'
import Clientes from './Componentes/Clientes'
import Ventas from './Componentes/Ventas'
import NoEncontrado from './Componentes/NoEncontrado'
import { Proveedor } from './Entidades/Proveedor'
import { ProductoFarmaceutico } from './Entidades/ProductoFarmaceutico'
import { Cliente } from './Entidades/Cliente'
import { Venta } from './Entidades/Venta'

interface ContextoFarmacia {
  proveedores: Proveedor[];
  setProveedores: React.Dispatch<React.SetStateAction<Proveedor[]>>;
  productos: ProductoFarmaceutico[];
  setProductos: React.Dispatch<React.SetStateAction<ProductoFarmaceutico[]>>;
  clientes: Cliente[];
  setClientes: React.Dispatch<React.SetStateAction<Cliente[]>>;
  ventas: Venta[];
  setVentas: React.Dispatch<React.SetStateAction<Venta[]>>;
}

export const farmaciaContext = React.createContext<ContextoFarmacia>({
  proveedores: [],
  setProveedores: () => { },
  productos: [],
  setProductos: () => { },
  clientes: [],
  setClientes: () => { },
  ventas: [],
  setVentas: () => { }
})

function App() {

  const [proveedores, setProveedores] = useState<Proveedor[]>([])
  const [productos, setProductos] = useState<ProductoFarmaceutico[]>([])
  const [clientes, setClientes] = useState<Cliente[]>([])
  const [ventas, setVentas] = useState<Venta[]>([])

  return (
    <>
      <farmaciaContext.Provider value={{ proveedores, setProveedores, productos, setProductos, clientes, setClientes, ventas, setVentas }}>
        <BrowserRouter>
          <Menu />
          <Container className='mt-4'>
            <Routes>
              <Route path='/' element={<Inicio />} />
              <Route path='/Proveedores' element={<Proveedores />} />
              <Route path='/Productos' element={<Productos />} />
              <Route path='/Productos/:id' element={<DetalleProducto />} />
              <Route path='/Clientes' element={<Clientes />} />
              <Route path='/Ventas' element={<Ventas />} />
              <Route path='*' element={<NoEncontrado />} />
            </Routes>
          </Container>
        </BrowserRouter>
      </farmaciaContext.Provider>
    </>
  )
}

export default App