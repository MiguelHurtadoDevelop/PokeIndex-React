
import { onAuthStateChanged } from "firebase/auth";
import React, { useState, useEffect } from "react";
import { db } from "./Firebase";
import { auth } from "./Firebase";
import { doc, setDoc, increment, getDoc, collection, getDocs, query, orderBy  } from "firebase/firestore";
import './PokemonGame.css';



function PokemonGame() {
  const randomNum = Math.floor(Math.random() * 1001);

  const [pokemon, setPokemon] = useState();
  const [types, setTypes] = useState([]);
  const [selectedType, setSelectedType] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [isIncorrect, setIsIncorrect] = useState(false);
  const [scores, setScores] = useState([]);

  function cargarPokemon() {
    fetch(`https://pokeapi.co/api/v2/pokemon/${randomNum}`)
      .then(response => response.json())
      .then(datosAPI => {
        setPokemon(datosAPI);
  
        // Obtén tipos aleatorios adicionales excluyendo el tipo del Pokémon
        mostrarTiposPosibles(datosAPI.types[0].type.name);
       
  
        setSelectedType(datosAPI.types[0].type.name); // Tipo correcto
        setIsLoaded(true);
        setIsCorrect(false); 
        setIsIncorrect(false);
      });
  }

  function mostrarTiposPosibles(tipoCorrecto) {
    const tiposPosibles = ['normal', 'fire', 'water', 'grass', 'electric', 'ice', 'fighting', 'poison', 'ground', 'flying', 'psychic', 'bug', 'rock', 'ghost', 'dragon', 'dark', 'steel', 'fairy'];
  
    // Filtrar los tipos para excluir el tipo proporcionado
    const tiposFiltrados = tiposPosibles.filter(tipo => tipo !== tipoCorrecto);
  
    // Obtener dos tipos aleatorios de los tipos filtrados
    const tiposAleatorios = [];
    tiposAleatorios.push(tipoCorrecto);
    for (let i = 0; i < 4; i++) {
      const tipoAleatorio = tiposFiltrados[Math.floor(Math.random() * tiposFiltrados.length)];
      tiposAleatorios.push(tipoAleatorio);
      // Eliminar el tipo aleatorio de la lista para evitar duplicados
      tiposFiltrados.splice(tiposFiltrados.indexOf(tipoAleatorio), 1);
      
    }
    
    tiposAleatorios.sort(() => Math.random() - 0.5); // Mezclar los tipos
    setTypes(tiposAleatorios);
  
    return tiposAleatorios;
  }

  useEffect(() => {cargarPokemon(), cargarPuntuaciones() },[]);

  function checkType(e) {
    const selectedTypeName = e.target.innerText.toLowerCase();
    if (isLoaded && selectedTypeName === selectedType.toLowerCase()) {
      setIsCorrect(true);
      setIsIncorrect(false);
      actualizarPuntuacionUsuario(3);
      cargarPokemon();
    } else {
      setIsCorrect(false);
        setIsIncorrect(true);
      actualizarPuntuacionUsuario(-1);
      
      // Agrega lógica para manejar respuesta incorrecta (puedes agregar clases de estilo, mensajes, etc.)
    }
  }


  function actualizarPuntuacionUsuario(puntos) {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                let nombre = user.displayName;
                

                const userRef = doc(db, 'TablaPuntuaciones', nombre);

                getDoc(userRef).then(userDoc => {
                    if (userDoc.exists && userDoc.data()) {
                        const userData = userDoc.data();
                        if (userData.puntuacion > 0 || puntos > 0) {
                            setDoc(userRef, {
                                NombreUsuario: nombre,
                                puntuacion: increment(puntos),
                            }, { merge: true })
                            .then(() => {
                                cargarPuntuaciones();
                            })
                            .catch((error) => {
                                console.error('Error al actualizar la puntuación:', error);
                            });
                        }
                    } else {
                        setDoc(userRef, {
                            NombreUsuario: nombre,
                            puntuacion: puntos > 0 ? puntos : 0,
                        })
                        .then(() => {
                            cargarPuntuaciones();
                        })
                        .catch((error) => {
                            console.error('Error al crear el registro:', error);
                        });
                    }
                });
            }
        });
    }  

    function cargarPuntuaciones() {
        const q = query(collection(db, 'TablaPuntuaciones'), orderBy('puntuacion', 'desc'));
        getDocs(q).then(querySnapshot => {
            if (querySnapshot.docs) {
                const scores = querySnapshot.docs.map(doc => doc.data());
                setScores(scores);
            } else {
                console.log('No se encontraron documentos');
            }
        });
    }

  


    if (isLoaded) {
        return (
            <>
            <div className="PokemonGame">
                <div className="gameContainer">
                    <img src="https://fontmeme.com/permalink/240214/97cf844bc3165dc8bfb2d144881c3579.png" alt="fuente-pokemon" border="0"/>
                    <h2>¿Qué tipo de Pokémon es este?</h2>
                    <h3>{pokemon.name.toUpperCase()}</h3>
                    <div className="image">
                        <img id="pokeImg" className="" src={pokemon.sprites.other.home.front_default} alt=""></img>
                    </div>
                    <div className="input">
                    <div className="types">
                        {types.map((type, index) => (
                        <button key={index} onClick={checkType}>{type}</button>
                        ))}
                    </div>
                    <button id="btnNewGame" className="" onClick={cargarPokemon}>NEW GAME</button>
                    </div>
                    {isCorrect && <p style={{ color: 'green' }}>¡Correcto! Has ganado 3 puntos.</p>}
                    {isIncorrect && <p style={{ color: 'red' }}>¡Incorrecto! Has perdido 1 punto.</p>}
                    
                </div>
                <div className="TablaPuntuaciones">
                    <h2>Puntuaciones</h2>
                    <table>
                        <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Puntuación</th>
                        </tr>
                        </thead>
                        <tbody>
                        {scores.map((score, index) => (
                            <tr key={index}>
                            <td>{score.NombreUsuario}</td>
                            <td>{score.puntuacion}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
                
            </div>
            
        </>
        );


    } else {
        return <div className="loader"></div>;
    }
}


export default PokemonGame;

