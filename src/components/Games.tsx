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

  const onWordleClick = () => {
    navigate("/wordle");
  };

  useEffect(() => {
    const timer3 = setInterval(() => {
      setCount(count + 1);
    }, 3000);
    return () => clearInterval(timer3);
  });

  return (
    <Wrapper>
      <Header>
        <HeaderTitle>
          MINI GAMES
          <br />
          BY YANG
        </HeaderTitle>
        <HeaderSubtitle>양태욱이 만든 다양한 종류의 미니게임이 당신을 기다리고있어요.</HeaderSubtitle>
      </Header>
      <Board>
        <GameBox onClick={onFourtyNineClick}>
          <Icon>
            <AnimatePresence mode="wait">
              <NumberRow key={"Row" + count}>
                <NumberBox key={"four" + count + 100} variants={number3Var} animate="animate" exit={"exit"}>
                  3
                </NumberBox>
                <NumberBox key={"four" + count + 200} variants={number2Var} animate="animate" exit={"exit"}>
                  2
                </NumberBox>
              </NumberRow>
              <NumberRow key={"Row" + count + 10}>
                <NumberBox key={"four" + count} variants={number1Var} initial="initial" animate="animate" exit={"exit"}>
                  1
                </NumberBox>
                <NumberBox
                  key={"four" + count + 4}
                  variants={number4Var}
                  initial="initial"
                  animate="animate"
                  exit={"exit"}
                >
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
        <GameBox onClick={onWordleClick}>
          <Icon>
            <AnimatePresence>
              <NumberRow key={"numberrow"}>
                <MatchBox
                  key={count + 7}
                  variants={wordColorVar}
                  initial="boxInitial"
                  animate="boxAnimate"
                  exit={"boxExit"}
                >
                  <MatchNum key={count + 200} variants={word1Var} initial="initial" animate="animate" exit={"exit"}>
                    B
                  </MatchNum>
                </MatchBox>
                <MatchBox
                  key={count + 16}
                  variants={wordGColorVar}
                  initial="boxInitial"
                  animate="boxAnimate"
                  exit={"boxExit"}
                >
                  <MatchNum key={count + 214} variants={word2Var} initial="initial" animate="animate" exit={"exit"}>
                    N
                  </MatchNum>
                </MatchBox>
                <MatchBox
                  key={count + 26}
                  variants={wordColorVar}
                  initial="boxInitial"
                  animate="boxAnimate"
                  exit={"boxExit"}
                >
                  <MatchNum key={count + 234} variants={word3Var} initial="initial" animate="animate" exit={"exit"}>
                    W
                  </MatchNum>
                </MatchBox>
              </NumberRow>
            </AnimatePresence>
          </Icon>
          <Title>Wordle</Title>
          <Description>단어를 맞춰주세요.</Description>
        </GameBox>
      </Board>
    </Wrapper>
  );
};

export default Games;

const Wrapper = styled.div`
  width: 100vw;
  background-color: transparent;
  padding: 270px 156px;
  position: absolute;
  z-index: 2;
`;

const Header = styled.div``;

const HeaderTitle = styled.h2`
  font-family: "Upheaval TT (BRK)";
  font-size: 100px;
  line-height: 100px;
`;

const HeaderSubtitle = styled.h2`
  margin-top: 72px;
  font-size: 24px;
`;

const Board = styled.div`
  display: grid;
  justify-content: center;
  grid-template-columns: repeat(3, 1fr);
  width: 100%;
  height: 100%;
  margin-top: 120px;
  grid-gap: 40px;
`;

const GameBox = styled(motion.div)`
  background-color: white;
  width: 377px;
  height: 534px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
  padding: 8px;
  &:hover {
    background-color: rgba(45, 45, 45, 0.15);
  }
`;

const Icon = styled(motion.div)`
  height: 372px;
  width: 100%;
  border-radius: 8px;
  background-color: #d9ff00;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 68px;
`;

const NumberRow = styled(motion.div)`
  display: flex;
`;

const NumberBox = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #141414;
  border: 2px solid #141414;
  margin: 5px;
  width: 50px;
  height: 50px;
  border-radius: 10px;
  font-weight: 500;
  font-size: 16px;
`;

const Title = styled.h2`
  font-weight: 600;
  font-size: 1.125rem;
  margin-bottom: 1.25rem;
`;

const Description = styled.h2`
  font-size: 0.75rem;
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
  width: 2.25rem;
  height: 2.25rem;
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
  width: 1.6875rem;
  height: 1.6875rem;
  border-radius: 0.9375rem;
  z-index: 2;
`;

const Black = styled(motion.div)`
  background-color: #f7aea6;
  width: 1.6875rem;
  height: 1.6875rem;
  border-radius: 0.9375rem;
  z-index: 2;
`;

const MatchBox = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  color: rgba(255, 255, 255, 0.6);
  border: 0.125rem solid rgba(255, 255, 255, 0.6);
  margin: 0.3125rem;
  width: 3.125rem;
  height: 3.125rem;
  border-radius: 0.625rem;
`;

const MatchNum = styled(motion.h2)`
  font-weight: 500;
  font-size: 1rem;
`;

const MineRow = styled(motion.div)`
  display: flex;
  border-left: 0.125rem solid rgba(255, 255, 255, 0.6);
  &:last-child {
    border-bottom: 0.125rem solid rgba(255, 255, 255, 0.6);
  }
`;

const MineBox = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  color: rgba(255, 255, 255, 0.6);
  border-top: 0.125rem solid rgba(255, 255, 255, 0.6);
  border-right: 0.125rem solid rgba(255, 255, 255, 0.6);
  width: 3.125rem;
  height: 3.125rem;
  font-size: 1.125rem;
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

const word1Var = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.2, delay: 0.5 } },
  exit: { opacity: 0, transition: { duration: 0.2, delay: 2 } },
};

const word2Var = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.2, delay: 1 } },
  exit: { opacity: 0, transition: { duration: 0.2, delay: 2 } },
};
const word3Var = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.2, delay: 1.5 } },
  exit: { opacity: 0, transition: { duration: 0.2, delay: 2 } },
};
const wordColorVar = {
  boxInitial: { backgroundColor: "#202020" },
  boxAnimate: { backgroundColor: "#F7C04A", transition: { duration: 0.2, delay: 2 } },
  boxExit: { backgroundColor: "#202020", transition: { duration: 0.2, delay: 2 } },
};
const wordGColorVar = {
  boxInitial: { backgroundColor: "#202020" },
  boxAnimate: { backgroundColor: "#539165", transition: { duration: 0.2, delay: 2 } },
  boxExit: { backgroundColor: "#202020", transition: { duration: 0.2, delay: 2 } },
};
