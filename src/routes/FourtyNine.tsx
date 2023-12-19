import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { fourtynineResState } from "../atoms";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRotateRight, faHouse, faRotateLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const FourtyNine = () => {
  const [arr, setArr] = useState<number[]>([]);
  const [current, setCurrent] = useState(1);
  const [isStart, setIsStart] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
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
    } else setIsStart(true);
  };

  const onRestartClick = () => {
    setCurrent(1);
    setIsStart(false);
    setTime(0);
    window.location.reload();
  };

  const onHomeClick = () => {
    setIsStart(false);
    setCurrent(1);
    setTime(0);
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
          <Start isStart={isStart} onClick={onStartClick}>
            {isStart ? "RESTART" : "START"}
          </Start>
        </Buttons>
        <Header>
          {isStart ? (
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
            <Timer>
              <Minute>{"00"}</Minute>
              <Slash>:</Slash>
              <Second>{"00"}</Second> <Divider>.</Divider>
              <MilSec>{"00"}</MilSec>{" "}
            </Timer>
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
              <ResultTitle>Your Record is</ResultTitle>
              <ResultTime>
                <ResultMinute>
                  {Math.floor(Math.floor(res / 100) / 60) < 10
                    ? "0" + Math.floor(Math.floor(res / 100) / 60)
                    : Math.floor(Math.floor(res / 100) / 60)}
                </ResultMinute>
                :
                <ResultSecond>
                  {Math.floor(res / 100) % 60 < 10
                    ? "0" + (Math.floor(res / 100) % 60)
                    : Math.floor(res / 100) % 60}
                </ResultSecond>{" "}
                .<ResultMilSec>{res % 100 < 10 ? "0" + (res % 100) : res % 100}</ResultMilSec>{" "}
              </ResultTime>
              <ResultButtons>
                <ResButton onClick={onRestartClick}>
                  <Icon>
                    <FontAwesomeIcon icon={faRotateLeft} />
                  </Icon>
                </ResButton>
                <ResButton onClick={onHomeClick}>
                  <Icon>
                    <FontAwesomeIcon icon={faHouse} />
                  </Icon>
                </ResButton>
              </ResultButtons>
              {/* <ResultList>
              {totalRes.map(
                (res, ind) =>
                  ind < 5 && (
                    <ResultItem>
                      <Rank>{ind + 1}. </Rank>
                      <MinuteRes>
                        {Math.floor(Math.floor(res / 100) / 60) < 10
                          ? "0" + Math.floor(Math.floor(res / 100) / 60)
                          : Math.floor(Math.floor(res / 100) / 60)}
                      </MinuteRes>
                      :
                      <SecondRes>
                        {Math.floor(res / 100) % 60 < 10
                          ? "0" + (Math.floor(res / 100) % 60)
                          : Math.floor(res / 100) % 60}
                      </SecondRes>{" "}
                      .<MilSecRes>{res % 100 < 10 ? "0" + (res % 100) : res % 100}</MilSecRes>{" "}
                    </ResultItem>
                  )
              )}
            </ResultList> */}
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
  background-color: rgba(0, 0, 0, 0.7);
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
`;

const Container = styled.div`
  width: 600px;
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
  width: 81px;
  height: 36px;
  box-shadow: 0px 3px 0px 0px rgba(0, 0, 0, 0.25);
  &:hover {
    background-color: #e5e5e5;
    box-shadow: 3px 3px 0px 0px rgba(0, 0, 0, 0.25) inset;
  }
  &:active {
    background-color: #00000011;
    box-shadow: 3px 3px 0px 0px rgba(0, 0, 0, 0.25) inset;
  }
`;

const Start = styled.button<{ isStart: boolean }>`
  font-family: "Upheaval TT (BRK)";
  background-color: ${(props) => (props.isStart ? "white" : "#d9ff00")};
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
    background-color: ${(props) => (props.isStart ? "#e5e5e5" : "#d9ff00dd")};
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
  height: 110px;
  margin-bottom: 13px;
  width: 100%;
`;

const Cell = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 110px;
  height: 100%;
  font-size: 20px;
  font-weight: 500;
  border-radius: 8px;
  background-color: white;
  box-shadow: 0px 4px 0px 0px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  &:hover {
    background-color: #e6e6e6;
  }
  &:active {
    background-color: #d9d9d9;
    box-shadow: 4px 4px 0px 0px rgba(0, 0, 0, 0.1) inset;
  }
`;

const Cover = styled(motion.div)`
  width: 110px;
  height: 100%;
  background: #bfbfbf;
  box-shadow: 4px 4px 0px 0px rgba(0, 0, 0, 0.1) inset;
  border-radius: 8px;
`;

const HardCover = styled(motion.div)`
  width: 110px;
  height: 100%;
  background-color: #e6e6e6;
  margin-right: 5px;
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
  background: rgba(0, 0, 0, 0.5);
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

const ResultTime = styled.div`
  display: flex;
  align-items: flex-end;
  font-size: 36px;
  font-weight: 500;
`;

const ResultButtons = styled.div`
  display: flex;
  margin-top: 68px;
`;

const Icon = styled(motion.span)`
  font-size: 32px;
  color: white;
  margin: 0 12px;
`;

const ResultMinute = styled.h2`
  font-size: 72px;
  font-weight: 500;
  margin: 0 30px;
`;

const ResultSecond = styled.h2`
  font-size: 72px;
  font-weight: 500;
  margin: 0 30px;
`;

const ResultMilSec = styled.h2`
  font-size: 36px;
  font-weight: 500;
  margin: 0 30px;
`;

const ResultList = styled.div`
  margin-top: 50px;
`;

const ResultItem = styled.div`
  color: white;
  display: flex;
  background-color: rgba(58, 58, 58, 0.5);
  padding: 20px;
  border-radius: 15px;
  margin-bottom: 20px;
  align-items: flex-end;
  box-shadow: 0 0 15px 0 rgba(156, 156, 156, 0.3);
  justify-content: center;
`;

const ResButton = styled(motion.button)`
  border: none;
  cursor: pointer;
  background-color: transparent;
`;

const Rank = styled.h2`
  font-size: 20px;
  font-weight: 500;
  margin: 0 15px;
`;

const MinuteRes = styled.h2`
  font-size: 24px;
  font-weight: 500;
  margin: 0 15px;
`;

const SecondRes = styled.h2`
  font-size: 24px;
  font-weight: 500;
  margin: 0 15px;
`;

const MilSecRes = styled.h2`
  font-size: 14px;
  font-weight: 500;
  margin: 0 15px;
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
