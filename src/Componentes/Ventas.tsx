import { useState, useContext } from 'react'
import { Button, Form, Table } from 'react-bootstrap'
import { farmaciaContext } from '../App'
import { Venta } from '../Entidades/Venta'

const IGV = 0.18

function Ventas() {
    const { clientes, productos, setProductos, ventas, setVentas } = useContext(farmaciaContext)
    const [idCliente, setIdCliente] = useState('')
    const [idProducto, setIdProducto] = useState('')
    const [cantidad, setCantidad] = useState('')
    const [mensaje, setMensaje] = useState('')

    const cliente = clientes.find(cli => cli.id === Number(idCliente))
    const producto = productos.find(prod => prod.id === Number(idProducto))

    // Calculo automatico de subtotal, IGV y total
    const cant = /^\d+$/.test(cantidad) ? Number(cantidad) : 0
    const subtotal = producto ? producto.precio * cant : 0
    const igv = subtotal * IGV
    const total = subtotal + igv

    const Confirmar = () => {
        const errorMessage = Validate(idCliente, idProducto, cantidad, producto ? producto.stock : 0)
        if (errorMessage !== '' || !cliente || !producto) {
            setMensaje(errorMessage)
            return
        }
        setVentas([...ventas, new Venta(ventas.length + 1, cliente.nombre, producto.nombre, cant,
            Number(subtotal.toFixed(2)), Number(igv.toFixed(2)), Number(total.toFixed(2)))])
        // Actualiza el stock disponible
        setProductos(productos.map(prod => prod.id === producto.id ? { ...prod, stock: prod.stock - cant } : prod))
        setMensaje('')
        setIdCliente('')
        setIdProducto('')
        setCantidad('')
        alert('Venta registrada')
    }

    return (
        <div>
            <h2>Registro de Ventas</h2>
            <Form onSubmit={ev => {
                ev.preventDefault();
                Confirmar();
            }}>
                <Form.Select name='cliente' value={idCliente} onChange={ev => setIdCliente(ev.currentTarget.value)}>
                    <option value=''>Seleccione un cliente</option>
                    {clientes.map((cli) => (
                        <option key={cli.id} value={cli.id}>{cli.dni} - {cli.nombre}</option>
                    ))}
                </Form.Select>
                <br />
                <Form.Select name='producto' value={idProducto} onChange={ev => setIdProducto(ev.currentTarget.value)}>
                    <option value=''>Seleccione un producto</option>
                    {productos.map((prod) => (
                        <option key={prod.id} value={prod.id}>{prod.nombre} - S/ {prod.precio.toFixed(2)} (stock: {prod.stock})</option>
                    ))}
                </Form.Select>
                <br />
                <Form.Control type='number' name='cantidad' placeholder='Cantidad' autoComplete='false'
                    value={cantidad} onChange={ev => setCantidad(ev.currentTarget.value)} />
                <br />
                <p>Subtotal: S/ {subtotal.toFixed(2)}</p>
                <p>IGV (18%): S/ {igv.toFixed(2)}</p>
                <p>Total a pagar: S/ {total.toFixed(2)}</p>
                <p style={{ color: 'red' }}>{mensaje}</p>
                <Button type='submit' variant='primary'>Confirmar venta</Button>
            </Form>

            <br />
            <h3>Ventas realizadas</h3>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>N°</th>
                        <th>Cliente</th>
                        <th>Producto</th>
                        <th>Cantidad</th>
                        <th>Subtotal</th>
                        <th>IGV</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    {ventas.map((ven) => (
                        <tr key={ven.id}>
                            <td>{ven.id}</td>
                            <td>{ven.cliente}</td>
                            <td>{ven.producto}</td>
                            <td>{ven.cantidad}</td>
                            <td>{ven.subtotal.toFixed(2)}</td>
                            <td>{ven.igv.toFixed(2)}</td>
                            <td>{ven.total.toFixed(2)}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    )
}

const Validate = (idCliente: string, idProducto: string, cantidad: string, stock: number) => {
    if (idCliente === '') return 'Debe seleccionar un cliente'
    if (idProducto === '') return 'Debe seleccionar un producto'
    if (cantidad === '') return 'La cantidad es obligatoria'
    if (!/^\d+$/.test(cantidad) || Number(cantidad) <= 0) return 'La cantidad debe ser un numero entero mayor a 0'
    if (Number(cantidad) > stock) return `Stock insuficiente. Stock disponible: ${stock}`
    return ''
}

export default Ventas