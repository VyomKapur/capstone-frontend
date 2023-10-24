import { useState, useEffect } from "react";
import { useAuthContext } from "../context/AuthContext";
import Item from '../components/Item.js';
import { useCartConnectionContext } from "../context/CartContext"; 

const Home = () => {
    const { user } = useAuthContext();
    const { dispatch } = useCartConnectionContext(); 
    const [items, setItems] = useState([]);
    const [recommended, setRecommended] = useState([]);
    const [connectionURL, setConnectionURL] = useState("");

    const handleDisconnect = (e) => {
        e.preventDefault();
        disconnectCart(dispatch); 
    }

    useEffect(() => {
        let intervalId;

        const getItems = async () => {
            const response = await fetch(`http://localhost:3500/items/${connectionURL}`, {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            });
            const json = await response.json();
            setItems(json);
        }


        if (user) {
            getItems();
            intervalId = setInterval(getItems, 2000);
        }

        return () => {
            if (intervalId) {
                clearInterval(intervalId); 
            }
        };
    }, [user, connectionURL]);

    useEffect(() => {
        const cartData = JSON.parse(localStorage.getItem('cart'));
        if (cartData && cartData.connectionURL) {
            setConnectionURL(cartData.connectionURL);
        }
    }, []);

    useEffect(() => {
        const getRecommendations = async() =>{
            const response = await fetch('http://localhost:3500/items/recommended', {
                method: 'POST',
                body: {
                    'items': JSON.stringify(items)
                },
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            });
            const json = await response.json();
            setRecommended(json);
        }
        if(user.wow != null){
            getRecommendations();
        }
    }, [items, user]);

    return (
        <div>
            {connectionURL ? (
                <button onClick={handleDisconnect}>Disconnect Cart</button>
            ): (
                <>
                </>
            )}
            <div className="cart-items">
            {items?.map((item) => (
                <div key={item._id}><Item item={item} /></div>
            ))}
            </div>
            <div className="recommended-items">
            {recommended?.map((item) => (
                <div key={item._id}><Item item={item}/></div>
            ))}
            </div>
        </div>
    );
}

export default Home;

const disconnectCart = (dispatch) => {
    dispatch({ type: 'disconnect-cart' });
    localStorage.removeItem('cart');
    window.location.reload(false);
}
