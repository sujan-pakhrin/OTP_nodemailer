import React, { useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

function VerifyOtp() {
    const [otp, setOtp] = useState('');
    const location = useLocation();
    const navigate = useNavigate();
    const email = location.state?.email;
    console.log(email)

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:5000/api/users/verify-otp', { email, otp })
            .then(response => {
                console.log(response.data);
navigate('/login')
            })
            .catch(error => {
                alert('Invalid OTP');
            });
    };

    return (
        <form onSubmit={handleSubmit}>
            
            <input
                type="number"
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
