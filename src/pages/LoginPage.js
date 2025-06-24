import React, { useState } from "react";
import styled from "styled-components";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import {auth} from "../firebase";

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


const ErrorText = styled.p`
  color: red;
  margin: 0.5rem 0;
`;

export default function LoginPage() {
  const navigate = useNavigate();


  // Using username state for username input, but you can change it to email if needed
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const handleSignIn = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("✅ Signed in:", userCredential.user); // success
      navigate("/dashboard"); // ✅
    } catch (err) {
      setError(err.message);          // show error on UI
      console.error("Sign-in failed:", err.code, err.message); // log full error
    }
  };


  return (
    <Container>
      <LoginBox>
        <Title>Sign In</Title>
        <form onSubmit={handleSignIn}>
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && <ErrorText>{error}</ErrorText>}

          <Button type="submit">Sign In</Button>
        </form>

        <LinkButton onClick={() => navigate("/forgot-password")}>
          Forgot password?
        </LinkButton>
        <LinkButton onClick={() => navigate("/signup")}>
          Don’t have an account? Sign up
        </LinkButton>
      </LoginBox>
    </Container>
  );
}
