import { Link } from 'react-router-dom'

function NoEncontrado() {
    return (
        <div>
            <h2>Error 404</h2>
            <p>La pagina que busca no existe</p>
            <Link to='/'>Volver al inicio</Link>
        </div>
    )
}

export default NoEncontrado