import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
    createBrowserRouter,
    RouterProvider,
    Route,
    Link,
    Outlet
  } from "react-router-dom";
import Pokemon from './Componentes/Pokemon.jsx';
import Login from './Componentes/Login.jsx';
import Navigation from './Componentes/Navigation.jsx';
import DetallesPokemon from './Componentes/DetallesPokemon.jsx';
import Registro from './Componentes/Registro.jsx';
import PokemonGame from './Componentes/PokemonGame.jsx';
import PrivateRoute from './Componentes/PrivateRoute.jsx';
import Foter from './Componentes/Foter.jsx'; 
import Error404 from './Componentes/Error404.jsx';

const router = createBrowserRouter([
    {
        element:(
            <>
                <Navigation></Navigation>
                <Outlet></Outlet>
                <Foter></Foter>
            </>
        ),
        children:[
            {
                path: "/",
                element: <App></App>,
            },
            {
                path: "Pokemon",
                element: <Pokemon></Pokemon>,
            },
            {
                path: "Login",
                element: <Login></Login>,
            },
            {
                path: "detalle/:pokemon",
                element: <DetallesPokemon></DetallesPokemon>,
            },
            {
                path: "Registro",
                element: <Registro></Registro>,
            },
            {
                path: "PokemonGame",
                element: (
                    <PrivateRoute>
                        <PokemonGame />
                    </PrivateRoute>
                ),
            },
            {
                path: "*",
                element: <Error404></Error404>,
            }

        ]
    }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
    <RouterProvider router={router} />
)