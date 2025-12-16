import React from 'react';
import "./footer.css"; 

const Footer = () => {
  return (
    <footer className="footer">
      <div className="topSection">
        <h4>WHERE TO?</h4>
        <ul className="navLinks">
          <li>OUTSIDE</li>
          <li>INTERIOR</li>
          <li>LOCATION</li>
          <li>VIDEO</li>
          <li>TEAM</li>
          <li>ENQUIRE</li>
        </ul>
      </div>

      <div className="bottomSection">
        <span className="leftText">Elaborado con un propósito estrictamente educativo</span>
        <span className="centerText">Back to top</span>
        <span className="rightText">
          © 2025 Vinil — Todos los Derechos Reservados. Desarrollado por Nahuel Coria
        </span>
      </div>
    </footer>
  );
};

export default Footer;