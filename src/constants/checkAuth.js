import { useNavigate } from 'react-router-dom';

const useAuthContext = () => {
  const navigate = useNavigate();

  const checkAuth = () => {
    const token = localStorage.getItem('token');

    if (!token) {
      return { auth: false, role: '' };
    }


    try {
      // Decode the token using a secure method like atob (avoiding deprecated atob)
      const base64Payload = token.split('.')[1];
      const payload = JSON.parse(atob(base64Payload));

      // Validate token expiration (optional, you can implement server-side validation)
      const expiration = new Date(payload.exp * 1000);
      if (expiration.getTime() < Date.now()) {
        console.log('Token expired. Redirecting to sign in page.');
        navigate('/signin');
        return { auth: false, role: '' };
      }

      return { auth: true, role: payload.role };
    } catch (error) {
      console.error('Error decoding token:', error);
      // Handle potential token corruption or invalid format (e.g., redirect to sign in)
      navigate('/signin');
      return { auth: false, role: '' };
    }
  };

  return checkAuth;
};

export default useAuthContext;
