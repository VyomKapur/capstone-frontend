import { useAuthContext } from "../context/AuthContext";

const Navbar = () => {
    const { user, dispatch } = useAuthContext();
    const handleLogout = (e) => {
        e.preventDefault();
        dispatch({ type: 'logout' });
        localStorage.removeItem('user');
    }
    return (
    <div>
        Smart Cart
        {user ? (
        <div>
            <button onClick={handleLogout}>Logout</button>
        </div>
        ):(
        <>
        <a href='/signup'>Sign Up</a>
        <a href='/login'>Login</a>
        </>
        )}
    </div>
    );
};

export default Navbar;
