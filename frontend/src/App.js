import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import CartConnection from './pages/CartConnection';
import Login from './pages/Login';
import SignUp from './pages/Signup';
import Navbar from './components/Navbar';
import { useAuthContext } from './context/AuthContext';
import { useEffect, useState } from 'react';

function App() {
  const { user } = useAuthContext();
  const [connectionURL, setConnectionURL] = useState();

  useEffect(() => {
    if (localStorage.getItem('cart') != null) {
      setConnectionURL(JSON.parse(localStorage.getItem('cart')));
    }
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              user && connectionURL ? <Home /> : <Navigate to="/cartconnection" />
            }
          />
          <Route
            path="/cartconnection"
            element={
              !user ? (
                <Navigate to="/login" />
              ) : connectionURL ? (
                <Navigate to="/" />
              ) : (
                <CartConnection />
              )
            }
          />
          <Route
            path="/login"
            element={!user ? <Login /> : <Navigate to="/cartconnection" />}
          />
          <Route
            path="/signup"
            element={!user ? <SignUp /> : <Navigate to="/" />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
