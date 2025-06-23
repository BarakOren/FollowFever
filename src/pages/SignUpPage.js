import React, { useState } from "react";
import styled from "styled-components";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
  import { auth } from './firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: flex-start;
`;

const SignUpBox = styled.div`
  width: 100%;
  max-width: 400px;
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 1rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
  font-size: 1rem;
`;

const Button = styled.button`
  width: 100%;
  padding: 0.75rem;
  background: #b93bf6;
  color: white;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  font-size: 1rem;
  margin-top: 0.5rem;

  &:hover {
      background:rgb(88, 20, 122);
           transition: color 0.3s ease; 
  }
`;

const LinkButton = styled.button`
  width: 100%;
  padding: 0.5rem;
  background: none;
  border: none;
  color: #b93bf6;
  font-size: 0.9rem;
  cursor: pointer;
  text-decoration: underline;
  margin-top: 0.25rem;

  &:hover {
      color:rgb(88, 20, 122);
    transition: color 0.3s ease; 
  }
`;

export default function SignUpPage() {
  const { setIsLoggedIn } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);


  const handleSignUp = (e) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (username.trim() && password.trim()) {
      setIsLoggedIn(true); // Fake login
      navigate("/dashboard");
    }
  };




  return (
    <Container>
      <SignUpBox>
        <Title>Sign Up</Title>
        <form onSubmit={handleSignUp}>
          <Input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          {error && <p style={{ color: "red" }}>{error}</p>}

          <Button type="submit">Sign Up</Button>
        </form>

        <LinkButton onClick={() => navigate("/login")}>Already have an account? Sign In</LinkButton>
      </SignUpBox>
    </Container>
  );
}
