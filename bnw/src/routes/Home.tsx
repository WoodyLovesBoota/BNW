import { styled } from "styled-components";
import { motion } from "framer-motion";
import { useState } from "react";
import Main from "../components/Main";
import Games from "../components/Games";

const Home = () => {
  return (
    <Wrapper>
      <Main />
      <Games />
    </Wrapper>
  );
};

export default Home;

const Wrapper = styled.div`
  position: relative;
  width: 100vw;
`;
