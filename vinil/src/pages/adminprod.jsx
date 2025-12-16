import { useEffect, useState } from "react";
import "./adminprod.css";

const URL =
  "https://693e32b6f55f1be793048cb8.mockapi.io/productos/productos";

function AdminProd() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // formulario
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  // edición
  const [editingId, setEditingId] = useState(null);

  // modal delete
  const [showModal, setShowModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  // -------------------------
  // OBTENER PRODUCTOS
  // -------------------------
  const fetchProducts = () => {
    setLoading(true);
    fetch(URL)
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch(() => setError("Error al cargar productos"))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // -------------------------
  // VALIDACIÓN
  // -------------------------
  const validate = () => {
    if (!name.trim()) return "Nombre obligatorio";
    if (price <= 0) return "Precio inválido";
    if (description.length < 10)
      return "Descripción mínima de 10 caracteres";
    return "";
  };

  // -------------------------
  // SUBMIT (CREATE / EDIT)
  // -------------------------
  const handleSubmit = (e) => {
    e.preventDefault();

    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    setError("");

    const productData = {
      name,
      price,
      description,
    };

    if (editingId) {
      // EDITAR
      fetch(`${URL}/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productData),
      }).then(() => {
        resetForm();
        fetchProducts();
      });
    } else {
      // CREAR
      fetch(URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productData),
      }).then(() => {
        resetForm();
        fetchProducts();
      });
    }
  };

  // -------------------------
  // EDITAR
  // -------------------------
  const handleEdit = (product) => {
    setEditingId(product.id);
    setName(product.name);
    setPrice(product.price);
    setDescription(product.description);
  };

  // -------------------------
  // DELETE
  // -------------------------
  const confirmDelete = (product) => {
    setProductToDelete(product);
    setShowModal(true);
  };

  const handleDelete = () => {
    fetch(`${URL}/${productToDelete.id}`, {
      method: "DELETE",
    }).then(() => {
      setShowModal(false);
      setProductToDelete(null);
      fetchProducts();
    });
  };

  // -------------------------
  // RESET FORM
  // -------------------------
  const resetForm = () => {
    setName("");
    setPrice("");
    setDescription("");
    setEditingId(null);
  };

  return (
    <section className="admin">
      <h1>Admin Productos</h1>

      {/* FORM */}
      <form onSubmit={handleSubmit} className="admin-form">
        <input
          type="text"
          placeholder="Nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="number"
          placeholder="Precio"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <textarea
          placeholder="Descripción"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button type="submit">
          {editingId ? "Guardar cambios" : "Agregar producto"}
        </button>

        {editingId && (
          <button
            type="button"
            onClick={resetForm}
            className="cancel-btn"
          >
            Cancelar edición
          </button>
        )}

        {error && <p className="error">{error}</p>}
      </form>

      {loading && <p>Cargando...</p>}

      {/* LISTA */}
      <ul className="product-list">
        {products.map((product) => (
          <li className="product-item" key={product.id}>
            <div>
              <strong>{product.name}</strong> — ${product.price}
            </div>

            <div className="product-actions">
              <button
                className="edit-btn"
                onClick={() => handleEdit(product)}
              >
                Editar
              </button>
              <button
                className="delete-btn"
                onClick={() => confirmDelete(product)}
              >
                Eliminar
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* MODAL */}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <p>
              ¿Seguro que querés eliminar{" "}
              <strong>{productToDelete.name}</strong>?
            </p>
            <button onClick={handleDelete}>Sí, eliminar</button>
            <button onClick={() => setShowModal(false)}>
              Cancelar
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

export default AdminProd;