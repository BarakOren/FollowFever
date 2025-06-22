import React, { useState } from "react";
import styled from "styled-components";

const Section = styled.section`
  padding: 2rem 1rem;
  max-width: 800px;
  margin: 0 auto;
`;

const Title = styled.h2`
  font-size: 2rem;
  text-align: center;
  margin-bottom: 1rem;
`;

const QuestionItem = styled.div`
  border-bottom: 1px solid #ddd;
  padding: 0rem 0;
`;

const QuestionButton = styled.button`
  background: none;
  border: none;
  width: 100%;
  padding: 1rem 0;
  text-align: left;
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &:hover {
    color:rgb(140, 43, 149);
    transition: color 0.2s ease;
  }
`;

const Answer = styled.div`
  padding: 0.5rem 0;
  font-size: 0.95rem;
  color: #555;
  max-height: ${({ isOpen }) => (isOpen ? "200px" : "0")};
  opacity: ${({ isOpen }) => (isOpen ? "1" : "0")};
  overflow: hidden;
  transition: all 0.3s ease;
`;

const Icon = styled.span`
  transition: transform 0.3s;
  transform: rotate(${({ isOpen }) => (isOpen ? "90deg" : "0deg")});
`;

export default function FaqSection() {
  const faqs = [
      {
      question: "How this idea was born?",
      answer:
        "After trying myself to find American profiles so I can get them as clients, I spent too much time scrolling and looking for the american usernames in a post, So I created this tool that saves us a lot of time.",
    },
    {
      question: "What does this service do?",
      answer:
        "The platform lets you quickly get American Instagram profiles who commented on a post of your choosing, so you can get American clients faster & get $$$.",
    },
     {
      question: "Who is this for?",
      answer:
        "If you run Onlyfans business, Fanvue, or have an AI influencer.",
    },
    {
      question: "What do I do after I get the profile links?",
      answer:
        "follow, comment or DM each profile to get their attention.",
    },
    {
      question: "Do I need an Instagram account?",
      answer:
        "Yes, you’ll need a valid Instagram account to use this service so we can access public posts and comments.",
    },
    {
      question: "Can I scrape as often as I want?",
      answer:
        "To prevent rate-limits and blocks, we recommend spacing your searches and not exceeding the recommended usage per day.",
    },
  ];

  const [openIndex, setOpenIndex] = useState(null);

  return (
    <Section>
      <Title>Frequently Asked Questions</Title>
      {faqs.map((faq, i) => (
        <QuestionItem key={i}>
          <QuestionButton onClick={() => setOpenIndex(openIndex === i ? null : i)}>
            {faq.question}
            <Icon isOpen={openIndex === i}>▶</Icon>
          </QuestionButton>
          <Answer isOpen={openIndex === i}>{faq.answer}</Answer>
        </QuestionItem>
      ))}
    </Section>
  );
}
