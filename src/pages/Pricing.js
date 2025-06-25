import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";


const PageWrapper = styled.div`
  padding-bottom: 3rem;
  max-width: 1400px;
  margin: 0 auto;
  color: #222;
`;

const Header = styled.h1`
  text-align: center;
  font-size: 4rem;
  margin-bottom: 2rem;
  color: #b93bf6;
`;

const PlansGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1.3fr));
  gap: 3rem;
`;

const PlanCard = styled.div`
  /* padding: 1.5rem; */
  border-radius: 1rem;
  text-align: center;
  transition: all 0.2s ease;

  h3 {
    font-size: 2rem;
    margin-bottom: 1rem;
  }
`;

const Price = styled.div`
  font-size: 2rem;
  color: #b93bf6;
  font-weight: bold;
  margin: 0.5rem 0 3rem 0;
`;

const Coins = styled.div`
  font-size: 1.2rem;
  color: #555;
`;

const Features = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 1rem 0;
  li {
    margin: 0.3rem 0;
  }
`;

const Button = styled.button`
  background: #b93bf6;
  color: white;
  padding: 0.7rem 1.6rem;
  border: none;
  border-radius: 1.5rem;
  font-size: 1.2rem;
  text-decoration: none;
  cursor: pointer;
  font-weight: bold;
  margin-top: 2rem;
  &:hover {
       background:rgb(88, 20, 122);
           transition: background 0.3s ease;   
  }
  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`;


const PricingPage = () => {
  const navigate = useNavigate();
const { isLoggedIn,setPurchaseAmount} = useAuth();

   const handleBuy = (scrapeAmount) => {
    if (isLoggedIn) {
      // send to checkout page with the amount as a param or state
      setPurchaseAmount({amount: scrapeAmount == 50 ? 7 : 11, coins: scrapeAmount})
      navigate("/checkout");
    } else {
      // send them to login page
      navigate("/login");
    }
  };
  
  
  return (
    <PageWrapper>
      <Header>Pricing</Header>
      <PlansGrid>
        <PlanCard>
          <h3>Free Plan</h3>
          <br/>
          <Price>$0</Price>
          <Coins>2 Coins per signup</Coins>
          <Features>
            <li>2 free uses</li>
            <li>Upgrade anytime</li>
          </Features>
          
          {isLoggedIn ? <Button disabled>Free</Button> : <Button onClick={() => navigate("/signup")}>Sign up</Button>}
        </PlanCard>

        <PlanCard>
          <h3>50 Coins Pack</h3>
          <Price>$7</Price>
          <Coins>50 Coins</Coins>
          <Features>
            <li>50 uses</li>
            <li>Valid forever</li>
          </Features>
          <Button onClick={() => handleBuy(50)}>Buy Now</Button>
        </PlanCard>

        <PlanCard>
          <h3>100 Coins Pack</h3>
          <Price>$11</Price>
          <Coins>100 Coins</Coins>
          <Features>
            <li>100 uses</li>
            <li>Valid forever</li>
          </Features>
          <Button onClick={() => handleBuy(100)}>Buy Now</Button>
        </PlanCard>
      </PlansGrid>
    </PageWrapper>
  );
};

export default PricingPage;
