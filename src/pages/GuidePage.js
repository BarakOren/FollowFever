import React, { useState } from "react";
import styled from "styled-components";

const Page = styled.div`
  max-width: 600px;
  margin: 2rem auto;
  padding: 1rem;
`;

const Question = styled.div`
  font-weight: bold;
  cursor: pointer;
  padding: 0.75rem 0;
  border-bottom: 1px solid #ccc;
`;

const Answer = styled.div`
  padding: 0.5rem 0;
  color: #333;
  font-size: 0.95rem;
`;

const faqItems = [
  {
    question: "How does FollowFever work?",
    answer: "the goal is to get new american clients fast, you can DM them or follow & unfollow them. to do so you enter a post URL into FollowFever, and you will get back links of AMERICAN IG profiles.",
  },
  {
    question: "Does FollowFever saves my IG info?",
    answer: "Nope! your IG info is saved locally on your PC by cookies, it is stored only on your PC and can be deleted any time you want.",
  },
  {
    question: "How much is to much follow & unfollow?",
    answer: "FollowFever can get you hounders of accounts in seconds, HOWEVER, if IG will detect you are over follow & unfollow, you might get shadowbanned. that is why you most do it slowly. FollowFever recommends to follow 10-15 profiles per hour, and not go over 40-50 per day."
  },
  {
    question: "Is my data safe?",
    answer: "Yes. We never share your account information and use Firebase to secure your data.",
  },
];

export default function GuidePage() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <Page>
      <h2>FollowFever Guide</h2>
      {faqItems.map((item, index) => (
        <div key={index}>
          <Question onClick={() => setOpenIndex(openIndex === index ? null : index)}>
            {item.question}
          </Question>
          {openIndex === index && <Answer>{item.answer}</Answer>}
        </div>
      ))}
    </Page>
  );
}
