import styled from "styled-components";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import Lottie from "react-lottie-player";
import animationData from "../animationData.json";

const Sheep = () => {
  const [sheepCount, setSheepCount] = useState(1);

  useEffect(() => {
    const timer2 = setInterval(() => {
      setSheepCount(sheepCount + 1);
    }, 20000);

    return () => {
      clearInterval(timer2);
    };
  });
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
  position: relative;
`;

const SheepBox = styled(motion.div)`
  position: absolute;
  z-index: 1;
`;

const sheepVar = {
  initial: { x: -500 },
  animate: { x: "100vw", transition: { duration: 15, repeat: Infinity } },
};

const sheep2Var = {
  initial: { x: -500 },
  animate: { x: "100vw", transition: { duration: 7, delay: 2, repeat: Infinity } },
};

const sheep3Var = {
  initial: { x: -500 },
  animate: { x: "100vw", transition: { duration: 8, delay: 4, repeat: Infinity } },
};

const sheep4Var = {
  initial: { x: -500 },
  animate: { x: "100vw", transition: { duration: 3, delay: 6, repeat: Infinity } },
};

const sheep5Var = {
  initial: { x: -500 },
  animate: { x: "100vw", transition: { duration: 10, delay: 8, repeat: Infinity } },
};
