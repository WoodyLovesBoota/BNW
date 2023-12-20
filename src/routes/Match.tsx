import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { styled, keyframes } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  IconDefinition,
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
import { ReactComponent as HomeIcon } from "../assets/home.svg";
import { ReactComponent as RestartIcon } from "../assets/restart.svg";

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
    let target = [
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
    ];
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
        }, 400);
      } else {
        setTimeout(() => {
          setSelected([]);
        }, 600);
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
          <ResultTitle>You Win :)</ResultTitle>
          <ResultButtons>
            <ResButton onClick={onRestartClick}>
              <RestartIcon width={"32px"} />
            </ResButton>
            <ResButtonHome onClick={onHomeClick}>
              <HomeIcon width={"32px"} />
            </ResButtonHome>
          </ResultButtons>
        </Result>
      ) : null}
      <Icons>
        <Icon onClick={onHomeClick}>HOME</Icon>
        <Icon onClick={onRestartClick}>RESTART</Icon>
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
  height: 100vh;
  padding: 40px;
`;

const Icons = styled.div`
  width: 600px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 54px;
`;

const Icon = styled.h2`
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
  z-index: 2;
  &:hover {
    background-color: ${(props) => props.theme.white};
  }
  &:active {
    background-color: #00000011;
    box-shadow: 3px 3px 0px 0px rgba(0, 0, 0, 0.25) inset;
  }
`;

const Board = styled.div`
  height: 100%;
  width: 600px;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 165px;
  margin-bottom: 15px;
`;

const SelectedCell = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 110px;
  height: 100%;
  font-size: 32px;
  font-weight: 600;
  background: #d9d9d9;
  box-shadow: 4px 4px 0px 0px rgba(0, 0, 0, 0.1) inset;
  color: white;
  border-radius: 10px;
  cursor: pointer;
  color: #4d4d4d;
`;

const Cell = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 110px;
  height: 100%;
  font-size: 32px;
  font-weight: 500;
  border-radius: 8px;
  background: ${(props) => props.theme.bg};
  box-shadow: 4px 4px 0px 0px rgba(0, 0, 0, 0.1) inset;
  cursor: pointer;
  color: #4d4d4d;
`;

const Cover = styled(motion.div)`
  width: 110px;
  height: 100%;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0px 4px 0px 0px rgba(0, 0, 0, 0.1);
  &:hover {
    background-color: ${(props) => props.theme.white};
  }
  &:active {
    background-color: #d9d9d9;
    box-shadow: 4px 4px 0px 0px rgba(0, 0, 0, 0.1) inset;
  }
`;

const Result = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.75);
  z-index: 3;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ResultTitle = styled.h2`
  color: white;
  font-weight: 500;
  font-size: 32px;
  letter-spacing: 2px;
  padding-bottom: 30px;
`;

const ResultButtons = styled.div`
  display: flex;
  margin-top: 36px;
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
  margin: 0 10px;
`;

const ResButtonHome = styled(motion.button)`
  border: none;
  cursor: pointer;
  background-color: transparent;
  margin: 0 10px;
`;

const cardVar = {
  initial: { scale: 0, opacity: 0 },
  animate: { scale: 1, opacity: 1, transition: { duration: 0.2 } },
  selectAnimate: { scale: 1, opacity: 1, transition: { duration: 0.2 } },
  exit: { scale: 0, opacity: 0, transition: { duration: 0.2 } },
};
