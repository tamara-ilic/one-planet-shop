import { useContext } from 'react'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { ShopContext } from '../contexts/shopContext'

export default function Reviews() {
    const { reviews } = useContext(ShopContext)

    return (

    )
}