import { useState } from "react";

function ProductForm() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  const validate = () => {
    if (!name) return "Nombre obligatorio";
    if (price <= 0) return "Precio inválido";
    if (description.length < 10) return "Descripción muy corta";
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    const handleSubmit = async (e) => {
  e.preventDefault();

  const validationError = validate();
  if (validationError) return;

  const product = { name, price, description };

  await fetch(URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  });
};

  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <p className="error">{error}</p>}
      {/* inputs */}
    </form>
  );
}

export default ProductForm;