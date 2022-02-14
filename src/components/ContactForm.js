import '../styles/contactForm.css'

import { useState } from 'react'

export default function ContactForm() {
    const [status, setStatus] = useState('Send')

    const handleSubmit = async (e) => {
        e.preventDefault()
        setStatus('Sending...')
        const { name, email, subject, message } = e.target.elements
        let details = {
            name: name.value,
            email: email.value,
            subject: subject.value,
            message: message.value
        }
        let response = await fetch('http://localhost:4000/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(details)
        })
        setStatus('Send')
        let result = await response.json()
        alert(result.status)
    }

    return (
        <main>
            <h4>Have feedback or a suggestion? We'd love to hear from you! </h4>
            <form onSubmit={handleSubmit}>

                <div className='form-field'>
                    <label htmlFor='name'>Name</label>
                    <input type='text' id='name' placeholder="What's your name?" required></input>
                </div>

                <div className='form-field'>
                    <label htmlFor='email'>Email</label>
                    <input type='email' id='email' placeholder='How can we reach you?' required></input>
                </div>

                <div className='form-field'>
                    <label htmlFor='subject'>Subject</label>
                    <input type='text' id='subject' placeholder='What would you like to tell us?' required></input>
                </div>

                <div className='form-field'>
                    <label htmlFor='message'>Message</label>
                    <textarea id='message' required></textarea>
                </div>

                <button type='submit'>{status}</button>
            </form>
        </main>
    )
}