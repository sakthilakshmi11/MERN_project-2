import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

import Navbar from "./Navbar";
import Home from "./Home";
import Products from "./Products";
import Contact from "./Contact";
import Cart from "./Cart";
import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  const [cart, setCart] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("token")
  );

   //   Persiste login state on page refresh or multi-tab
  useEffect(() => {
    const handleStorageChange = () => {
      setIsLoggedIn(!!localStorage.getItem("token"));
    };
    window.addEventListener("storage", handleStorageChange);
    return() => window.removeEventListener("storage", handleStorageChange);
  })

  // useEffect --- watch cart changes
  useEffect(() => {
    console.log("Cart Updated:", cart); 
  }, [cart]);

  //Add prrodu t to cart
  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  //update login state after login/register/logout
  const handleLoginState = (state) => setIsLoggedIn(state);

  return (
    <>
    {/* Navbar */}
      <Navbar 
        cartCount={cart.length}
        isLoggedIn={isLoggedIn}
        onLogout={() => {
          localStorage.removeItem("token");
          handleLoginState(false);
        }} 
        />

      {/*Routes*/}
      <Routes>
        {/*PUBLIC ROUTES*/}
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route 
           path="/login"
           element={<Login onLogin={() => handleLoginState(true)} />
          }
           />

           <Route 
           path="/Register"
           element={<Register onRgister={() => handleLoginState(true)} />
          }
           />

           {/*PROTECTED ROUTES*/}
           <Route 
              path="/products" 
              element={
            <ProtectedRoute>
              <Products addToCart={addToCart} />
            </ProtectedRoute>
          } 
          />

          <Route
             path="/cart"
             element={
              <ProtectedRoute>
                <Cart cart={cart} />
              </ProtectedRoute>
             }
             />

          
      </Routes>
    </>
  );
}

export default App;
