import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { sendPasswordResetEmail } from "firebase/auth";
import styled from "styled-components";


// 🎨 Styled-components:
const Container = styled.div`
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
`;

const Box = styled.div`
  padding: 2rem;
  border-radius: 1rem;
  width: 100%;
  max-width: 400px;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  color: black;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  margin-bottom: 1rem;
  border: none;
  border-radius: 0.5rem;
  font-size: 1rem;

  &:focus {
    outline: 2px solid #b93bf6;;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 0.75rem;
background: #b93bf6;
  color: #fff;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  font-weight: bold;
  font-size: 1rem;

  &:hover {
      background:rgb(88, 20, 122);
           transition: background 0.3s ease; 
  }
`;

const LinkButton = styled.button`
  background: none;
  border: none;
  color:  #b93bf6;;
  cursor: pointer;
  margin-top: 1rem;

  &:hover {
    text-decoration: underline;
  }
`;

const ErrorText = styled.p`
  color: red;
  margin: 0.5rem 0;
`;

const SuccessText = styled.p`
  color: black;
  margin: 0.5rem 0;
`;


export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleReset = async (e) => {
    e.preventDefault();
    setError(null);
    setMessage(null);

    if (!email.trim()) {
      setError("Please enter your email address.");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      setMessage(
        "Password reset link sent! Check your inbox (and spam folder)."
      );
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Container>
      <Box>
        <Title>Forgot Password</Title>
        <form onSubmit={handleReset}>
          <Input
            type="email"
            placeholder="Your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          {error && <ErrorText>{error}</ErrorText>}
          {message && <SuccessText>{message}</SuccessText>}

          <Button type="submit">Send Reset Email</Button>
        </form>

        <LinkButton onClick={() => navigate("/login")}>Back to Login</LinkButton>
      </Box>
    </Container>
  );
}
