import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import styled, { keyframes } from "styled-components";
import { fourtynineResState } from "../atoms";
import { useNavigate } from "react-router-dom";
import { ReactComponent as HomeIcon } from "../assets/home.svg";
import { ReactComponent as RestartIcon } from "../assets/restart.svg";

const FourtyNine = () => {
  const [arr, setArr] = useState<number[]>([]);
  const [current, setCurrent] = useState(1);
  const [isStart, setIsStart] = useState(false);
  const [time, setTime] = useState(0);
  const [res, setRes] = useState(0);
  const [totalRes, setTotalRes] = useRecoilState(fourtynineResState);
  const navigate = useNavigate();

  const onNumberClick = (num: number) => {
    if (num === current) {
      setCurrent((prev) => prev + 1);
    }
  };

  const onStartClick = () => {
    if (isStart) {
      window.location.reload();
      setCurrent(1);
      setIsStart(false);
      setTime(0);
      setRes(0);
    } else setIsStart(true);
  };

  const onRestartClick = () => {
    setCurrent(1);
    setIsStart(false);
    setTime(0);
    setRes(0);
    window.location.reload();
  };

  const onHomeClick = () => {
    setIsStart(false);
    setCurrent(1);
    setTime(0);
    setRes(0);
    navigate("/");
  };

  useEffect(() => {
    let temp = [];
    for (let i = 1; i < 26; i++) temp.push(i);
    temp.sort(() => Math.random() - 0.5);
    setArr(temp);
  }, []);

  useEffect(() => {
    if (current === 26) {
      setIsStart(false);
      setRes(time);
      setTime(time);
      setTotalRes((prev) => [...prev, time].sort((a, b) => a - b));
    }
  }, [current]);

  useEffect(() => {
    setTime(0);

    let interval = setInterval(() => {
      setTime((prev) => prev + 1);
    }, 10);

    !isStart && clearInterval(interval);
  }, [isStart]);

  return (
    <Wrapper isStart={isStart}>
      <Container>
        <Buttons>
          <Button onClick={onHomeClick}>Home</Button>
          {isStart ? (
            <StartAfter isStart={isStart} onClick={onStartClick}>
              {isStart ? "RESTART" : "START"}
            </StartAfter>
          ) : (
            <Start isStart={isStart} onClick={onStartClick}>
              {isStart ? "RESTART" : "START"}
            </Start>
          )}
        </Buttons>
        <Header>
          {res === 0 ? (
            <Timer>
              <Minute>
                {Math.floor(Math.floor(time / 100) / 60) < 10
                  ? "0" + Math.floor(Math.floor(time / 100) / 60)
                  : Math.floor(Math.floor(time / 100) / 60)}
              </Minute>
              <Slash>:</Slash>
              <Second>
                {Math.floor(time / 100) % 60 < 10
                  ? "0" + (Math.floor(time / 100) % 60)
                  : Math.floor(time / 100) % 60}
              </Second>{" "}
              <Divider>.</Divider>
              <MilSec>{time % 100 < 10 ? "0" + (time % 100) : time % 100}</MilSec>{" "}
            </Timer>
          ) : (
            <ResTimer>
              <ResMinute>
                {Math.floor(Math.floor(res / 100) / 60) < 10
                  ? "0" + Math.floor(Math.floor(res / 100) / 60)
                  : Math.floor(Math.floor(res / 100) / 60)}
              </ResMinute>
              <ResSlash>:</ResSlash>
              <ResSecond>
                {Math.floor(res / 100) % 60 < 10
                  ? "0" + (Math.floor(res / 100) % 60)
                  : Math.floor(res / 100) % 60}
              </ResSecond>{" "}
              <ResDivider>.</ResDivider>
              <ResMilSec>{res % 100 < 10 ? "0" + (res % 100) : res % 100}</ResMilSec>{" "}
            </ResTimer>
          )}
        </Header>
        <Board>
          {[0, 1, 2, 3, 4].map((row) => (
            <Row key={row}>
              <AnimatePresence>
                {[0, 1, 2, 3, 4].map((col) =>
                  isStart ? (
                    arr[row * 5 + col] < current ? (
                      <Cover variants={coverVar} initial="initial" animate="animate" key={col} />
                    ) : (
                      <Cell
                        variants={buttonVar}
                        whileTap={"click"}
                        animate="animate"
                        exit={"exit"}
                        key={col}
                        onClick={() => {
                          onNumberClick(arr[row * 5 + col]);
                        }}
                      >
                        {arr[row * 5 + col]}
                      </Cell>
                    )
                  ) : (
                    <HardCover key={col} />
                  )
                )}
              </AnimatePresence>
            </Row>
          ))}
        </Board>
        {!isStart &&
          (current > 25 ? (
            <Result variants={resultVar} initial="initial" animate="animate">
              <ResultTitle>You Win :)</ResultTitle>
              <ResultButtons>
                <ResButton onClick={onRestartClick}>
                  <Icon>
                    <RestartIcon width={"32px"} />
                  </Icon>
                </ResButton>
                <ResButtonHome onClick={onHomeClick}>
                  <Icon>
                    <HomeIcon width={"32px"} />
                  </Icon>
                </ResButtonHome>
              </ResultButtons>
            </Result>
          ) : (
            <Shadow />
          ))}
      </Container>
    </Wrapper>
  );
};
export default FourtyNine;

const Wrapper = styled.div<{ isStart: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px;
`;

const Shadow = styled.div`
  background-color: rgba(0, 0, 0, 0.75);
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
`;

const Container = styled.div`
  width: 37.5rem;
`;

const Buttons = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 50px;
`;

const Header = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
`;

const Timer = styled.div`
  display: flex;
  align-items: flex-end;
  font-size: 48px;
  font-weight: 500;
  font-family: "Upheaval TT (BRK)";
  margin-bottom: 40px;
`;

const Minute = styled.h2`
  font-size: 64px;
  font-weight: 500;
  margin-right: 15px;
  font-family: "Upheaval TT (BRK)";
`;

const Second = styled.h2`
  font-size: 64px;
  font-weight: 500;
  margin: 0 15px;
  font-family: "Upheaval TT (BRK)";
`;

const MilSec = styled.h2`
  font-size: 48px;
  font-weight: 500;
  margin: 0 15px;
  font-family: "Upheaval TT (BRK)";
`;

const Slash = styled.h2`
  font-size: 64px;
  font-weight: 500;
  font-family: "Upheaval TT (BRK)";
`;

const Divider = styled.h2`
  font-size: 64px;
  font-weight: 800;
  font-family: "Upheaval TT (BRK)";
`;

const ResTimer = styled.div`
  display: flex;
  align-items: flex-end;
  font-size: 48px;
  font-weight: 500;
  font-family: "Upheaval TT (BRK)";
  margin-bottom: 40px;
  color: ${(props) => props.theme.accent};
  z-index: 5;
`;

const ResMinute = styled.h2`
  font-size: 64px;
  font-weight: 500;
  margin-right: 15px;
  font-family: "Upheaval TT (BRK)";
  color: ${(props) => props.theme.accent};
`;

const ResSecond = styled.h2`
  font-size: 64px;
  font-weight: 500;
  margin: 0 15px;
  font-family: "Upheaval TT (BRK)";
  color: ${(props) => props.theme.accent};
`;

const ResMilSec = styled.h2`
  font-size: 48px;
  font-weight: 500;
  margin: 0 15px;
  font-family: "Upheaval TT (BRK)";
  color: ${(props) => props.theme.accent};
`;

const ResSlash = styled.h2`
  font-size: 64px;
  font-weight: 500;
  font-family: "Upheaval TT (BRK)";
  color: ${(props) => props.theme.accent};
`;

const ResDivider = styled.h2`
  font-size: 64px;
  font-weight: 800;
  font-family: "Upheaval TT (BRK)";
  color: ${(props) => props.theme.accent};
`;

const Button = styled.button`
  font-family: "Upheaval TT (BRK)";
  background-color: white;
  border: none;
  font-size: 18px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 400;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px 14px;
  height: 36px;
  box-shadow: 0px 3px 0px 0px rgba(0, 0, 0, 0.25);
  &:hover {
    background-color: ${(props) => props.theme.white};
  }
  &:active {
    background-color: #00000011;
    box-shadow: 3px 3px 0px 0px rgba(0, 0, 0, 0.25) inset;
  }
`;

const shake = keyframes`
    0%, 100% {
    transform: translateY(0);
  }

  10%, 30%, 50%, 70%, 90% {
    transform: translateY(-2px);
  }

  20%, 40%, 60%, 80% {
    transform: translateY(2px);
  }
`;

const Start = styled(motion.button)<{ isStart: boolean }>`
  font-family: "Upheaval TT (BRK)";
  background-color: ${(props) => (props.isStart ? "white" : props.theme.accent)};
  border: none;
  font-size: 18px;
  border-radius: 8px;
  padding: 8px 14px;
  cursor: pointer;
  margin-left: 15px;
  font-weight: 400;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 36px;
  z-index: 2;
  box-shadow: 0px 3px 0px 0px rgba(0, 0, 0, 0.25);
  animation: ${shake} 0.5s linear infinite;
  &:hover {
    background-color: ${(props) => (props.isStart ? props.theme.white : "#d9ff00dd")};
    box-shadow: 3px 3px 0px 0px rgba(0, 0, 0, 0.25) inset;
    animation: none;
  }
  &:active {
    background-color: ${(props) => (props.isStart ? "#00000011" : "#d9ff00bb")};
    box-shadow: 3px 3px 0px 0px rgba(0, 0, 0, 0.25) inset;
  }
`;

const StartAfter = styled(motion.button)<{ isStart: boolean }>`
  font-family: "Upheaval TT (BRK)";
  background-color: ${(props) => (props.isStart ? "white" : props.theme.accent)};
  border: none;
  font-size: 18px;
  border-radius: 8px;
  padding: 8px 14px;
  cursor: pointer;
  margin-left: 15px;
  font-weight: 400;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 36px;
  z-index: 2;
  box-shadow: 0px 3px 0px 0px rgba(0, 0, 0, 0.25);

  &:hover {
    background-color: ${(props) => (props.isStart ? props.theme.white : "#d9ff00dd")};
    box-shadow: 3px 3px 0px 0px rgba(0, 0, 0, 0.25) inset;
  }
  &:active {
    background-color: ${(props) => (props.isStart ? "#00000011" : "#d9ff00bb")};
    box-shadow: 3px 3px 0px 0px rgba(0, 0, 0, 0.25) inset;
  }
`;

const Board = styled.div`
  width: 100%;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 6.875rem;
  margin-bottom: 0.8125rem;
  width: 100%;
`;

const Cell = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 6.875rem;
  height: 100%;
  font-size: 20px;
  font-weight: 500;
  border-radius: 8px;
  background-color: white;
  box-shadow: 0px 4px 0px 0px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  &:hover {
    background-color: ${(props) => props.theme.white};
  }
  &:active {
    background-color: #d9d9d9;
    box-shadow: 4px 4px 0px 0px rgba(0, 0, 0, 0.1) inset;
  }
`;

const Cover = styled(motion.div)`
  width: 6.875rem;
  height: 100%;
  background-color: ${(props) => props.theme.bg};
  box-shadow: 4px 4px 0px 0px rgba(0, 0, 0, 0.1) inset;
  border-radius: 8px;
`;

const HardCover = styled(motion.div)`
  width: 6.875rem;
  height: 100%;
  background-color: ${(props) => props.theme.white};
  margin-right: 0.3125rem;
  border-radius: 10px;
  box-shadow: 0px 4px 0px 0px rgba(0, 0, 0, 0.1);
`;

const Result = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 2;
  background-color: rgba(0, 0, 0, 0.75);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ResultTitle = styled.h2`
  font-size: 32px;
  text-align: center;
  font-weight: 500;
  color: white;
`;

const ResultButtons = styled.div`
  display: flex;
  margin-top: 56px;
`;

const Icon = styled(motion.span)`
  font-size: 32px;
  color: white;
  margin: 0 12px;
`;

const rotationAni = keyframes`
  0% {transform: rotate(0deg)};
  100% {transform: rotate(-360deg)};
`;

const ResButton = styled(motion.button)`
  border: none;
  cursor: pointer;
  background-color: transparent;
  animation: ${rotationAni} 3s linear infinite;
`;

const ResButtonHome = styled(motion.button)`
  border: none;
  cursor: pointer;
  background-color: transparent;
`;

const buttonVar = {
  initial: { scale: 0 },
  animate: { scale: 1 },
};

const coverVar = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
};

const resultVar = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 1 } },
};
