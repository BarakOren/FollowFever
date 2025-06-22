import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";


// Styled Components
const Container = styled.div`
  max-width: 400px;
  margin: 4rem auto;
  padding: 2rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const Title = styled.h1`
  margin-bottom: 1.5rem;
`;

const Summary = styled.div`
  padding: 1rem 0;
  border-top: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
  margin-bottom: 1.5rem;
`;

const SummaryItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 0;

  span {
    color: #555;
  }

  strong {
    font-size: 1.1rem;
  }
`;

const Button = styled.button`
  background: #0070f3;
  color: white;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  width: 100%;
  font-size: 1rem;
  &:hover {
    background: #0059c1;
  }
`;

const BackLink = styled.a`
  display: inline-block;
  margin-top: 1rem;
  color: #0070f3;
  cursor: pointer;
  text-decoration: underline;
`;


const PaymentPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Parse coins and price from query params
  const searchParams = new URLSearchParams(location.search);
  const coins = searchParams.get("coins") || "50";
  const price = coins === "100" ? "11.00" : coins === "50" ? "7.00" : "0.00";

  const handleProceed = () => {
    // Here you'll call your backend to create a PayPal payment session
    alert(`Redirecting to PayPal for ${coins} coins ($${price})`);
    // window.location.href = payPalUrl; <- after you implement the backend
  };

  return (
    <Container>
      <Title>Checkout</Title>
      <Summary>
        <SummaryItem>
          <span>Coins:</span> <strong>{coins}</strong>
        </SummaryItem>
        <SummaryItem>
          <span>Price:</span> <strong>${price}</strong>
        </SummaryItem>
      </Summary>
      <Button onClick={handleProceed}>Proceed to PayPal</Button>
      <BackLink onClick={() => navigate("/pricing")}>← Back to Pricing</BackLink>
    </Container>
  );
};

export default PaymentPage;
