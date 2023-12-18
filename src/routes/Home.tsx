import { styled } from "styled-components";
import { motion } from "framer-motion";
import { useState } from "react";
import Main from "../components/Main";
import Games from "../components/Games";
import Face from "../components/Face";

const Home = () => {
  return (
    <Wrapper>
      {/* <Main />
      <Games /> */}
      <Face />
    </Wrapper>
  );
};

export default Home;

const Wrapper = styled.div`
  position: relative;
  width: 100vw;
  background-color: #141414;
`;
