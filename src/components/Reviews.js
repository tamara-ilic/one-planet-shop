import { useContext, useState } from 'react'
import { ShopContext } from '../contexts/shopContext'

export default function Reviews() {
    const { reviews } = useContext(ShopContext)
    const [reviewHeadline, setReviewHeadline] = useState('')
    const [newReview, setNewReview] = useState('')

    const handleReviewSubmit = (e) => {
        e.preventDefault()
    }

    const handleReviewHeadline = (e) => {
        if (e.keyCode === 13) {
            console.log(e.keyCode)
            setReviewHeadline(e.target.value)
        } else return
    }

    const handleNewReview = (e) => {
        if (e.keyCode === 13) {
            console.log(e.keyCode)
            setNewReview(e.target.value)
        } else return
    }
 
    return (
        <main>
            {/* Below is a hack. New reviews should be added to a database along with existing ones. */}
            {reviewHeadline && newReview &&
                <div className='new-reviews'>
                    <h4>{reviewHeadline}</h4>
                    <p>{newReview}</p>
                </div>
            }
            {reviews.map((r) => (
                <div key={reviews.id}>
                    <h4>{r.fields.headline}</h4>
                    <p>{r.fields.review}</p>
                    {/* {r.fields.rating} */}
                </div>
            ))}
            <h4>Leave a review</h4>
            <form onSubmit={handleReviewSubmit}>
                <input onKeyUp={handleReviewHeadline} className='review-headline' placeholder='Headline'></input>
                <textarea onKeyUp={handleNewReview} placeholder="Tried one of our products? We'd love to hear from you!"></textarea>
                <input type='submit'></input>
            </form>
      </main>
    )
}