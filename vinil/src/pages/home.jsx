import { useState, useEffect } from "react";
import "./home.css";

// imágenes del carousel
import colorada from "../assets/colorada.jpg";
import kalma from "../assets/kalma.jpg";
import knak from "../assets/knak.jpg";
import ramma from "../assets/ramma.jpg";
import sza from "../assets/sza.jpg";
import thew from "../assets/thew.png";

//  NEW
import persona from "../assets/fullbody.jpg";
import portada from "../assets/portada.jpg";
import dorso from "../assets/dorso.jpg";

const Home = () => {
  /* ================== CAROUSEL ================== */
  const images = [colorada, kalma, knak, ramma, sza, thew];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [images.length]);

  /* ================== NEW SECTION ================== */
  const productos = [
    { id: 1, img: portada },
    { id: 2, img: dorso },
  ];

  return (
    <>
      {/* HERO / CAROUSEL */}
      <section className="hero-carousel">
        {images.map((img, i) => (
          <img
            key={i}
            src={img}
            alt={`slide-${i}`}
            className={`slide ${i === index ? "active" : ""}`}
          />
        ))}
      </section>

      {/* ================== NeEW ================== */}
      <section className="shop-section">
        <div className="look-container">
          <img src={persona} alt="Look completo" className="look-img" />
        </div>

        <div className="products-container">
          <h2 className="shop-title">NUEVO</h2>

          <div className="product-list">
            {productos.map((item) => (
              <div className="product-card" key={item.id}>
                <img
                  src={item.img}
                  alt="Producto del look"
                  className="product-img"
                />
              </div>
            ))}
          </div>

          <p className="look-title">"KALMA" IS OUT</p>
        </div>
      </section>
    </>
  );
};

export default Home;