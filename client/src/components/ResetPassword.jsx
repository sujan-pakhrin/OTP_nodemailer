import React, { useState } from 'react';
import axios from 'axios';

function ResetPassword() {
    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:5000/api/users/reset-password', { email, newPassword })
            .then(response => {
                alert(response.data);
            })
            .catch(error => {
                alert('Error resetting password');
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
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
                required
            />
            <button type="submit">Reset Password</button>
        </form>
    );
}

export default ResetPassword;
