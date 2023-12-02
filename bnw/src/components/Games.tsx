import { styled } from "styled-components";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Games = () => {
  const [currentTile, setCurrentTile] = useState([0, 0]);
  const [count, setCount] = useState(1);
  const navigate = useNavigate();

  const onMouseEnter = (row: number, column: number) => {
    setCurrentTile([row, column]);
  };

  const onFourtyNineClick = () => {
    navigate("/49");
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCount(count + 1);
    }, 3000);
    return () => clearInterval(timer);
  });

  return (
    <Wrapper>
      <Board>
        <GameBox onClick={onFourtyNineClick}>
          <Icon>
            <AnimatePresence mode="wait">
              <NumberRow>
                <NumberBox key={count + 100} variants={number3Var} animate="animate" exit={"exit"}>
                  3
                </NumberBox>
                <NumberBox key={count + 200} variants={number2Var} animate="animate" exit={"exit"}>
                  2
                </NumberBox>
              </NumberRow>
              <NumberRow>
                <NumberBox key={count} variants={number1Var} initial="initial" animate="animate" exit={"exit"}>
                  1
                </NumberBox>
                <NumberBox key={count + 4} variants={number4Var} initial="initial" animate="animate" exit={"exit"}>
                  4
                </NumberBox>
              </NumberRow>
            </AnimatePresence>
          </Icon>
          <Title>49</Title>
          <Description>1부터 49까지 가능한 빠르게 클릭해주세요.</Description>
        </GameBox>
        <GameBox>
          <Icon></Icon>
          <Title></Title>
          <Description></Description>
        </GameBox>
        <GameBox>
          <Icon></Icon>
          <Title></Title>
          <Description></Description>
        </GameBox>
        <GameBox>
          <Icon></Icon>
          <Title></Title>
          <Description></Description>
        </GameBox>
      </Board>
    </Wrapper>
  );
};

export default Games;

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #141414;
  padding: 8%;
`;

const Board = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const GameBox = styled(motion.div)`
  background-color: #202020;
  width: 300px;
  height: 300px;
  margin: 0 5px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  color: white;
  padding: 40px 50px;
  cursor: pointer;
  &:hover {
    background-color: rgba(45, 45, 45, 0.15);
  }
`;

const Icon = styled(motion.div)`
  margin-bottom: 15px;
`;

const NumberRow = styled(motion.div)`
  display: flex;
`;

const NumberBox = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  color: rgba(255, 255, 255, 0.6);
  border: 2px solid rgba(255, 255, 255, 0.6);
  margin: 5px;
  width: 50px;
  height: 50px;
  border-radius: 10px;
  font-weight: 500;
  font-size: 16px;
`;

const Title = styled.h2`
  font-weight: 600;
  font-size: 18px;
  margin-bottom: 20px;
`;

const Description = styled.h2`
  font-size: 12px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.6);
  text-align: center;
`;

const number1Var = {
  initial: { opacity: 1 },
  animate: { opacity: 0, transition: { duration: 0.3, delay: 0.5 } },
  exit: { opacity: 1, transition: { duration: 0.3, delay: 2 } },
};

const number2Var = {
  initial: { opacity: 1 },
  animate: { opacity: 0, transition: { duration: 0.3, delay: 1 } },
  exit: { opacity: 1, transition: { duration: 0.3, delay: 2 } },
};

const number3Var = {
  initial: { opacity: 1 },
  animate: { opacity: 0, transition: { duration: 0.3, delay: 1.5 } },
  exit: { opacity: 1, transition: { duration: 0.3, delay: 2 } },
};

const number4Var = {
  initial: { opacity: 1 },
  animate: { opacity: 0, transition: { duration: 0.3, delay: 2 } },
  exit: { opacity: 1, transition: { duration: 0.3, delay: 2 } },
};
