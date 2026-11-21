import { useState, useContext } from 'react'
import { Button, Form, Table } from 'react-bootstrap'
import { farmaciaContext } from '../App'
import { Cliente } from '../Entidades/Cliente'

function Clientes() {
    const { clientes, setClientes } = useContext(farmaciaContext)
    const [dni, setDni] = useState('')
    const [nombre, setNombre] = useState('')
    const [telefono, setTelefono] = useState('')
    const [correo, setCorreo] = useState('')
    const [mensaje, setMensaje] = useState('')

    const Grabar = () => {
        const errorMessage = Validate(dni, nombre, telefono, correo, clientes)
        if (errorMessage !== '') {
            setMensaje(errorMessage)
            return
        }
        setClientes([...clientes, new Cliente(clientes.length + 1, dni, nombre, telefono, correo)])
        setMensaje('')
        setDni('')
        setNombre('')
        setTelefono('')
        setCorreo('')
        alert('Cliente registrado')
    }

    return (
        <div>
            <h2>Registro de Clientes</h2>
            <Form onSubmit={ev => {
                ev.preventDefault();
                Grabar();
            }}>
                <Form.Control type='text' name='dni' placeholder='DNI (8 digitos)' autoComplete='false' maxLength={8}
                    value={dni} onChange={ev => setDni(ev.currentTarget.value)} />
                <br />
                <Form.Control type='text' name='nombre' placeholder='Nombre completo' autoComplete='false'
                    value={nombre} onChange={ev => setNombre(ev.currentTarget.value)} />
                <br />
                <Form.Control type='text' name='telefono' placeholder='Telefono (9 digitos)' autoComplete='false' maxLength={9}
                    value={telefono} onChange={ev => setTelefono(ev.currentTarget.value)} />
                <br />
                <Form.Control type='text' name='correo' placeholder='Correo' autoComplete='false'
                    value={correo} onChange={ev => setCorreo(ev.currentTarget.value)} />
                <br />
                <p style={{ color: 'red' }}>{mensaje}</p>
                <Button type='submit' variant='primary'>Grabar</Button>
            </Form>

            <br />
            <h3>Lista de Clientes</h3>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>DNI</th>
                        <th>Nombre</th>
                        <th>Telefono</th>
                        <th>Correo</th>
                    </tr>
                </thead>
                <tbody>
                    {clientes.map((cli) => (
                        <tr key={cli.id}>
                            <td>{cli.dni}</td>
                            <td>{cli.nombre}</td>
                            <td>{cli.telefono}</td>
                            <td>{cli.correo}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    )
}

const Validate = (dni: string, nombre: string, telefono: string, correo: string, clientes: Cliente[]) => {
    if (dni === '' || nombre === '' || telefono === '' || correo === '') return 'Todos los campos son obligatorios'
    if (!/^\d{8}$/.test(dni)) return 'El DNI debe tener 8 digitos numericos'
    if (!/^\d{9}$/.test(telefono)) return 'El telefono debe tener 9 digitos numericos'
    if (!correo.includes('@')) return 'El correo no es valido'
    if (clientes.some(cli => cli.dni === dni)) return 'El DNI ya esta registrado'
    return ''
}

export default Clientes