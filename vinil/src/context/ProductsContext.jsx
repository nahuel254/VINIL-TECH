import { createContext, useEffect, useState } from "react";

export const ProductsContext = createContext();

const API_URL = "https://693e32b6f55f1be793048cb8.mockapi.io/productos/productos";

export function ProductsProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const getProducts = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await fetch(API_URL);
      if (!res.ok) throw new Error("Error al obtener productos");

      const data = await res.json();
      setProducts(data);
    } catch (err) {
      setError("No se pudieron cargar los productos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <ProductsContext.Provider
      value={{
        products,
        loading,
        error,
        refreshProducts: getProducts,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
}