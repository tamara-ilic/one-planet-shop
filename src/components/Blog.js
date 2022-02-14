import { useContext } from 'react'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { ShopContext } from '../contexts/shopContext'

export default function Blog() {
    const { blogposts } = useContext(ShopContext)

    return (
        <main>
            {blogposts.map((b) => (
                <div key={b.sys.id} >
                <h4 className='product-title'>{b.fields.blogTitle}</h4>
                <img className='product-image' src={b.blogPicture} alt='placeholder'/>
                <div className='product-description'>
                {documentToReactComponents(b.fields.blogText)}
            </div>
          </div>
        ))
        }
      </main>
    )
  }
  
