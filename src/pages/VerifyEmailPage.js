import { useState } from "react";
import { useAuth } from "../context/AuthContext"; // optional, if you want access to currentUser
import { auth } from "../firebase";
import { sendEmailVerification } from "firebase/auth";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Button = styled.button`
  padding: 0.75rem 2rem;
  background: #b93bf6;
  color: white;
  border: none;
  border-radius: 1rem;
  cursor: pointer;
  font-size: 1.3rem;
  margin-bottom: 3rem;

  &:hover {
      background:rgb(88, 20, 122);
        transition: background 0.3s ease; 
  }
`;

const BackToLoginButton = styled.button`
  width: 15rem;
  padding: 0.75rem;
  background: #b93bf6;
  color: white;
  border: none;
  border-radius: 1rem;
  cursor: pointer;
  font-size: 0.75rem;

  &:hover {
      background:rgb(88, 20, 122);
           transition: background 0.3s ease; 
  }
`;


export default function VerifyEmailPage() {
  const navigate = useNavigate();
  const { currentUser } = useAuth(); // optional if you have a global auth context
  const [message, setMessage] = useState(
    "A verification email was sent to your address. Please check your inbox."
  );
  const [error, setError] = useState(null);

  const handleResend = async () => {
    setError(null);
    try {
      if (auth.currentUser) {
        await sendEmailVerification(auth.currentUser);
        setMessage("Verification email resent! Please check your inbox.");
      } else {
        setError("No user is currently logged in.");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoToLogin = () => navigate("/login");

  return (
    <Container>
      <h1 className="text-2xl font-bold mb-4">Verify Your Email</h1>
      <p className="text-center mb-4">{message}</p>
      {error && <p className="text-center text-red-500 mb-4">{error}</p>}
      <Button
        onClick={handleResend}
      >
        Resend verification email
      </Button>
      <BackToLoginButton
        onClick={handleGoToLogin}
      >
        Back to Login
      </BackToLoginButton>
    </Container>
  );
}
