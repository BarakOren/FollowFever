import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { createGlobalStyle } from "styled-components";
import Header from "./header";
import { Routes, Route } from "react-router-dom";
import About from "./pages/About";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Pricing from "./pages/Pricing";  
import Footer from "./pages/components/Footer";
import PaymentPage from "./pages/PaymentPage";
import LoginPage from "./pages/LoginPage";

// background-image: linear-gradient(to right bottom, #f8ffea, #fdf5de, #ffead8, #ffe0d7, #ffd7dc, #fad8e8, #f0daf3, #e3defa, #dce8ff, #daf1ff, #e0f9ff, #eafffe);

const GlobalStyle = createGlobalStyle`
  body {
  background-image: linear-gradient(to right bottom, #ffffff, #fffcff, #fff9f9, #fff7ed, #fff9e4, #fff6de, #fff3d7, #fff0d1, #ffe6d0, #ffddd8, #ffd7e6, #f8d5f6);
    min-height: 100vh;
    margin: 0;
    padding: 0;
  }
  /* other global styles */
`;


const AppContainer = styled.div`
  font-family: Arial, sans-serif;
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
  color: #222;
`;

const Title = styled.header`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
`;


export default function App() {
 

  return (
    <AppContainer>
     <GlobalStyle />
     <Header />
     <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/checkout" element={<PaymentPage />} />
        <Route path="/login" element={<LoginPage />} />
     </Routes>
     <Footer />
    </AppContainer>
  );
}
