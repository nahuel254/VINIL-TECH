import { useEffect, useState, useContext } from "react";
import { CarritoContext } from "../context/CarritoContext";
import "./productos.css";

const URL = "https://693e32b6f55f1be793048cb8.mockapi.io/productos/productos"; 

function Productos() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { addToCart } = useContext(CarritoContext);

  useEffect(() => {
    fetch(URL)
      .then((res) => {
        if (!res.ok) throw new Error("Error al cargar productos");
        return res.json();
      })
      .then((data) => setProducts(data))
      .catch(() => setError("No se pudieron cargar los productos"))
      .finally(() => setLoading(false));
  }, []);

  const openModal = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  if (loading) return <p className="status">Cargando...</p>;
  if (error) return <p className="status error">{error}</p>;

  return (
    <section className="products">
      <div className="products-grid">
        {products.map((product) => (
          <article
            className="producto-card"
            key={product.id}
            onClick={() => openModal(product)}
          >
            <div className="image-wrapper">
              <img src={product.avatar} alt={product.name} />
            </div>

            <div className="product-info">
              <div className="product-text"> 
                <p className="product-name">{product.name}</p>
                <p className="product-price">${product.price}</p>
              </div>

              <button
                className="add-btn"
                onClick={(e) => {
                   e.stopPropagation();
                   addToCart(product);
                     }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                  />
                </svg>
              </button>
            </div>
          </article>
        ))}
      </div>

      {isModalOpen && selectedProduct && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>×</span>
            <img src={selectedProduct.avatar} alt={selectedProduct.name} />
            <h2>{selectedProduct.name}</h2>
            <p>{selectedProduct.description}</p>
            <p className="modal-price">${selectedProduct.price}</p>
          </div>
        </div>
      )}
    </section>
  );
}

export default Productos;