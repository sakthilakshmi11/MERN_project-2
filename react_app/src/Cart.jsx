Cart.jsx
 
export default function Cart({ cart }) {
  let total = 0;
  cart.forEach(item => {
    total += item.price;
  });

  return (
    <div style={{ padding: "20px" }}>
      <h1>Cart Page</h1>

      {cart.length === 0 && <p>No items in cart</p>}

      {cart.map((item, index) => (
        <div key={index} style={{ marginBottom: "10px" }}>
          {/* IMAGE UI */}
          <img
            src="https://via.placeholder.com/100"
            alt={item.name}
          />
          <p>{item.name} - ₹{item.price}</p>
        </div>
      ))}

      {cart.length > 0 && <h3>Total: ₹{total}</h3>}
    </div>
  );
}