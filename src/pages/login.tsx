import '../styles/login.css';
import { auth, provider } from '../config/firebase';
import { signInWithPopup } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'

export const Login = () => {

    const navigate = useNavigate();
    
    const signInWithGoogle  = async () => {
        // the 'auth' variable contains all the user info
        const result = await signInWithPopup(auth,provider);
        console.log(result);
        navigate("/");
    }


    return (
        <div className="login-container">
            <p>Sign In With Google To Continue</p>
            <button onClick={signInWithGoogle}>Sign In With Google</button>
        </div>
    );
}