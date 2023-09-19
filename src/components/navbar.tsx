import { Link } from 'react-router-dom';
import { auth } from '../config/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { signOut } from 'firebase/auth'

import '../styles/navbar.css';

export const Navbar = () => {

    const [user] = useAuthState(auth);

    const signUserOut = async () => {
        await signOut(auth);
    }

    return(
        <div className='navbar'>
            <div className='links'>
                <Link to="/"> Home </Link>
                { !user ?
                    ( <Link to="/login"> Login </Link> ) :
                    ( <Link to="/createpost"> Create Post </Link> )
                }
            </div>
            <div className='user'>
                {user && (
                    <>
                        <div>{user?.displayName}</div>
                        <img src={user?.photoURL || ""}></img>
                        <button onClick={signUserOut}> Log Out</button>
                    </>
                )}
                
            </div>
        </div>
    );
}