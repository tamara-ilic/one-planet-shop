import '../styles/products.css'
import { useState, useEffect, useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { ShopContext } from '../contexts/shopContext'

export default function Products() {
  const { getProducts, products, setProducts } = useContext(ShopContext)

    useEffect(() => {
      getProducts()
        .then((res) => setProducts(res.items))
    }, [])

    console.log(products)
  
    useEffect(() => {
      products.length && console.log(products[0].fields.productMedia)
    }, [products])

    return (
      <main>
        <h1>Products</h1>
        <div className='product-grid'>
          {products.map((product) => (
            <NavLink to={ `${product.fields.title}` }>
              <div className='product-listing'>
                <img className='product-image__main' src={product.fields.productMedia[0].fields.file.url} alt=''></img>
                <p className='product-title'>{product.fields.title}</p>
                <p className='product-price'>€ {product.fields.price}</p>
              </div>
            </NavLink>
          ))}
        </div>
      </main>
    )
}