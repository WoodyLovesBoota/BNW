import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import styled from "styled-components";

const FourtyNine = () => {
  const [arr, setArr] = useState<number[]>([]);
  const [current, setCurrent] = useState(1);
  const [isStart, setIsStart] = useState(false);
  const [time, setTime] = useState(0);
  const [res, setRes] = useState(0);

  const onNumberClick = (num: number) => {
    if (num === current) {
      setCurrent((prev) => prev + 1);
    }
  };

  const onStartClick = () => {
    setIsStart(true);
    setInterval(() => {
      setTime((prev) => prev + 1);
    }, 10);
  };

  useEffect(() => {
    let temp = [];
    for (let i = 1; i < 50; i++) temp.push(i);
    temp.sort(() => Math.random() - 0.5);
    setArr(temp);
  }, []);

  useEffect(() => {
    if (current === 50) {
      setRes(time);
      setCurrent((prev) => prev + 1);
    }
  }, [current]);

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
              : <MilSec>{time % 100 < 10 ? "0" + (time % 100) : time % 100}</MilSec>{" "}
            </Timer>
            <Button variants={buttonVar} whileHover={"click"} onClick={onStartClick}>
              Start
            </Button>
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
        <Result>
          <ResultTime>
            <ResultTitle>Your Record is</ResultTitle>
            <Minute>
              {Math.floor(Math.floor(res / 100) / 60) < 10
                ? "0" + Math.floor(Math.floor(res / 100) / 60)
                : Math.floor(Math.floor(res / 100) / 60)}
            </Minute>
            :
            <Second>
              {Math.floor(res / 100) % 60 < 10 ? "0" + (Math.floor(res / 100) % 60) : Math.floor(res / 100) % 60}
            </Second>{" "}
            : <ResultMilSec>{res % 100 < 10 ? "0" + (res % 100) : res % 100}</ResultMilSec>{" "}
          </ResultTime>
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
  background-color: black;
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

const Button = styled(motion.button)`
  background-color: white;
  color: black;
  border: none;
  padding: 20px 30px;
  font-size: 18px;
  border-radius: 15px;
  margin-bottom: 20px;
  cursor: pointer;
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
  background-color: rgba(170, 170, 170, 0.1);
  margin-right: 5px;
  border-radius: 10px;
`;

const HardCover = styled(motion.div)`
  width: 90px;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.5);
  margin-right: 5px;
  border-radius: 10px;
`;

const Result = styled.div``;

const ResultTitle = styled.h2`
  font-size: 30px;
`;

const ResultTime = styled.div`
  color: white;
  display: flex;
  align-items: flex-end;
  font-size: 48px;
  font-weight: 500;
`;

const ResultMilSec = styled.h2`
  font-size: 48px;
  font-weight: 500;
  margin: 0 15px;
`;

const buttonVar = {
  animate: { scale: 1 },
  click: { scale: 0.8 },
};

const coverVar = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
};
