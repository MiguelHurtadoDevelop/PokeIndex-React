import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { useParams } from 'react-router-dom';
import { Chart, CategoryScale, LinearScale, BarElement } from 'chart.js';
import './DetallePokemon.css';

Chart.register(CategoryScale);
Chart.register(LinearScale);
Chart.register(BarElement);

function DetallesPokemon() {
  const { pokemon } = useParams();
  const [pokemonDetalles, setPokemonDetalles] = useState(null);

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
      .then(response => response.json())
      .then(datos => {
        setPokemonDetalles(datos);
      });
  }, [pokemon]);

  if (!pokemonDetalles) {
    return <div class="loader"></div>;
  }

  const data = {
    labels: ['HP', 'Ataque', 'Defensa', 'Velocidad', 'Ataque Especial', 'Defensa Especial'],
    datasets: [
      {
        label: 'Estadísticas',
        data: pokemonDetalles.stats ? pokemonDetalles.stats.map((stat) => stat.base_stat) : [],
        backgroundColor: [
          'rgba(255, 99, 132, 0.7)',
          'rgba(54, 162, 235, 0.7)',
          'rgba(255, 206, 86, 0.7)',
          'rgba(75, 192, 192, 0.7)',
          'rgba(153, 102, 255, 0.7)',
          'rgba(255, 159, 64, 0.7)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      }
    ]
  };

  return (
    <div className="DetallesPokemonContainer">
      <div className="DetallesPokemonLeft">
        <h1 className="DetallesPokemonTitle">{pokemonDetalles.name}</h1>
        <img
          className="DetallesPokemonImage"
          src={pokemonDetalles.sprites?.front_default}
          alt={pokemonDetalles.name}
        />
      </div>
      <div className="DetallesPokemonRight">
        <p>Altura: {pokemonDetalles.height} dm</p>
        <p>Peso: {pokemonDetalles.weight} hg</p>
        <h2 className="DetallesPokemonSectionTitle">Tipo:</h2>
        <div className="DetallesPokemonTypeList">
          {pokemonDetalles.types?.map((tipo, index) => (
              <p className={`tipoDetalles ${tipo.type.name}`} key={index}>{tipo.type.name.toUpperCase()}</p>
          ))}
        </div>
        <h2 className="DetallesPokemonSectionTitle">Estadísticas:</h2>
        <Bar className="DetallesPokemonChart" data={data} />
      </div>
    </div>
  );
}

export default DetallesPokemon;
