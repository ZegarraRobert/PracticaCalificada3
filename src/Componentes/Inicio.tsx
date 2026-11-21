import { useContext } from 'react'
import { farmaciaContext } from '../App'

function Inicio() {
    const { proveedores, productos, clientes, ventas } = useContext(farmaciaContext)

    return (
        <div>
            <h2>Gestion Farmaceutica</h2>
            <p>Proveedores registrados: {proveedores.length}</p>
            <p>Productos registrados: {productos.length}</p>
            <p>Clientes registrados: {clientes.length}</p>
            <p>Ventas realizadas: {ventas.length}</p>
        </div>
    )
}

export default Inicio