import { useState } from "react";
import Modal from "./Modal";

function ProductCard({ product, onDelete }) {
  const [showModal, setShowModal] = useState(false);

  const handleDelete = () => {
    onDelete(product.id);
    setShowModal(false);
  };

  return (
    <>
      <button onClick={() => setShowModal(true)}>Eliminar</button>

      {showModal && (
        <Modal
          text="¿Seguro que querés eliminar?"
          onConfirm={handleDelete}
          onCancel={() => setShowModal(false)}
        />
      )}
    </>
  );
}