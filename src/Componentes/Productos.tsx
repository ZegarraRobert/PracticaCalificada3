import { useState, useContext } from 'react'
import { Button, Form, Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { farmaciaContext } from '../App'
import { ProductoFarmaceutico } from '../Entidades/ProductoFarmaceutico'

function Productos() {
    const { productos, setProductos } = useContext(farmaciaContext)
    const [codigo, setCodigo] = useState('')
    const [nombre, setNombre] = useState('')
    const [laboratorio, setLaboratorio] = useState('')
    const [precio, setPrecio] = useState('')
    const [stock, setStock] = useState('')
    const [mensaje, setMensaje] = useState('')

    const Grabar = () => {
        const errorMessage = Validate(codigo, nombre, laboratorio, precio, stock, productos)
        if (errorMessage !== '') {
            setMensaje(errorMessage)
            return
        }
        setProductos([...productos, new ProductoFarmaceutico(productos.length + 1, codigo, nombre, laboratorio, Number(precio), Number(stock))])
        setMensaje('')
        setCodigo('')
        setNombre('')
        setLaboratorio('')
        setPrecio('')
        setStock('')
        alert('Producto registrado')
    }

    return (
        <div>
            <h2>Productos Farmaceuticos</h2>
            <Form onSubmit={ev => {
                ev.preventDefault();
                Grabar();
            }}>
                <Form.Control type='text' name='codigo' placeholder='Codigo' autoComplete='false'
                    value={codigo} onChange={ev => setCodigo(ev.currentTarget.value)} />
                <br />
                <Form.Control type='text' name='nombre' placeholder='Nombre' autoComplete='false'
                    value={nombre} onChange={ev => setNombre(ev.currentTarget.value)} />
                <br />
                <Form.Control type='text' name='laboratorio' placeholder='Laboratorio' autoComplete='false'
                    value={laboratorio} onChange={ev => setLaboratorio(ev.currentTarget.value)} />
                <br />
                <Form.Control type='number' name='precio' placeholder='Precio' autoComplete='false' step='0.01'
                    value={precio} onChange={ev => setPrecio(ev.currentTarget.value)} />
                <br />
                <Form.Control type='number' name='stock' placeholder='Stock' autoComplete='false'
                    value={stock} onChange={ev => setStock(ev.currentTarget.value)} />
                <br />
                <p style={{ color: 'red' }}>{mensaje}</p>
                <Button type='submit' variant='primary'>Grabar</Button>
            </Form>

            <br />
            <h3>Lista de Productos</h3>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Codigo</th>
                        <th>Nombre</th>
                        <th>Laboratorio</th>
                        <th>Precio</th>
                        <th>Stock</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {productos.map((prod) => (
                        <tr key={prod.id}>
                            <td>{prod.codigo}</td>
                            <td>{prod.nombre}</td>
                            <td>{prod.laboratorio}</td>
                            <td>S/ {prod.precio.toFixed(2)}</td>
                            <td>{prod.stock}</td>
                            <td><Link to={`/Productos/${prod.id}`}>Ver detalle</Link></td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    )
}

const Validate = (codigo: string, nombre: string, laboratorio: string, precio: string, stock: string, productos: ProductoFarmaceutico[]) => {
    if (codigo === '' || nombre === '' || laboratorio === '' || precio === '' || stock === '') return 'Todos los campos son obligatorios'
    if (isNaN(Number(precio)) || Number(precio) <= 0) return 'El precio debe ser un numero mayor a 0'
    if (!/^\d+$/.test(stock)) return 'El stock debe ser un numero entero mayor o igual a 0'
    if (productos.some(prod => prod.codigo === codigo)) return 'El codigo ya esta registrado'
    return ''
}

export default Productos