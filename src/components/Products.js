import { useContext } from 'react'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { ShopContext } from '../contexts/shopContext'
import LazyLoad from 'react-lazyload'
import CircleLoader from 'react-spinners/CircleLoader'

export default function Products() {
    const { products } = useContext(ShopContext)

    const listings = products.map(product => {
        const productImages = product.fields.productMedia.map(image => (
          <LazyLoad key={image.sys.id} placeholder={<CircleLoader color='#5DA69E' size='200px' />}>
            <img className='product-image' src={image.fields.file.url} alt={image.fields.title} loading='lazy' />
          </LazyLoad>
        ));
        const { title, price, description } = product.fields
    
        return {
          id: product.sys.id,
          title,
          price,
          description,
          productImages
        }
      })

    return (
        <main>
        {listings.map((listing) => (
          <div key={listing.id}>
            <h4 className='product-title'>{listing.title}</h4>
            <p>€ {listing.price}</p>
            {listing.productImages}
            <div className='product-description'>
              {documentToReactComponents(listing.description)}
            </div>
          </div>
        ))
        }
      </main>
    )
}