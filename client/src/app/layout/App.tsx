import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import Catalog from "../../features/catalog/Catalog";
import { Product } from "../models/product";

function App() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch('https://localhost:5001/api/products').then(response => response.json()).then(data => setProducts(data))
  }, [])

  function addProduct() {
    setProducts(previousState => [...previousState, 
      {
        name: 'product' + (previousState.length + 1), 
      price: 100.00 + (previousState.length),
        id: previousState.length +1,
        brand: 'some brand',
        description: 'some desc',
        pictureUrl: 'https://picsum.photos/2001',
    }
    ]);
  }

  return (
    <>
      <Typography variant="h1">Re-Store</Typography>
      <Catalog products={products} addProduct={addProduct}/>
      
    </>
  );
}

export default App;
