import React from "react";
import styled from "styled-components";


const FooterCon = styled.footer`
  text-align: center;
  color: black;
  font-size: 0.875rem;
  margin-top: 2rem;
`;

const Footer = () => {
    return <FooterCon>
        © {new Date().getFullYear()} FollowFever🔥 | <a href="/about" style={{ color: "black" }}>About</a> | <a href="/pricing" style={{ color: "black" }}>Pricing</a>
      </FooterCon>
}

export default Footer;