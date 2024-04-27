import { useEffect, useState } from "react"
import { getAllProducts } from "./services/firebase.services"
import Products from "./components/products/Products"



function App() {
  const [products, setProducts] = useState(null)
  useEffect(() => {
    (async () => {
      const productsResponse = await getAllProducts()
      setProducts(productsResponse)
    })()
  }, [])


  if (!products) return <p>no product</p>

  return (
    <>
      <h1>Product Listing</h1>
      {
        products.map((product, idx) => {
          return <Products {...product} />
        })
      }
    </>
  )
}

export default App