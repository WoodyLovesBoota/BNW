import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { fourtynineResState } from "../atoms";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRotateRight, faHouse } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

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
    setIsStart(true);
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
    for (let i = 1; i < 50; i++) temp.push(i);
    temp.sort(() => Math.random() - 0.5);
    setArr(temp);
  }, []);

  useEffect(() => {
    if (current === 50) {
      setIsStart(false);
      setRes(time);
      setCurrent((prev) => prev + 1);
      setTotalRes((prev) => [...prev, time].sort((a, b) => a - b));
    }
  }, [current]);

  useEffect(() => {
    if (isStart) {
      setInterval(() => {
        setTime((prev) => prev + 1);
      }, 10);
    } else {
      setTime(0);
    }
  }, [isStart]);

  return (
    <Wrapper>
      {current < 50 ? (
        <>
          <Header>
            <Timer>
              <Minute>
                {Math.floor(Math.floor(time / 100) / 60) < 10
                  ? "0" + Math.floor(Math.floor(time / 100) / 60)
                  : Math.floor(Math.floor(time / 100) / 60)}
              </Minute>
              :
              <Second>
                {Math.floor(time / 100) % 60 < 10 ? "0" + (Math.floor(time / 100) % 60) : Math.floor(time / 100) % 60}
              </Second>{" "}
              .<MilSec>{time % 100 < 10 ? "0" + (time % 100) : time % 100}</MilSec>{" "}
            </Timer>
            <Buttons>
              <Button onClick={onStartClick}>Start</Button>
              <Button onClick={onHomeClick}>Home</Button>
            </Buttons>
          </Header>
          <Board>
            {[0, 1, 2, 3, 4, 5, 6].map((row) => (
              <Row key={row}>
                <AnimatePresence>
                  {[0, 1, 2, 3, 4, 5, 6].map((col) =>
                    isStart ? (
                      arr[row * 7 + col] < current ? (
                        <Cover variants={coverVar} initial="initial" animate="animate" key={col} />
                      ) : (
                        <Cell
                          variants={buttonVar}
                          whileTap={"click"}
                          animate="animate"
                          exit={"exit"}
                          key={col}
                          onClick={() => {
                            onNumberClick(arr[row * 7 + col]);
                          }}
                        >
                          {arr[row * 7 + col]}
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
        </>
      ) : (
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
              {Math.floor(res / 100) % 60 < 10 ? "0" + (Math.floor(res / 100) % 60) : Math.floor(res / 100) % 60}
            </ResultSecond>{" "}
            .<ResultMilSec>{res % 100 < 10 ? "0" + (res % 100) : res % 100}</ResultMilSec>{" "}
          </ResultTime>
          <Buttons>
            <ResButton onClick={onRestartClick}>
              <Icon>
                <FontAwesomeIcon icon={faArrowRotateRight} />
              </Icon>
              Restart
            </ResButton>
            <ResButton onClick={onHomeClick}>
              <Icon>
                <FontAwesomeIcon icon={faHouse} />
              </Icon>
              Main
            </ResButton>
          </Buttons>
          <ResultList>
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
          </ResultList>
        </Result>
      )}
    </Wrapper>
  );
};
export default FourtyNine;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 8%;
  height: 100vh;
  background-color: #141414;
`;

const Header = styled.div`
  width: 660px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Timer = styled.div`
  color: white;
  display: flex;
  align-items: flex-end;
  font-size: 18px;
  font-weight: 500;
`;

const Minute = styled.h2`
  font-size: 48px;
  font-weight: 500;
  margin: 0 15px;
`;

const Second = styled.h2`
  font-size: 48px;
  font-weight: 500;
  margin: 0 15px;
`;

const MilSec = styled.h2`
  font-size: 18px;
  font-weight: 500;
  margin: 0 15px;
`;

const Button = styled.button`
  background-color: white;
  color: black;
  border: none;
  padding: 20px 30px;
  font-size: 16px;
  border-radius: 15px;
  margin-bottom: 20px;
  cursor: pointer;
  margin-left: 15px;
  font-weight: 500;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background-color: rgba(255, 255, 255, 0.5);
  }
`;

const Board = styled.div``;

const Row = styled.div`
  display: flex;
  align-items: center;
  height: 90px;
  margin-bottom: 5px;
`;

const Cell = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 90px;
  height: 100%;
  font-size: 24px;
  font-weight: 600;
  background-color: rgba(170, 170, 170, 0.2);
  color: white;
  margin-right: 5px;
  border-radius: 10px;
  cursor: pointer;
`;

const Cover = styled(motion.div)`
  width: 90px;
  height: 100%;
  background-color: #202020;
  margin-right: 5px;
  border-radius: 10px;
`;

const HardCover = styled(motion.div)`
  width: 90px;
  height: 100%;
  background-color: #202020;
  margin-right: 5px;
  border-radius: 10px;
`;

const Result = styled(motion.div)``;

const ResultTitle = styled.h2`
  font-size: 30px;
  color: white;
  text-align: center;
  margin-bottom: 40px;
  font-weight: 500;
`;

const ResultTime = styled.div`
  color: white;
  display: flex;
  align-items: flex-end;
  font-size: 36px;
  font-weight: 500;
  margin-bottom: 50px;
`;

const Icon = styled(motion.span)`
  margin-right: 10px;
  font-weight: 600;
  font-size: 16px;
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

const Buttons = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ResButton = styled(motion.button)`
  background-color: white;
  color: black;
  border: none;
  padding: 20px 50px;
  font-size: 18px;
  border-radius: 15px;
  margin-right: 20px;
  font-weight: 500;
  cursor: pointer;

  &:hover {
    background-color: rgba(255, 255, 255, 0.5);
  }
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
  click: { scale: 0.8 },
};

const coverVar = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
};

const resultVar = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 1 } },
};
