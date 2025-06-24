import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useAuth } from "./context/AuthContext"; // Adjust the import path as necessary

// 💅 Styled Components
const HeaderContainer = styled.header`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  /* padding: 1rem 2rem; */
  color: black;
  margin-bottom: 4rem;
`;

const Logo = styled(Link)`
  font-size: 2rem;
  font-weight: bold;
  margin: 0;
   text-decoration: none;
   color: black;

   &:hover {
    color: rgb(140, 43, 149); 
   }
`;

const NavLinks = styled.nav`
  display: flex;
  align-items: center;
  gap: 2rem;
`;

const NavLink = styled(Link)`
  color: black;
  text-decoration: none;
  font-size: 1rem;
  &:hover {
    /* text-decoration: underline; */
  }
`;

const DashboardButton = styled(Link)`
 background: #b93bf6;
  color: #fff;
  padding: 0.75rem 2rem;
  border-radius: 0.5rem;
  text-decoration: none;
  font-size: 1.1rem;
  &:hover {
    background:rgb(88, 20, 122);
    transition: background 0.3s ease;   
  }
`;

const Coins = styled.p`
  font-size: 1.2rem;
`;


const Header = () => {
  const { isLoggedIn, userData } = useAuth(); // directly use it
  
  
  return (
    <HeaderContainer>
      <Logo to="/">FollowFever🔥</Logo>
      <NavLinks>
        <NavLink to="pricing">Pricing</NavLink>
        <NavLink to="about">About</NavLink>
        {isLoggedIn ? <DashboardButton to="dashboard">Dashboard</DashboardButton> :
          <DashboardButton to="login">Login</DashboardButton>
        }
        {isLoggedIn && <NavLink to="pricing" style={{color: userData.coins < 5 ? 'red' : 'none'}}>{userData.coins} 🪙</NavLink>}
        
        
      </NavLinks>
    </HeaderContainer>
  );
};

export default Header;
