import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import styled from "styled-components";
import AddCandidate from "./components/AddCandidate";
//import SearchCandidate from "./SearchCandidate";

const Navbar = styled.nav`
  background-color: #007bff;
  padding: 10px;
  display: flex;
  justify-content: center;
  gap: 20px;
`;

const NavLink = styled(Link)`
  color: #fff;
  text-decoration: none;
  font-size: 18px;

  &:hover {
    text-decoration: underline;
  }
`;

const Heading = styled.h1`
  text-align: center;
  margin: 20px 0;
`;

const AppContainer = styled.div`
  background-color: #f8f9fa;
  min-height: 100vh;
  padding: 20px;
  box-sizing: border-box;
`;

const App = () => {
  return (
    <AppContainer>
      <Navbar>
        <NavLink to="/">Add Candidate</NavLink>
        <NavLink to="/search">Search Candidate</NavLink>
      </Navbar>
      <Heading>Job Candidate Hub</Heading>
      <Routes>
        <Route path="/" element={<AddCandidate />} />
        <Route path="/search" element={""} />
      </Routes>
    </AppContainer>
  );
};

export default App;
