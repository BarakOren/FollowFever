import React from "react";
import styled from "styled-components";

const Container = styled.div`
  max-width: 800px;
  min-height: 50vh;
  margin: 4rem auto;
  padding: 1rem;
  font-family: Arial, sans-serif;
  color: #333;
`;

const Title = styled.h1`
  font-size: 2.2rem;
  margin-bottom: 1.5rem;
  text-align: center;
`;

const Paragraph = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 1rem;
`;

const Contact = styled.a`
  color: #ff2c7c;
  font-weight: bold;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

export default function About() {
  return (
    <Container>
      <Title>About FollowFever 🔥</Title>
      <Paragraph>
        FollowFever is a simple yet powerful platform built to help you quickly
        discover American Instagram profiles - A perfect fit for AI influencers. Whether you’re looking for new
        clients, followers, or connections, we make the process fast and
        efficient.
      </Paragraph>
      <Paragraph>
        Our mission is to help creators, influencers, and entrepreneurs save
        time and focus on what matters most — engaging with their ideal
        audience.
      </Paragraph>
      <Paragraph>
        Got questions or feedback? Reach out to us anytime at{" "}
        <Contact href="mailto:support@followfever.com">
          support@followfever.com
        </Contact>
        .
      </Paragraph>
    </Container>
  );
}
