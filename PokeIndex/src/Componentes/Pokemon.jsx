import {useState, useEffect} from 'react'
import { Link } from 'react-router-dom';
import './Pokemon.css'
let url;


function Pokemon() {
    const [pokemon, setPokemon] = useState([])
    const [cargando, setCargando] = useState(true)
    const [PokemonDetalles, setPokemonDetalles] = useState([])

    function cargarMas() {
        setCargando(true)
        fetch(url)
        .then(response => response.json())
        .then(datos => {
            url = datos.next,
            cargarDatos(datos.results)
            setCargando(false)

        })
    }

    useEffect(() => {
        fetch('https://pokeapi.co/api/v2/pokemon/?offset=0&limit=8')
        .then(response => response.json())
        .then(datos => {
            url = datos.next
            cargarDatos(datos.results)
        })
        
    }, [])

    async function cargarDatos(pokemon) {

        let detalles = await Promise.all(pokemon.map(async pokemon => {
            let detalles = await fetch(pokemon.url)
            .then(response => response.json())
            return detalles
        }))
        setPokemonDetalles([...PokemonDetalles,...detalles])
        setCargando(false)
    }
    
      

    let listaDiv = PokemonDetalles.map((pokemon, index) => {
        return (
            
                <Link className='pokemon' to={`/detalle/${pokemon.name}`} key={index}>
                {/* Usa Link en lugar de 'a' */}
                    
                    <div className='pokemonImg'>
                            <img src={pokemon.sprites.front_default} alt={pokemon.name} />
                    </div>
                    <div className='pokemonDatos'>
                        <p>N.º {pokemon.id}</p>
                        <h2>{pokemon.name.toUpperCase()}</h2>
                        <div className='pokemonTipo'>
                            {pokemon.types.map((tipo, index) => {
                                return <p className={`tipo ${tipo.type.name}`} key={index}>{tipo.type.name.toUpperCase()}</p>
                            })}
                        </div>
                    </div>
                        
                    
                </Link>
           
            
            
        );
    });

    
   

    if(cargando) {
        return <div class="loader"></div>
    }
    return (
        <>
            <div className='container' >
                <div className='PokemonContainer'>
                
                <img src="https://fontmeme.com/permalink/240214/4a37ea151226d7bff0f1e19671d06974.png" alt="fuente-pokemon" border="0"/>
                   
                    

                    <div className='pokemons'>
                        {listaDiv}
                    </div>

                    <button onClick={cargarMas}>Cargar más</button>
                </div>
            </div>
            
            
            
        </>
    )
}

export default Pokemon