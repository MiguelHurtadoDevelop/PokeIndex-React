import { Link,  useNavigate} from 'react-router-dom';   
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import { useState, useEffect } from 'react';



function Navigation(){
    
    const [displayName, setUserName] = useState('')
    const navegacion = useNavigate();
    


    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
          if (user) {
            // User is signed in
            const uid = user.uid;
            setUserName(user.displayName);
          } else {
            setUserName('');
          }
        });
    
        
      }, []);
    
    function CerrarSesion(){
        auth.signOut()
        .then(() => {
            console.log('Sign-out successful.')
            setUserName('')
            navegacion('/')
  
        }).catch((error) => {
            // An error happened.
        });
    }  

    
    if (displayName === '') {
        return (
            <>
                <header>
                    <Link to="/"><img src="https://fontmeme.com/permalink/240214/134efef193be9ab4e0b14e0a09a14717.png" alt="fuente-pokemon" border="0"/></Link>
                    
                    <nav>
                        <ul>
                            <li>
                            <Link to="/">Home</Link>
                            </li>
                            <li>
                                <Link to="/Pokemon">Pokemon</Link>
                            </li>
                            
                        </ul>
                    </nav>        
                            
                    <nav>
                        <ul>
                            <li>
                                <Link to="/Login">Iniciar Sesion</Link>
                            </li>
                            <li>
                                <Link to="/Registro">Registro</Link>
                            </li>
                        </ul>
                        
                    </nav>
                                
    
                            
    
                        
                </header>
            </>
            
        )
    }else{
        return (
            <>
                <header>
                    <h1>PokeIndex</h1>
                    
                    <nav>
                        <ul>
                            <li>
                                <Link to="/">Home</Link>
                            </li>
                            <li>
                                <Link to="/Pokemon">Pokemon</Link>
                            </li>
                            <li>
                                <Link to="/PokemonGame">Jugar</Link>
                            </li>
                        </ul>
                    </nav>        
                            
                    <nav>
                        <h4>{displayName}</h4>
                        <ul>
                        <li onClick={CerrarSesion}>Cerrar Sesion</li>
                        </ul>
                        
                    </nav>
                                
    
                            
    
                        
                </header>
            </>
            
        )
       
    }

    
}
export default Navigation;