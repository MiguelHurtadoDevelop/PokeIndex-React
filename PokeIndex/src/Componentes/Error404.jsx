import {Link } from "react-router-dom"
import './Error404.css'

function Error404(){
    
    return(
        <>
        <div className="ErrorContainer">
            <div className="Error">
                <h1>La pagina que buscas no existe.</h1>
                <p>¿Quieres volver al inicio?</p>
                <Link to="/"><button>Volver al inicio</button></Link>
            </div>
        </div>
            
            
        </>
    )
}
export default Error404