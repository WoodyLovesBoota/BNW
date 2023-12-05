import { styled } from "styled-components";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { faArrowRotateRight, faHouse, faCertificate, faFlag } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Games = () => {
  const [currentTile, setCurrentTile] = useState([0, 0]);
  const [count, setCount] = useState(1);
  const navigate = useNavigate();

  const onMouseEnter = (row: number, column: number) => {
    setCurrentTile([row, column]);
  };

  const onMatchClick = () => {
    navigate("/match");
  };

  const onFourtyNineClick = () => {
    navigate("/49");
  };

  const onOmokClick = () => {
    navigate("/omok");
  };

  const onMineClick = () => {
    navigate("/mine");
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
              <NumberRow key={"Row" + count}>
                <NumberBox key={count + 100} variants={number3Var} animate="animate" exit={"exit"}>
                  3
                </NumberBox>
                <NumberBox key={count + 200} variants={number2Var} animate="animate" exit={"exit"}>
                  2
                </NumberBox>
              </NumberRow>
              <NumberRow key={"Row" + count + 10}>
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
        <GameBox onClick={onOmokClick}>
          <Icon>
            <AnimatePresence mode="wait">
              <BoardRow key={"Row" + count + 11}>
                <BoardCell>
                  <Vertical />
                  <Horizen />
                  <White key={count + 100} variants={whiteVar} initial="initial" animate="animate" exit={"exit"} />
                </BoardCell>
                <BoardCell>
                  <Vertical />
                  <Horizen />
                </BoardCell>
              </BoardRow>
              <BoardRow key={"Row" + count + 12}>
                <BoardCell>
                  <Vertical />
                  <Horizen />
                </BoardCell>
                <BoardCell>
                  <Vertical />
                  <Horizen />
                  <Black key={count + 5} variants={blackVar} initial="initial" animate="animate" exit={"exit"} />
                </BoardCell>
              </BoardRow>
            </AnimatePresence>
          </Icon>
          <Title>Omok</Title>
          <Description>5개의 돌을 이어서 놓으세요.</Description>
        </GameBox>
        <GameBox onClick={onMatchClick}>
          <Icon>
            <AnimatePresence>
              <NumberRow key={"numberrow"}>
                <MatchBox
                  key={count + 7}
                  variants={matchColorVar}
                  initial="boxInitial"
                  animate="boxAnimate"
                  exit={"boxExit"}
                >
                  <MatchNum key={count + 200} variants={matchVar} initial="initial" animate="animate" exit={"exit"}>
                    3
                  </MatchNum>
                </MatchBox>
                <MatchBox></MatchBox>
              </NumberRow>
              <NumberRow key={"numberrow1"}>
                <MatchBox></MatchBox>
                <MatchBox
                  key={count + 6}
                  variants={matchColorVar}
                  initial="boxInitial"
                  animate="boxAnimate"
                  exit={"boxExit"}
                >
                  <MatchNum key={count + 4} variants={matchSecVar} initial="initial" animate="animate" exit={"exit"}>
                    3
                  </MatchNum>
                </MatchBox>
              </NumberRow>
            </AnimatePresence>
          </Icon>
          <Title>Card</Title>
          <Description>같은 모양의 카드를 찾아주세요.</Description>
        </GameBox>
        <GameBox onClick={onMineClick}>
          <Icon>
            <AnimatePresence>
              <MineRow key={"numberrow2"}>
                <MineBox>1</MineBox>
                <MineBox>
                  <Bomb key={count + 100} variants={whiteVar} initial="initial" animate="animate" exit={"exit"}>
                    <FontAwesomeIcon icon={faCertificate} />
                  </Bomb>
                </MineBox>
              </MineRow>
              <MineRow key={"numberrow3"}>
                <MineBox>
                  <FlagIcon key={count + 100} variants={blackVar} initial="initial" animate="animate" exit={"exit"}>
                    <FontAwesomeIcon icon={faFlag} />
                  </FlagIcon>
                </MineBox>
                <MineBox></MineBox>
              </MineRow>
            </AnimatePresence>
          </Icon>
          <Title>Mine Sweeper</Title>
          <Description>숨겨진 지뢰를 모두 찾아내어 승리하세요.</Description>
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
  color: white;
  padding: 40px 50px;
  cursor: pointer;
  &:hover {
    background-color: rgba(45, 45, 45, 0.15);
  }
`;

const Icon = styled(motion.div)`
  margin-bottom: 15px;
  height: 60%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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

const BoardRow = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const BoardCell = styled.div`
  width: 36px;
  height: 36px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Vertical = styled.div`
  background-color: rgba(255, 255, 255, 0.6);
  width: 1px;
  height: 100%;
  position: absolute;
  left: 50%;
  z-index: 1;
`;

const Horizen = styled.div`
  background-color: rgba(255, 255, 255, 0.6);
  width: 100%;
  height: 1px;
  position: absolute;
  top: 50%;
  z-index: 1;
`;

const White = styled(motion.div)`
  background-color: #87cefa;
  width: 27px;
  height: 27px;
  border-radius: 15px;
  z-index: 2;
`;

const Black = styled(motion.div)`
  background-color: #f7aea6;
  width: 27px;
  height: 27px;
  border-radius: 15px;
  z-index: 2;
`;

const MatchBox = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  color: rgba(255, 255, 255, 0.6);
  border: 2px solid rgba(255, 255, 255, 0.6);
  margin: 5px;
  width: 50px;
  height: 50px;
  border-radius: 10px;
`;

const MatchNum = styled(motion.h2)`
  font-weight: 500;
  font-size: 16px;
`;

const MineRow = styled(motion.div)`
  display: flex;
  border-left: 2px solid rgba(255, 255, 255, 0.6);
  &:last-child {
    border-bottom: 2px solid rgba(255, 255, 255, 0.6);
  }
`;

const MineBox = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  color: rgba(255, 255, 255, 0.6);
  border-top: 2px solid rgba(255, 255, 255, 0.6);
  border-right: 2px solid rgba(255, 255, 255, 0.6);
  width: 50px;
  height: 50px;
  font-size: 18px;
  font-weight: 500;
`;

const Bomb = styled(motion.span)`
  color: #ed5744;
`;

const FlagIcon = styled(motion.span)`
  color: #4a6bd6;
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

const blackVar = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.3, delay: 0.5 } },
  exit: { opacity: 0, transition: { duration: 0.3, delay: 2 } },
};

const whiteVar = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.3, delay: 1.5 } },
  exit: { opacity: 0, transition: { duration: 0.3, delay: 2 } },
};

const matchVar = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.2, delay: 0.5 } },
  exit: { opacity: 0, transition: { duration: 0.2, delay: 2 } },
};

const matchSecVar = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.2, delay: 1 } },
  exit: { opacity: 0, transition: { duration: 0.2, delay: 2 } },
};

const matchColorVar = {
  boxInitial: { backgroundColor: "#202020" },
  boxAnimate: { backgroundColor: "#ffffff55", transition: { duration: 0.2, delay: 1.5 } },
  boxExit: { backgroundColor: "#202020", transition: { duration: 0.2, delay: 2 } },
};
