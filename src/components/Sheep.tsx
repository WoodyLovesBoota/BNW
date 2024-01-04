import styled from "styled-components";
import { motion } from "framer-motion";
import Lottie from "react-lottie-player";
import animationData from "../animationData.json";

const Sheep = () => {
  return (
    <SheepLoad>
      <SheepBox variants={sheepVar} initial="initial" animate="animate">
        <Lottie
          animationData={animationData}
          style={{ width: "12.5rem", height: "12.5rem", transform: "rotate(180deg)" }}
          loop
          play
          speed={8}
        />
      </SheepBox>
      <SheepBox variants={sheep2Var} initial="initial" animate="animate">
        <Lottie
          animationData={animationData}
          style={{ width: "12.5rem", height: "12.5rem", transform: "rotate(180deg)" }}
          loop
          play
          speed={8}
        />
      </SheepBox>
      <SheepBox variants={sheep3Var} initial="initial" animate="animate">
        <Lottie
          animationData={animationData}
          style={{ width: "12.5rem", height: "12.5rem", transform: "rotate(180deg)" }}
          loop
          play
          speed={8}
        />
      </SheepBox>
      <SheepBox variants={sheep4Var} initial="initial" animate="animate">
        <Lottie
          animationData={animationData}
          style={{ width: "12.5rem", height: "12.5rem", transform: "rotate(180deg)" }}
          loop
          play
          speed={8}
        />
      </SheepBox>
      <SheepBox variants={sheep5Var} initial="initial" animate="animate">
        <Lottie
          animationData={animationData}
          style={{ width: "12.5rem", height: "12.5rem", transform: "rotate(180deg)" }}
          loop
          play
          speed={8}
        />
      </SheepBox>
    </SheepLoad>
  );
};

export default Sheep;

const SheepLoad = styled.div`
  display: flex;
  width: 100%;
  overflow-x: hidden;
`;

const SheepBox = styled(motion.div)`
  position: absolute;
  z-index: 1;
  top: 0;
  left: 0;
  @media screen and (max-width: 796px) {
    top: 5px;
  }
`;

const sheepVar = {
  initial: { x: -200 },
  animate: { x: "100vw", transition: { duration: 15, repeat: Infinity } },
};

const sheep2Var = {
  initial: { x: -200 },
  animate: { x: "100vw", transition: { duration: 7, delay: 2, repeat: Infinity } },
};

const sheep3Var = {
  initial: { x: -200 },
  animate: { x: "100vw", transition: { duration: 8, delay: 4, repeat: Infinity } },
};

const sheep4Var = {
  initial: { x: -200 },
  animate: { x: "100vw", transition: { duration: 3, delay: 6, repeat: Infinity } },
};

const sheep5Var = {
  initial: { x: -200 },
  animate: { x: "100vw", transition: { duration: 10, delay: 8, repeat: Infinity } },
};
