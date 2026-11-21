import { useState, useEffect, useContext } from 'react'
import { Button, Form, Table } from 'react-bootstrap'
import { farmaciaContext } from '../App'
import { Proveedor } from '../Entidades/Proveedor'

function Proveedores() {
    const { proveedores, setProveedores } = useContext(farmaciaContext)
    const [directorio, setDirectorio] = useState(false)
    const [ruc, setRuc] = useState('')
    const [razonSocial, setRazonSocial] = useState('')
    const [telefono, setTelefono] = useState('')
    const [correo, setCorreo] = useState('')
    const [mensaje, setMensaje] = useState('')

    useEffect(() => {
        document.title = directorio ? 'Directorio Activo de Proveedores' : 'Registro de Proveedores'
    }, [directorio])

    const Grabar = () => {
        const errorMessage = Validate(ruc, razonSocial, telefono, correo, proveedores)
        if (errorMessage !== '') {
            setMensaje(errorMessage)
            return
        }
        setProveedores([...proveedores, new Proveedor(proveedores.length + 1, ruc, razonSocial, telefono, correo)])
        setMensaje('')
        setRuc('')
        setRazonSocial('')
        setTelefono('')
        setCorreo('')
        alert('Proveedor registrado')
    }

    return (
        <div>
            <h2>{directorio ? 'Directorio Activo de Proveedores' : 'Registro de Proveedores'}</h2>
            <Button type='button' variant='secondary' onClick={() => setDirectorio(!directorio)}>
                {directorio ? 'Ir a Registro' : 'Ir a Directorio'}
            </Button>
            <br />
            <br />

            {directorio ? (
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>RUC</th>
                            <th>Razon Social</th>
                            <th>Telefono</th>
                            <th>Correo</th>
                        </tr>
                    </thead>
                    <tbody>
                        {proveedores.map((prov) => (
                            <tr key={prov.id}>
                                <td>{prov.ruc}</td>
                                <td>{prov.razonSocial}</td>
                                <td>{prov.telefono}</td>
                                <td>{prov.correo}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            ) : (
                <Form onSubmit={ev => {
                    ev.preventDefault();
                    Grabar();
                }}>
                    <Form.Control type='text' name='ruc' placeholder='RUC (11 digitos)' autoComplete='false' maxLength={11}
                        value={ruc} onChange={ev => setRuc(ev.currentTarget.value)} />
                    <br />
                    <Form.Control type='text' name='razonSocial' placeholder='Razon Social' autoComplete='false'
                        value={razonSocial} onChange={ev => setRazonSocial(ev.currentTarget.value)} />
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
            )}
        </div>
    )
}

const Validate = (ruc: string, razonSocial: string, telefono: string, correo: string, proveedores: Proveedor[]) => {
    if (ruc === '' || razonSocial === '' || telefono === '' || correo === '') return 'Todos los campos son obligatorios'
    if (!/^\d{11}$/.test(ruc)) return 'El RUC debe tener 11 digitos numericos'
    if (!/^\d{9}$/.test(telefono)) return 'El telefono debe tener 9 digitos numericos'
    if (!correo.includes('@')) return 'El correo no es valido'
    if (proveedores.some(prov => prov.ruc === ruc)) return 'El RUC ya esta registrado'
    return ''
}

export default Proveedores