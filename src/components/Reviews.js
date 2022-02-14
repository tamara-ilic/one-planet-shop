import { useContext } from 'react'
import { ShopContext } from '../contexts/shopContext'

export default function Reviews() {
    const { reviews } = useContext(ShopContext)

    return (
        <main>
            {reviews.map((r) => (
                <div key={reviews.id}>
                <h4 className='product-title'>{r.fields.headline}</h4>
                <p className='product-description'>{r.fields.review}</p>
            </div>
        ))}
      </main>
    )
}