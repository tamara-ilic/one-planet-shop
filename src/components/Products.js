import '../styles/products.css'
import { useEffect, useContext } from 'react'
import { ShopContext } from '../contexts/shopContext'
import { NavLink } from 'react-router-dom'

export default function Products() {
  const { getProducts, setProducts, products } = useContext(ShopContext)

  useEffect(() => {
    getProducts()
      .then((res) => setProducts(res.items))
  }, [])
  
  useEffect(() => {
    products.length && console.log(products[0].fields.productMedia)
  }, [products])

  return (
    <main>
      <h1>Products</h1>
      <div className='product-grid'>
        {products.map((product) => (
          <NavLink to={ `${product.fields.title}` } key={product.sys.id}>
            <div className='product-listing'>
              <img className='product-image__main' src={product.fields.productMedia[0].fields.file.url} alt={product.fields.title}></img>
              <p className='product-title'>{product.fields.title}</p>
              <p className='product-price'>€ {product.fields.price}</p>
            </div>
          </NavLink>
        ))}
      </div>
    </main>
  )
}