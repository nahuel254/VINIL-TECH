import { createContext, useState } from "react";

export const CarritoContext = createContext();

function CarritoProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // AGREGAR AL CARRITO
  const addToCart = (product) => {
    setCart((prevCart) => {
      const exists = prevCart.find(item => item.id === product.id);

      if (exists) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prevCart, { ...product, quantity: 1 }];
    });

    setIsCartOpen(true); //abre el drawer
  };

  // ABRIR / CERRAR DRAWER
  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);
  const toggleCart = () => setIsCartOpen(prev => !prev);

  // ELIMINAR del drawer
  const removeFromCart = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const clearCart = () => setCart([]);

  return (
    <CarritoContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        isCartOpen,
        openCart,
        closeCart,
        toggleCart
      }}
    >
      {children}
    </CarritoContext.Provider>
  );
}

export default CarritoProvider;