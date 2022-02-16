import { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../contexts/shopContext'
import { useParams } from 'react-router-dom'
import LazyLoad from 'react-lazyload'
import CircleLoader from 'react-spinners/CircleLoader'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'

export default function Product() {
    const [product, setProduct] = useState(null)
    const { getProduct, products } = useContext(ShopContext)
    let { productTitle } = useParams()


     const makeDataNice = (product) => {
        const productImages = product.fields.productMedia.map(image => (
            <LazyLoad key={image.sys.id} placeholder={<CircleLoader color='#5DA69E' size='200px' />}>
              <img className='product-image' src={image.fields.file.url} alt={image.fields.title} loading='lazy' />
            </LazyLoad>
          ))
  
          const { title, price, description } = product.fields
  
          const _product = {
              id: product.sys.id,
              title,
              price,
              description,
              productImages
            }
            console.log(_product)
          return _product

     }

    useEffect(() => {
        const matchingProduct = products.find((p) => p.title === productTitle)
        if (matchingProduct) {
            setProduct(makeDataNice(matchingProduct))
        } else {
            getProduct(productTitle)
        .then(res => { 
            setProduct(makeDataNice(res.items[0]))
        }        
        )
        }
    }, [])

    console.log(productTitle)
    
    return (
        <main>
            {product ? <div key={product.id}>
                    <h4 className='product-title'>{productTitle}</h4>
                    <p>€ {product.price}</p>
                    {product.productImages}
                    <div className='product-description'>
                        {documentToReactComponents(product.description)}
                    </div>
                </div> : <CircleLoader />}
        </main>
    )
}