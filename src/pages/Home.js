import React from "react";
import styled from "styled-components";
import SaveTimeImg from "../assets/save-time_1451817.png";
import StatueImg from "../assets/statue-liberty_3394563.png"
import AutomationImg from "../assets/automation_8596316.png";
import FaqSection from "./components/faq";

const Container = styled.div`
  padding: 0;
  color: #222;
  font-family: Arial, sans-serif;
`;

const Hero = styled.section`
  padding: 2rem 1rem;
  text-align: center;
`;

const HeroTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

const HeroSubtitle = styled.p`
  font-size: 1.2rem;
  color: #555;
  max-width: 600px;
  margin: 0 auto 2rem auto;
`;

const CtaButton = styled.a`
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

const Features = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 2rem;
  padding: 2rem 2rem;
  text-align: center;
`;

const FeatureCard = styled.div`
  padding: 1rem;
`;

const FeatureTitle = styled.h3`
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
`;

const Steps = styled.section`
  padding: 2rem 2rem;
  text-align: center;
`;

const StepsTitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 2rem;
`;

const StepList = styled.ol`
  max-width: 600px;
  margin: 0 auto;
  text-align: left;
  padding: 0;
  list-style: none;
`;

const StepItem = styled.li`
  padding: 1rem 0;
  font-size: 1.3rem;
  border-bottom: 1px solid black;
`;

const About = styled.section`
  padding: 4rem 2rem;
  text-align: center;
`;

const AboutTitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 1rem;
`;

const AboutText = styled.p`
  max-width: 700px;
  margin: 0 auto;
  color: #555;
`;

const PricingSection = styled.section`
  padding: 4rem 2rem;
  text-align: center;
`;

const PricingTitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 1rem;
`;

const PricingText = styled.p`
  color: #555;
  margin-bottom: 2rem;
`;

const Footer = styled.footer`
  padding: 2rem;
  text-align: center;
  color: #fff;
  font-size: 0.875rem;
`;

const FeatureImg = styled.img`
    max-width: 6rem;     
    margin: 0;       
`
export default function HomePage() {
  return (
    <Container>
      <Hero>
        <HeroTitle>Find American Profiles Faster than ever - And watch your AI influencer getting $$$</HeroTitle>
        <HeroSubtitle>
          Our scraper identifies American Instagram profiles for you in minutes, so you can target high-value clients without the manual work.
        </HeroSubtitle>
        <CtaButton href="/dashboard">Start Scraping Now</CtaButton>
      </Hero>

      <Features>
        <FeatureCard>
        <FeatureImg src={SaveTimeImg} />
          <FeatureTitle>Save Time</FeatureTitle>
          <p>Stop manually combing through hundreds of comments. Get a filtered list in one click.</p>
        </FeatureCard>
        <FeatureCard>
          <FeatureImg src={StatueImg} />
          <FeatureTitle>Reach High-Value Clients</FeatureTitle>
          <p>Target valuable audiences like American clients faster — and scale your business easily.</p>
        </FeatureCard>
        <FeatureCard>
          <FeatureImg src={AutomationImg} />
          <FeatureTitle>100% Automated</FeatureTitle>
          <p>Enter a post URL. Our tool takes care of login, scraping, and history tracking for you.</p>
        </FeatureCard>
      </Features>

      <Steps>
        <StepsTitle>How It Works</StepsTitle>
        <StepList>
          <StepItem>1. Log in and enter a post URL.</StepItem>
          <StepItem>2. We scan all the posts, and search for usernames with an American name.</StepItem>
          <StepItem>3. Get a list with American profiles.</StepItem>
          <StepItem>4. Follow, messsage or comment them to grow your IG followers</StepItem>
        </StepList>
      </Steps>

      <About>
        <AboutTitle>Built for Agencies, Freelancers & Brands Who Want Results</AboutTitle>
        <AboutText>
          We simplify lead generation so you can focus on reaching your most valuable audience. Whether you’re a social media manager, small business owner, or influencer marketing team — we help you do more with less.
        </AboutText>
      </About>

      <FaqSection />

      <PricingSection>
        <PricingTitle>Flexible Pricing That Scales with You</PricingTitle>
        <PricingText>Get started for free. Upgrade anytime as you grow.</PricingText>
        <CtaButton href="/pricing">See Pricing</CtaButton>
      </PricingSection>

      <Footer>
        © {new Date().getFullYear()} OurApp | <a href="/about" style={{ color: "#aaa" }}>About</a> | <a href="/pricing" style={{ color: "#aaa" }}>Pricing</a> | <a href="/dashboard" style={{ color: "#aaa" }}>Dashboard</a>
      </Footer>
    </Container>
  );
}
