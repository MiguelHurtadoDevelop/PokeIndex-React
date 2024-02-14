import React, { useState } from "react";
import { auth } from "./Firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useNavigate} from 'react-router-dom';   
import './Registro.css';

function Registro() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [Nombre, setDisplayName] = useState('');
  const [error, setError] = useState(null);
  const navegacion = useNavigate();

  async function crearUsuario() {
    try {
      // Limpiar errores previos
      setError(null);

      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      // Obtén el usuario recién creado
      const usuario = userCredential.user;

      // Actualiza el perfil del usuario con el displayName
      await updateProfile(usuario, { displayName: Nombre });
      navegacion('/login')
      

      // Puedes redirigir al usuario o realizar otras acciones después del registro
    } catch (error) {
      // Manejar errores
      const errorCode = error.code;
      const errorMessage = error.message;

      console.error('Error al registrar el usuario:', errorCode, errorMessage);

      // Mostrar el error al usuario
      setError(errorMessage);
    }
  }

  return (
    <div className="register-container">
      <h1>Registro</h1>

      <input className="input-field" type="text" placeholder="Nombre" onChange={(e) => setDisplayName(e.target.value)} />
      <input className="input-field" type="text" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input className="input-field" type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />

      {error && <p className="error-message">{error}</p>}

      <button className="register-button" onClick={crearUsuario}>Registrarse</button>
    </div>
  );
}

export default Registro;
