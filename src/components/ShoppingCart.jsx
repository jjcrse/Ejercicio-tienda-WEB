import { useState } from "react";

const PRODUCTOS_DISPONIBLES = [
  { id: 1, nombre: "Monitor Gamer", precio: 300 },
  { id: 2, nombre: "Teclado Mecánico", precio: 80 },
  { id: 3, nombre: "Mouse Pro", precio: 50 },
];

export default function ShoppingCart() {
  const [cart, setCart] = useState([]);

  const addToCart = (producto) => {
    setCart((prevCart) => {
      const existe = prevCart.find((item) => item.id === producto.id);
      if (existe) {
        return prevCart.map((item) =>
          item.id === producto.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        );
      }
      return [...prevCart, { ...producto, cantidad: 1 }];
    });
  };

  const updateQuantity = (id, valor) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, cantidad: Math.max(1, item.cantidad + valor) }
          : item
      )
    );
  };

  const removeItem = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  // Estado derivado: Cálculos automáticos
  const totalPrecio = cart.reduce(
    (acc, item) => acc + item.precio * item.cantidad,
    0
  );
  const totalItems = cart.reduce((acc, item) => acc + item.cantidad, 0);

  return (
    <div
      className="cart-container"
      style={{ textAlign: "left", padding: "1rem" }}
    >
      <h2>Productos</h2>
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        {PRODUCTOS_DISPONIBLES.map((p) => (
          <button
            key={p.id}
            onClick={() => addToCart(p)}
            style={{ padding: "10px", cursor: "pointer" }}
          >
            Añadir {p.nombre} (${p.precio})
          </button>
        ))}
      </div>

      <hr />

      <h2>Carrito 🛒 ({totalItems} productos)</h2>
      {cart.length === 0 ? (
        <p>El carrito está vacío</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {cart.map((item) => (
            <li
              key={item.id}
              style={{
                marginBottom: "10px",
                borderBottom: "1px solid #eee",
                paddingBottom: "10px",
              }}
            >
              <strong>{item.nombre}</strong> - ${item.precio} c/u
              <br />
              Subtotal: <strong>${item.precio * item.cantidad}</strong>
              <div style={{ marginTop: "5px" }}>
                <button onClick={() => updateQuantity(item.id, 1)}> + </button>
                <span style={{ margin: "0 10px" }}>
                  Cantidad: {item.cantidad}
                </span>
                <button onClick={() => updateQuantity(item.id, -1)}> - </button>
                <button
                  onClick={() => removeItem(item.id)}
                  style={{ marginLeft: "20px", color: "red" }}
                >
                  Eliminar
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
      <h3>caunto tenes que pagar pues{totalPrecio}</h3>
    </div>
  );
}
