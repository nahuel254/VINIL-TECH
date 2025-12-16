import { useContext } from "react";
import { CarritoContext } from "../context/CarritoContext";
import "./CarritoDrawer.css";

function CarritoDrawer() {
  const {
    cart,
    isCartOpen,
    closeCart,
    removeFromCart,
    clearCart
  } = useContext(CarritoContext);

  const total = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <>
      {isCartOpen && <div className="cart-overlay" onClick={closeCart}></div>}

      <aside className={`cart-drawer ${isCartOpen ? "open" : ""}`}>
        <header className="cart-header">
          <h2>Tu carrito</h2>
          <button onClick={closeCart}>✕</button>
        </header>

        <div className="cart-items">
          {cart.length === 0 && <p>El carrito está vacío</p>}

          {cart.map(item => (
            <div className="cart-item" key={item.id}>
              <img src={item.avatar} alt={item.name} />
              <div>
                <p>{item.name}</p>
                <span>{item.quantity} x ${item.price}</span>
              </div>
              <button onClick={() => removeFromCart(item.id)}>🗑</button>
            </div>
          ))}
        </div>

        {cart.length > 0 && (
          <footer className="cart-footer">
            <p className="total">Total: ${total}</p>
            <button className="clear" onClick={clearCart}>Vaciar</button>
            <button className="checkout">Comprar</button>
          </footer>
        )}
      </aside>
    </>
  );
}

export default CarritoDrawer;