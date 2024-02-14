import { GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword} from 'firebase/auth';
import {auth} from './Firebase';
import { useState } from 'react';
import { Link,  useNavigate} from 'react-router-dom';   
import './Login.css';


function Login(){

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navegacion = useNavigate();


    function IniciarSesion(){
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
           navegacion('/')
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            setError(errorMessage);
        });

    }
    function IniciarSesionConGoogle(){
        const provider = new GoogleAuthProvider();

        signInWithPopup(auth, provider)
        .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            navegacion('/')

            
            // IdP data available using getAdditionalUserInfo(result)
            // ...
        }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
        });
    }
    

    return (
        <>
            <div className="login-container">
                <h1>Login</h1>

                <input className="input-field" type="text" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                <input className="input-field" type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                {error && <p className="error-message">{error}</p>}
                <button className="login-button" onClick={IniciarSesion}>Login</button>
                <button className="google-login-button" onClick={IniciarSesionConGoogle}>Login con Google</button>
            </div>
        </>
    )
}

export default Login;