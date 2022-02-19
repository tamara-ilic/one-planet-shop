import '../styles/blog.css'
import { useContext } from 'react'
import { ShopContext } from '../contexts/shopContext'
import LazyLoad from 'react-lazyload'
import CircleLoader from 'react-spinners/CircleLoader'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { BLOCKS, INLINES } from "@contentful/rich-text-types";

export default function Blog() {
    const { blogposts } = useContext(ShopContext)

    const renderOptions = {
      renderNode: {
        [INLINES.EMBEDDED_ENTRY]: (node, children) => {
          // target the contentType of the EMBEDDED_ENTRY to display as you need
          if (node.data.target.sys.contentType.sys.id === "blogPost") {
            return (
              <a href={`/blog/${node.data.target.fields.slug}`}>
                {node.data.target.fields.title}
              </a>
            )
          }
        },
        [BLOCKS.EMBEDDED_ASSET]: (node, children) => {
          // render the EMBEDDED_ASSET as you need
          return (
            <LazyLoad>
              <img
                src={`https://${node.data.target.fields.file.url}`}
                height={node.data.target.fields.file.details.image.height}
                width={node.data.target.fields.file.details.image.width}
                alt={node.data.target.fields.description}
              />
            </LazyLoad>
          )
        },
      },
    }

    return (
        <main>
            {blogposts.map((b) => (
              <div key={b.sys.id} >
                <h4 className='blog-title'>{b.fields.blogTitle}</h4>
                <img className='blog-image__main' src={b.blogPicture} alt='placeholder'/>
                <div className='blog-text'>
                  {documentToReactComponents(b.fields.blogText, renderOptions)}
                </div>
              </div>
            ))}
        </main>
    )
  }
  
