import { useContext } from "react";
import { Link } from "react-router-dom";
import { CarritoContext } from "../context/CarritoContext";
import "./navbar.css";

import {
  MagnifyingGlassIcon,
  UserIcon,
  ShoppingBagIcon,
} from "@heroicons/react/24/outline";

const Navbar = () => {
  const { cart, toggleCart } = useContext(CarritoContext);

  const totalItems = cart.reduce(
    (acc, item) => acc + item.quantity,
    0
  );

  return (
    <nav className="navbar">
      <ul className="nav-links">
        <li><Link to="/">INICIO</Link></li>
        <li><Link to="/productos">PRODUCTOS</Link></li>
        <li><Link to="/contacto">CONTACTO</Link></li>
      </ul>

      <h2 className="logo">VINIL</h2>

      <ul className="nav-icons">
        <li><MagnifyingGlassIcon className="icon" /></li>
        <li><UserIcon className="icon" /></li>

        {/* CARRITO */}
        <li className="cart-icon" onClick={toggleCart}>
          <ShoppingBagIcon className="icon" />
          {totalItems > 0 && (
            <span className="cart-count">{totalItems}</span>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;