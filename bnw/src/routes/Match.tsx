import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { styled, keyframes } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  IconDefinition,
  faArrowRotateRight,
  faHouse,
  faStar,
  faMoon,
  faHeart,
  faPaw,
  faSun,
  faSnowflake,
  faMusic,
  faClover,
  faDiamond,
  faRocket,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const Match = () => {
  const [arr, setArr] = useState<number[]>([]);
  const [opened, setOpened] = useState<number[][]>([]);
  const [selected, setSelected] = useState<number[][]>([]);
  const [isFinish, setIsFinish] = useState(false);
  const navigate = useNavigate();
  const [pattern, setPattern] = useState<IconDefinition[]>([]);

  const onCardClick = (row: number, col: number) => {
    setSelected((prev) => [...prev, [row, col]]);
  };

  const onHomeClick = () => {
    setSelected([]);
    setIsFinish(false);
    setOpened([]);
    navigate("/");
  };

  const onRestartClick = () => {
    setSelected([]);
    setIsFinish(false);
    setOpened([]);
    window.location.reload();
  };

  useEffect(() => {
    let target = [faStar, faMoon, faHeart, faPaw, faSun, faSnowflake, faMusic, faClover, faDiamond, faRocket];
    setPattern(target);
  }, []);

  useEffect(() => {
    if (opened.length === 20) {
      setIsFinish(true);
    }
  }, [opened]);

  useEffect(() => {
    if (selected.length === 2) {
      if (arr[selected[0][0] * 5 + selected[0][1]] === arr[selected[1][0] * 5 + selected[1][1]]) {
        setTimeout(() => {
          setOpened((prev) => [...prev, selected[0], selected[1]]);
          setSelected([]);
        }, 1000);
      } else {
        setTimeout(() => {
          setSelected([]);
        }, 1000);
      }
    }
  }, [selected]);

  useEffect(() => {
    let temp = [];
    for (let i = 1; i < 11; i++) temp.push(i, i);
    temp.sort(() => Math.random() - 0.5);
    setArr(temp);
  }, [isFinish]);

  return (
    <Wrapper>
      {isFinish ? (
        <Result>
          <ResultTitle>Win</ResultTitle>
          <ResultIcon onClick={onRestartClick}>
            <FontAwesomeIcon icon={faArrowRotateRight} />
          </ResultIcon>
        </Result>
      ) : null}
      <Icons>
        <Icon onClick={onHomeClick}>
          <FontAwesomeIcon icon={faHouse} />
        </Icon>
        <Icon onClick={onRestartClick}>
          <FontAwesomeIcon icon={faArrowRotateRight} />
        </Icon>
      </Icons>
      <Board>
        {[0, 1, 2, 3].map((row) => (
          <Row key={row}>
            <AnimatePresence>
              {[0, 1, 2, 3, 4].map((col) =>
                selected.some((e) => e[0] === row && e[1] === col) ? (
                  <SelectedCell
                    key={col}
                    variants={cardVar}
                    initial="initial"
                    animate="selectAnimate"
                    whileHover="hover"
                    exit={"exit"}
                  >
                    <FontAwesomeIcon icon={pattern[arr[row * 5 + col] - 1]} />
                  </SelectedCell>
                ) : opened.some((e) => e[0] === row && e[1] === col) ? (
                  <Cell
                    key={col}
                    variants={cardVar}
                    initial="initial"
                    animate="selectAnimate"
                    whileHover="hover"
                    exit={"exit"}
                  >
                    <FontAwesomeIcon icon={pattern[arr[row * 5 + col] - 1]} />
                  </Cell>
                ) : (
                  <Cover
                    key={col}
                    variants={cardVar}
                    initial="initial"
                    animate="selectAnimate"
                    whileHover="hover"
                    exit={"exit"}
                    onClick={() => {
                      onCardClick(row, col);
                    }}
                  />
                )
              )}
            </AnimatePresence>
          </Row>
        ))}
      </Board>
    </Wrapper>
  );
};

export default Match;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 8%;
  height: 100vh;
  background-color: #141414;
`;

const Board = styled.div`
  height: 100%;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  height: 10rem;
  margin-bottom: 0.9375rem;
`;

const SelectedCell = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 6.25rem;
  height: 100%;
  font-size: 2rem;
  font-weight: 600;
  background-color: rgba(94, 94, 94, 0.2);
  color: white;
  margin-right: 0.9375rem;
  border-radius: 0.625rem;
  cursor: pointer;
`;

const Cell = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 6.25rem;
  height: 100%;
  font-size: 2rem;
  font-weight: 600;
  background-color: rgba(170, 170, 170, 0.2);
  color: white;
  margin-right: 0.9375rem;
  border-radius: 0.625rem;
  cursor: pointer;
`;

const Cover = styled(motion.div)`
  width: 6.25rem;
  height: 100%;
  background-color: #202020;
  margin-right: 0.9375rem;
  border-radius: 0.625rem;
  cursor: pointer;
`;

const Result = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 3;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 8%;
`;

const ResultTitle = styled.h2`
  color: white;
  font-weight: 500;
  font-size: 2rem;
  letter-spacing: 0.125rem;
  padding-bottom: 1.875rem;
`;

const rotationAni = keyframes`
  0% {transform: rotate(0deg)};
  100% {transform: rotate(360deg)};
`;

const ResultIcon = styled.span`
  color: white;
  font-weight: 500;
  font-size: 2rem;
  letter-spacing: 0.125rem;
  margin-bottom: 1.875rem;
  cursor: pointer;
  animation: ${rotationAni} 3s linear infinite;
`;

const Icons = styled.div`
  display: flex;
  width: 34.375rem;
  justify-content: flex-end;
  margin-bottom: 1.875rem;
`;

const Icon = styled.span`
  color: white;
  font-weight: 500;
  font-size: 1.5rem;
  margin-right: 1.25rem;
  cursor: pointer;
`;

const cardVar = {
  initial: { scale: 0, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  selectAnimate: { scale: 1, opacity: 1 },

  exit: { scale: 0, opacity: 0 },
  hover: { scale: 1.05 },
};
