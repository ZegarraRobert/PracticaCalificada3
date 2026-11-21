import { useContext } from 'react'
import { Link, useParams } from 'react-router-dom'
import { farmaciaContext } from '../App'

function DetalleProducto() {
    const { productos } = useContext(farmaciaContext)
    const { id } = useParams()
    const producto = productos.find(prod => prod.id === Number(id))

    if (!producto) return (
        <div>
            <h2>Producto no encontrado</h2>
            <Link to='/Productos'>Volver a Productos</Link>
        </div>
    )

    return (
        <div>
            <h2>Detalle del Producto</h2>
            <p>Codigo: {producto.codigo}</p>
            <p>Nombre: {producto.nombre}</p>
            <p>Laboratorio: {producto.laboratorio}</p>
            <p>Precio: S/ {producto.precio.toFixed(2)}</p>
            <p>Stock disponible: {producto.stock}</p>
            <Link to='/Productos'>Volver a Productos</Link>
        </div>
    )
}

export default DetalleProducto