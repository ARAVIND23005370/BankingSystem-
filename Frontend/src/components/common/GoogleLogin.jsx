import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';

const handleGoogleSuccess = async (credentialResponse) => {
    const googleToken = credentialResponse.credential;
    // Send the token to your Spring Boot backend
    try {
        const res = await axios.post('http://localhost:8080/api/auth/google', {
            token: googleToken
        });
        // Save the JWT you receive from your backend (e.g., localStorage)
        localStorage.setItem('token', res.data.token);
        // Redirect user or update state
    } catch (error) {
        console.error("Authentication failed", error);
    }
};

return (
    <GoogleLogin
        onSuccess={handleGoogleSuccess}
        onError={() => console.log('Login Failed')}
    />
);
