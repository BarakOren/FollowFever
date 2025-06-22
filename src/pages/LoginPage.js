import React, { useState } from "react";
import styled from "styled-components";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoginBox = styled.div`
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
           transition: background 0.3s ease;   
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
  margin-top: 0.25rem;

  &:hover {
      color:rgb(88, 20, 122);
           transition: color 0.3s ease;   
  }
`;

export default function LoginPage() {
  const { setIsLoggedIn } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = (e) => {
    e.preventDefault();
    if (username.trim() && password.trim()) {
      setIsLoggedIn(true);
      navigate("/dashboard");
    }
  };

  return (
    <Container>
      <LoginBox>
        <Title>Sign In</Title>
        <form onSubmit={handleSignIn}>
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
          <Button type="submit" >Sign In</Button>
        </form>

        <LinkButton onClick={() => navigate("/forgot-password")}>Forgot Password?</LinkButton>
        <LinkButton onClick={() => navigate("/signup")} style={{marginBottom: "10rem", fontSize: "1.5rem"}}>Sign Up</LinkButton>
      </LoginBox>
    </Container>
  );
}
