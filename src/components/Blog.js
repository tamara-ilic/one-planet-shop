import '../styles/blog.css'
import { useContext } from 'react'
import { ShopContext } from '../contexts/shopContext'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'

export default function Blog() {
    const { blogposts } = useContext(ShopContext)

    return (
        <main>
            {blogposts.map((b) => (
                <div key={b.sys.id} >
                <h4 className='blog-title'>{b.fields.blogTitle}</h4>
                <img className='blog-image__main' src={b.blogPicture} alt='placeholder'/>
                <div className='blog-text'>
                {documentToReactComponents(b.fields.blogText)}
            </div>
          </div>
        ))
        }
      </main>
    )
  }
  
