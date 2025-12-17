import { useState, useEffect } from "react";

const fallbackProducts = [
  { id: 1, name: "Mobile", price: 15000, image: "https://via.placeholder.com/200" },
  { id: 2, name: "Laptop", price: 45000, image: "https://via.placeholder.com/200" },
  { id: 3, name: "Headphones", price: 2000, image: "https://via.placeholder.com/200" },
  { id: 4, name: "Smart Watch", price: 5000, image: "https://via.placeholder.com/200" },
  { id: 5, name: "Tablet", price: 25000, image: "https://via.placeholder.com/200" }
];

export default function Products({ addToCart }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      const token = localStorage.getItem("token");

      try {
        const res = await fetch("http://localhost:5000/api/products", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          }
        });

        const data = await res.json();

        if (res.ok && data.products) {
          setProducts(data.products);
        } else {
          console.warn("Backend fetch failed, using fallback products");
          setProducts(fallbackProducts);
        }
      } catch (error) {
        console.error("Fetch error, using fallback products:", error);
        setProducts(fallbackProducts);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <p style={{ padding: 20 }}>Loading products...</p>;

  return (
    <div style={{ padding: 20 }}>
      <h1>My Products</h1>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {products.map((p) => (
          <div
            key={p.id || p._id}
            style={{
              border: "1px solid gray",
              margin: "10px",
              padding: "10px",
              width: "220px",
              textAlign: "center"
            }}
          >
            <img
              src={p.image || "https://via.placeholder.com/200"}
              alt={p.name}
              style={{ width: "100%" }}
            />
            <p><b>{p.name}</b></p>
            <p>₹ {p.price}</p>
            <button onClick={() => addToCart(p)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
}