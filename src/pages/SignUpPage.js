import React, { useState } from "react";
import styled from "styled-components";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";     // <-- add this
import { auth, db } from "../firebase";               // <-- import Firestore DB



const Container = styled.div`
  min-height: 50vh;
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
    box-sizing: border-box;
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

  const [email, setEmail] = useState("");           // changed from username to email
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  
        const handleSignUp = async (e) => {
          e.preventDefault();
          setError(null);

          if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
          }

          if (email.trim() && password.trim()) {
            try {
              const userCredential = await createUserWithEmailAndPassword(auth, email, password);
              const uid = userCredential.user.uid;

              // ✅ Firestore profile
              await setDoc(doc(db, "users", uid), {
                coins: 2,
                email: email,
                createdAt: new Date(),
              });

              // ✅ Send verification email
              await sendEmailVerification(userCredential.user);

              // ✅ Inform the user
              alert(
                "Account created successfully! Please check your email and verify your account before logging in."
              );

              // Redirect them to a page telling them to verify
              navigate("/verify-email"); // optional new page
            } catch (err) {
              setError('something went wrong');
            }
          }
        };

  return (
    <Container>
      <SignUpBox>
        <Title>Sign Up</Title>
        <form onSubmit={handleSignUp}>
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