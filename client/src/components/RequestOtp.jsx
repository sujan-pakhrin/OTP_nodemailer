import React, { useState } from 'react';
import axios from 'axios';

function RequestOtp() {
    const [email, setEmail] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:5000/api/users/request-otp', { email })
            .then(response => {
                alert(response.data);
            })
            .catch(error => {
                alert('Error sending OTP');
            });
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
            />
            <button type="submit">Send OTP</button>
        </form>
    );
}

export default RequestOtp;
