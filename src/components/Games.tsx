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
      <Header>
        <AnimatePresence mode="wait">
          <HeaderTitle
            key={String(count + 101) + "header"}
            variants={header1Var}
            initial="initial"
            animate="animate"
            exit={"exit"}
          >
            B
          </HeaderTitle>
          <HeaderTitle
            key={String(count + 105) + "header"}
            variants={header2Var}
            initial="initial"
            animate="animate"
            exit={"exit"}
          >
            L
          </HeaderTitle>{" "}
          <HeaderTitle
            key={String(count + 109) + "header"}
            variants={header3Var}
            initial="initial"
            animate="animate"
            exit={"exit"}
          >
            A
          </HeaderTitle>{" "}
          <HeaderTitle
            key={String(count + 113) + "header"}
            variants={header4Var}
            initial="initial"
            animate="animate"
            exit={"exit"}
          >
            C
          </HeaderTitle>{" "}
          <HeaderTitle
            key={String(count + 117) + "header"}
            variants={header5Var}
            initial="initial"
            animate="animate"
            exit={"exit"}
          >
            K
          </HeaderTitle>{" "}
          <HeaderTitle
            key={String(count + 121) + "header"}
            variants={header6Var}
            initial="initial"
            animate="animate"
            exit={"exit"}
          >
            N
          </HeaderTitle>{" "}
          <HeaderTitle
            key={String(count + 125) + "header"}
            variants={header7Var}
            initial="initial"
            animate="animate"
            exit={"exit"}
          >
            W
          </HeaderTitle>{" "}
          <HeaderTitle
            key={String(count + 129) + "header"}
            variants={header8Var}
            initial="initial"
            animate="animate"
            exit={"exit"}
          >
            H
          </HeaderTitle>{" "}
          <HeaderTitle
            key={String(count + 133) + "header"}
            variants={header9Var}
            initial="initial"
            animate="animate"
            exit={"exit"}
          >
            I
          </HeaderTitle>{" "}
          <HeaderTitle
            key={String(count + 137) + "header"}
            variants={header10Var}
            initial="initial"
            animate="animate"
            exit={"exit"}
          >
            T
          </HeaderTitle>{" "}
          <HeaderTitle
            key={String(count + 141) + "header"}
            variants={header11Var}
            initial="initial"
            animate="animate"
            exit={"exit"}
          >
            E
          </HeaderTitle>
        </AnimatePresence>
      </Header>
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
        <GameBox onClick={onMatchClick}>
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
  background-color: #141414;
  padding: 8%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

const Header = styled.div`
  display: flex;
  margin-top: 6.25rem;
`;

const HeaderTitle = styled(motion.h2)`
  color: white;
  font-size: 1.5rem;
  font-weight: 500;
  margin: 0 0.625rem;
`;

const Board = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 19.75rem);
  justify-content: center;
  width: 100%;
  height: 100%;
  margin-top: 6.25rem;
  @media screen and (max-width: 899px) {
    display: grid;
    grid-template-columns: repeat(2, 19.75rem);
    height: 50%;
  }
`;

const GameBox = styled(motion.div)`
  background-color: #202020;
  width: 18.75rem;
  height: 18.75rem;
  margin: 0.5rem 0.3125rem;
  border-radius: 0.625rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
  padding: 2.5rem 3.125rem;
  cursor: pointer;
  &:hover {
    background-color: rgba(45, 45, 45, 0.15);
  }
`;

const Icon = styled(motion.div)`
  margin-bottom: 0.9375rem;
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
  border: 0.125rem solid rgba(255, 255, 255, 0.6);
  margin: 0.3125rem;
  width: 3.125rem;
  height: 3.125rem;
  border-radius: 0.625rem;
  font-weight: 500;
  font-size: 1rem;
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

const header1Var = {
  initial: { y: 0 },
  animate: { y: -20, transition: { duration: 0.1, delay: 0.2 } },
  exit: { y: 0, transition: { duration: 0.1, delay: 0.2 } },
};

const header2Var = {
  initial: { y: 0 },
  animate: { y: -20, transition: { duration: 0.1, delay: 0.3 } },
  exit: { y: 0, transition: { duration: 0.1, delay: 0.3 } },
};

const header3Var = {
  initial: { y: 0 },
  animate: { y: -20, transition: { duration: 0.1, delay: 0.4 } },
  exit: { y: 0, transition: { duration: 0.1, delay: 0.4 } },
};
const header4Var = {
  initial: { y: 0 },
  animate: { y: -20, transition: { duration: 0.1, delay: 0.5 } },
  exit: { y: 0, transition: { duration: 0.1, delay: 0.5 } },
};
const header5Var = {
  initial: { y: 0 },
  animate: { y: -20, transition: { duration: 0.1, delay: 0.6 } },
  exit: { y: 0, transition: { duration: 0.1, delay: 0.6 } },
};
const header6Var = {
  initial: { y: 0 },
  animate: { y: -20, transition: { duration: 0.1, delay: 0.7 } },
  exit: { y: 0, transition: { duration: 0.1, delay: 0.7 } },
};
const header7Var = {
  initial: { y: 0 },
  animate: { y: -20, transition: { duration: 0.1, delay: 0.8 } },
  exit: { y: 0, transition: { duration: 0.1, delay: 0.8 } },
};
const header8Var = {
  initial: { y: 0 },
  animate: { y: -20, transition: { duration: 0.1, delay: 0.9 } },
  exit: { y: 0, transition: { duration: 0.1, delay: 0.9 } },
};
const header9Var = {
  initial: { y: 0 },
  animate: { y: -20, transition: { duration: 0.1, delay: 1 } },
  exit: { y: 0, transition: { duration: 0.1, delay: 1 } },
};
const header10Var = {
  initial: { y: 0 },
  animate: { y: -20, transition: { duration: 0.1, delay: 1.1 } },
  exit: { y: 0, transition: { duration: 0.1, delay: 1.1 } },
};
const header11Var = {
  initial: { y: 0 },
  animate: { y: -20, transition: { duration: 0.1, delay: 1.2 } },
  exit: { y: 0, transition: { duration: 0.1, delay: 1.2 } },
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
