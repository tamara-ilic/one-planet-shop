import { useContext, useState } from 'react'
import { ShopContext } from '../contexts/shopContext'

export default function Reviews() {
    const { reviews } = useContext(ShopContext)
    const [status, setStatus] = useState('Submit')

    const handleSubmit = async (e) => {
        e.preventDefault()
        setStatus('Sending...')
        const { headline, name, body } = e.target.elements
        let details = {
            headline: headline.value,
            name: name.value,
            body: body.value
        }
        let response = await fetch('http://localhost:5000/reviews', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(details),
        })
        setStatus('Submit')
        let result = await response.json()
        alert(result.status)
      }
 
    return (
        <main>
            {reviews.map((r) => (
                <div key={reviews.id}>
                    <h4>{r.fields.headline}</h4>
                    <p>{r.fields.review}</p>
                    {/* {r.fields.rating} */}
                </div>
            ))}
            <h4>Leave a review</h4>
            <form onSubmit={handleSubmit}>
                <input id='headline' type='text' className='review-headline' placeholder='Headline'></input>
                <input id='name' type='text'></input>
                <textarea id='body' placeholder="Tried one of our products? We'd love to hear from you!"></textarea>
                <button type='submit'>{status}</button>
            </form>
      </main>
    )
}