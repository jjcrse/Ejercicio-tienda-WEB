import { useState } from "react";

const PRODUCTOS_DISPONIBLES = [
  { id: 1, nombre: "Camisa Undergold", precio: 150 },
  { id: 2, nombre: "Short Sicknation", precio: 200 },
  { id: 3, nombre: "Pantalon Mattelsa", precio: 90 },
  { id: 4, nombre: "Gorra el Barbas", precio: 40 },
  { id: 5, nombre: "Outfit Weedgreen", precio: 900 },
];

export default function ShoppingCart() {
  const [cart, setCart] = useState([]);

  // 1. AGREGAR PRODUCTO
  function addToCart(producto) {
    const existe = cart.find((item) => item.id === producto.id);

    if (existe) {
      const nuevoCarrito = cart.map((item) =>
        item.id === producto.id
          ? { ...item, cantidad: item.cantidad + 1 }
          : item
      );
      setCart(nuevoCarrito);
    } else {
      setCart([...cart, { ...producto, cantidad: 1 }]);
    }
  }

  // 2. ELIMINAR PRODUCTO
  function removeItem(id) {
    const nuevoCarrito = cart.filter((item) => item.id !== id);
    setCart(nuevoCarrito);
  }

  // 3. CALCULAR TOTALES
  let precioFinal = 0;
  let totalArticulos = 0;

  cart.forEach((item) => {
    precioFinal = precioFinal + item.precio * item.cantidad;
    totalArticulos = totalArticulos + item.cantidad;
  });

  return (
    <div>
      <h2>Productos Disponibles</h2>
      {PRODUCTOS_DISPONIBLES.map((p) => (
        <button key={p.id} onClick={() => addToCart(p)}>
          Comprar {p.nombre} (${p.precio})
        </button>
      ))}

      <hr />

      <h2>Mi Carrito ({totalArticulos} items)</h2>

      {cart.length === 0 ? (
        <p>Tu carrito está vacío</p>
      ) : (
        <ul>
          {cart.map((item) => (
            <li key={item.id}>
              {item.nombre} - Cantidad: {item.cantidad}
              <button onClick={() => removeItem(item.id)}>X</button>
            </li>
          ))}
        </ul>
      )}

      <h3>Total a pagar: ${precioFinal}</h3>
    </div>
  );
}
