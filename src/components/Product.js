import '../styles/product.css'
import { useState, useContext, useEffect } from 'react'
import { ShopContext } from '../contexts/shopContext'
import { useParams } from 'react-router-dom'
import LazyLoad from 'react-lazyload'
import CircleLoader from 'react-spinners/CircleLoader'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'

import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

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

    /* Slider configuration START */
    const [nav1, setNav1] = useState(null)
    const [nav2, setNav2] = useState(null)
    const [slider1, setSlider1]  = useState(null)
    const [slider2, setSlider2]  = useState(null)

    useEffect(() => {
        setNav1(slider1)
        setNav2(slider2)
    })

    const settingsMain = {
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        fade: true,
        asNavFor: '.slider-nav'
      }
    
      const settingsThumbs = {
        slidesToShow: 3,
        slidesToScroll: 1,
        asNavFor: '.slider-for',
        dots: true,
        centerMode: true,
        swipeToSlide: true,
        focusOnSelect: true,
        centerPadding: '10px',
        nextArrow: (
            <div>
                <div className="next-slick-arrow"> ⫸ </div>
            </div>
                  ),
        prevArrow: (
            <div>
                <div className="prev-slick-arrow"> ⫷ </div>
            </div>
                  )
      }

       /* Slider configuration END */
    
    return (
        <main>
            {product ? <div key={product.id}>
                <Slider
                    {...settingsMain}
                    asNavFor={nav2}
                    ref={slider => setSlider1(slider)}
                >
                    {product.productImages}
                </Slider>
                <div className='thumbnail-slider-wrap'>
                    <Slider
                        {...settingsThumbs}
                        asNavFor={nav1}
                        ref={slider => setSlider2(slider)}
                    >
                        {product.productImages}
                    </Slider>
                </div>
                <h4 className='product-title'>{productTitle}</h4>
                <p className='product-price'>€ {product.price}</p>
                <div className='product-description'>
                    {documentToReactComponents(product.description)}
                </div>
                </div> : <CircleLoader color='#5DA69E' />}
        </main>
    )
}