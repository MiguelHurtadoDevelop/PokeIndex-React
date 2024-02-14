
import './App.css';
import { Link } from 'react-router-dom';  


function App() {

    

  return (
    <div className="AppContainer">
        <div className="App">
          <header className="App-header">
            <h1>Bienvenido a PokeIndex</h1>
            <p>¡Explora el fascinante universo Pokémon!</p>
            <img
              src="https://img.icons8.com/color/452/pokeball-2.png"
              alt="Pokéball"
              className="pokeball-icon"
            />
            <p>
              Descubre información detallada sobre tus Pokémon preferidos y reta tus conocimientos sobre pokemons.
            </p>
            <Link to="/PokemonGame"><button className="start-button">Comenzar mi Aventura</button></Link>
            
            <p>
              ¡No olvides registrarte para guardar tus logros y puntuaciones en la
              PokéTabla de Honor!
            </p>
            <img
              src="https://img.icons8.com/color/452/pokedex.png"
              alt="Pokédex"
              className="pokedex-icon"
            />
          </header>
      </div>
    </div>
  );

}

export default App
