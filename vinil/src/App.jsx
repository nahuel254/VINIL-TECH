import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import Home from "./pages/home";
import Footer from "./components/footer";
import Productos from "./pages/productos";
import AdminProd from "./pages/adminprod";

import { ProductsProvider } from "./context/ProductsContext";
import CarritoProvider from "./context/CarritoContext";
import CartDrawer from "./components/CartDrawer";

function App() {
  return (
    <BrowserRouter>
      <CarritoProvider>
        <ProductsProvider>

          <Navbar />
          <CartDrawer /> 

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/productos" element={<Productos />} />
            <Route path="/admin" element={<AdminProd />} />
          </Routes>

          <Footer />

        </ProductsProvider>
      </CarritoProvider>
    </BrowserRouter>
  );
}

export default App;
