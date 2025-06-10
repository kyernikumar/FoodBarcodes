import React, { useState } from "react";
import "./BarcodeChecker.css";

const BarcodeChecker = () => {
  const [barcode, setBarcode] = useState("");
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchItemDetails = async () => {
    if (!barcode.trim()) return;

    setLoading(true);
    setError("");
    setItem(null);

    try {
      // Example: Replace with your real API
      const res = await fetch(
        `https://world.openfoodfacts.org/api/v0/product/${barcode}.json`
      );
      const data = await res.json();

      if (data.status === 1) {
        setItem(data.product);
      } else {
        setError("Item not found. Try a valid food barcode.");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div className='barcode-container'>
      <h1>Food Barcode Checker</h1>

      <div className='input-section'>
        <input
          type='text'
          placeholder='Enter Barcode'
          value={barcode}
          onChange={(e) => setBarcode(e.target.value)}
        />
        <button onClick={fetchItemDetails}>Check</button>
      </div>

      {loading && <p className='loading'>Loading...</p>}
      {error && <p className='error'>{error}</p>}

      {item && (
        <div className='item-details'>
          <h2>{item.product_name || "No Name Available"}</h2>
          {item.image_url && <img src={item.image_url} alt='Product' />}
          <p>
            <strong>Brand:</strong> {item.brands}
          </p>
          <p>
            <strong>Categories:</strong> {item.categories}
          </p>
          <p>
            <strong>Ingredients:</strong> {item.ingredients_text || "N/A"}
          </p>
        </div>
      )}
    </div>
  );
};

export default BarcodeChecker;
