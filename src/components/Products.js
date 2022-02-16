import '../styles/products.css'
import { useContext } from 'react'
import { ShopContext } from '../contexts/shopContext'
import Test from './Test'
import { NavLink } from 'react-router-dom'
import Product from './Product'

export default function Products() {
    const { products } = useContext(ShopContext)

    return (
      <main>
        <h1>Products</h1>
        <div className='product-grid'>
          {products.map((product) => (
            <NavLink to={ `/${product.fields.title}` }>
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