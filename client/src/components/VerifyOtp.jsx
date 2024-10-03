import React, { useState } from 'react';
import axios from 'axios';

function VerifyOtp() {
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:5000/api/users/verify-otp', { email, otp })
            .then(response => {
                alert(response.data);
            })
            .catch(error => {
                alert('Invalid OTP');
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
            <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter OTP"
                required
            />
            <button type="submit">Verify OTP</button>
        </form>
    );
}

export default VerifyOtp;
