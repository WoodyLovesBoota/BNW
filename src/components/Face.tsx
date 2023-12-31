import styled from "styled-components";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import HeaderBar from "./HeaderBar";
import Sheep from "./Sheep";
import { useNavigate } from "react-router-dom";

const Face = () => {
  const [count, setCount] = useState(1);
  const [counter, setCounter] = useState(1);

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
    const timer = setInterval(() => {
      setCount(count + 1);
    }, 3000);
    return () => clearInterval(timer);
  }, [count]);

  useEffect(() => {
    const timer3 = setInterval(() => {
      setCounter(counter + 1);
    }, 2500);
    return () => clearInterval(timer3);
  }, [counter]);

  return (
    <Wrapper>
      <HeaderBar />
      <Sheep />
      <Games>
        <Header>
          <HeaderTitle>
            MINI GAME
            <br />
            <span>BY YANG</span>
          </HeaderTitle>
          <HeaderSubtitle>
            양태욱이 만든 다양한 종류의 미니게임이 당신을 기다리고 있어요.
          </HeaderSubtitle>
        </Header>
        <Board>
          <GameBox variants={hoverVar} whileHover={"hover"} onClick={onFourtyNineClick}>
            <Icon>
              <AnimatePresence mode="wait">
                <NumberRow key={"Row" + count}>
                  <NumberBox
                    key={"four" + count + 100}
                    variants={number3Var}
                    animate="animate"
                    exit={"exit"}
                  />
                  <NumberBox
                    key={"four" + count + 200}
                    variants={number2Var}
                    animate="animate"
                    exit={"exit"}
                  />
                </NumberRow>
                <NumberRow key={"Row" + count + 10}>
                  <NumberBox
                    key={"four" + count}
                    variants={number1Var}
                    initial="initial"
                    animate="animate"
                    exit={"exit"}
                  />
                  <NumberBox
                    key={"four" + count + 4}
                    variants={number4Var}
                    initial="initial"
                    animate="animate"
                    exit={"exit"}
                  />
                </NumberRow>
              </AnimatePresence>
            </Icon>
            <Title>25</Title>
            <Description>1부터 25까지 가능한 빠르게 클릭해주세요.</Description>
          </GameBox>
          <GameBox variants={hoverVar} whileHover={"hover"} onClick={onOmokClick}>
            <Icon>
              <AnimatePresence mode="wait">
                <BoardRow key={"Row" + count + 11}>
                  <BoardCell>
                    <Vertical />
                    <Horizen />
                    <White
                      key={count + 100}
                      variants={whiteVar}
                      initial="initial"
                      animate="animate"
                      exit={"exit"}
                    />
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
                    <Black
                      key={count + 5}
                      variants={blackVar}
                      initial="initial"
                      animate="animate"
                      exit={"exit"}
                    />
                  </BoardCell>
                </BoardRow>
              </AnimatePresence>
            </Icon>
            <Title>Omok</Title>
            <Description>5개의 돌을 이어서 놓으세요.</Description>
          </GameBox>
          <GameBox variants={hoverVar} whileHover={"hover"} onClick={onMatchClick}>
            <Icon>
              <AnimatePresence>
                <NumberRow key={"numberrow"}>
                  <MatchBox
                    key={"card" + count + 17}
                    variants={matchColorVar}
                    initial="boxInitial"
                    animate="boxAnimate"
                    exit={"boxExit"}
                  >
                    <MatchNum
                      key={"card" + count + 200}
                      variants={matchVar}
                      initial="initial"
                      animate="animate"
                      exit={"exit"}
                    />
                  </MatchBox>
                  <MatchBox />
                </NumberRow>
                <NumberRow key={"numberrow1"}>
                  <MatchBox />
                  <MatchBox
                    key={"card" + count + 6}
                    variants={matchColorVar}
                    initial="boxInitial"
                    animate="boxAnimate"
                    exit={"boxExit"}
                  >
                    <MatchNum
                      key={"card" + count + 44}
                      variants={matchSecVar}
                      initial="initial"
                      animate="animate"
                      exit={"exit"}
                    />
                  </MatchBox>
                </NumberRow>
              </AnimatePresence>
            </Icon>
            <Title>Card</Title>
            <Description>같은 모양의 카드를 찾아주세요.</Description>
          </GameBox>
          <GameBox variants={hoverVar} whileHover={"hover"} onClick={onMineClick}>
            <Icon>
              <AnimatePresence>
                <MineRow key={"numberrow2"}>
                  <MineBox>2</MineBox>
                  <MineBox>
                    <Bomb
                      key={count + 100}
                      variants={whiteVar}
                      initial="initial"
                      animate="animate"
                      exit={"exit"}
                    />
                  </MineBox>
                </MineRow>
                <MineRow key={"numberrow3"}>
                  <MineBox>
                    <FlagIcon
                      key={count + 100}
                      variants={blackVar}
                      initial="initial"
                      animate="animate"
                      exit={"exit"}
                    />
                  </MineBox>
                  <MineBox />
                </MineRow>
              </AnimatePresence>
            </Icon>
            <Title>Mine Sweeper</Title>
            <Description>숨겨진 지뢰를 모두 찾아내어 승리하세요.</Description>
          </GameBox>
          <GameBox variants={hoverVar} whileHover={"hover"} onClick={onWordleClick}>
            <Icon>
              <AnimatePresence>
                <NumberRow key={"numberrow"}>
                  <WordBox
                    key={count + 7}
                    variants={wordColorVar}
                    initial="boxInitial"
                    animate="boxAnimate"
                    exit={"boxExit"}
                  >
                    <WordNum
                      key={count + 200}
                      variants={word1Var}
                      initial="initial"
                      animate="animate"
                      exit={"exit"}
                    >
                      J
                    </WordNum>
                  </WordBox>
                  <WordBox
                    key={count + 16}
                    variants={wordGColorVar}
                    initial="boxInitial"
                    animate="boxAnimate"
                    exit={"boxExit"}
                  >
                    <WordNum
                      key={count + 214}
                      variants={word2Var}
                      initial="initial"
                      animate="animate"
                      exit={"exit"}
                    >
                      O
                    </WordNum>
                  </WordBox>
                  <WordBox
                    key={count + 26}
                    variants={wordColorVar}
                    initial="boxInitial"
                    animate="boxAnimate"
                    exit={"boxExit"}
                  >
                    <WordNum
                      key={count + 234}
                      variants={word3Var}
                      initial="initial"
                      animate="animate"
                      exit={"exit"}
                    >
                      Y
                    </WordNum>
                  </WordBox>
                </NumberRow>
              </AnimatePresence>
            </Icon>
            <Title>Wordle</Title>
            <Description>단어를 맞춰주세요.</Description>
          </GameBox>
        </Board>
      </Games>
      <Star>
        <IconSVG xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 1638">
          <AnimatePresence mode="wait">
            <motion.path
              key={counter}
              variants={path}
              initial="start"
              animate="end"
              exit="exit"
              d="M361.686 1496.92L602.235 1015.65L315.478 1135.16L551.989 893.893L-34.0172 727.926L628.568 676.629L487.028 118.878L919.994 351.663L1420.91 -352.713L1299.23 289.422L2090.1 -68.4037L1497.02 631.995L2020.92 646.655L1443.12 819.08L1800.98 1116.02L1155 829.458L1260.53 1219.35L1071.44 1002.47L898.592 1637.02L831.029 1101.91L361.686 1496.92Z 110.765 1387.53L432.472 956.265L129.125 1023.29L404.503 827.549L-143.016 560.77L518.223 627.21L477.336 53.2344L862.425 358.776L1479.79 -246.143L1246.69 364.438L2088.29 151.801L1380.92 736.54L1894.01 843.428L1294.85 911.177L1594.69 1266.61L1009.42 870.545L1044.49 1272.94L896.641 1026.1L614.52 1620.18L642.452 1081.55L110.765 1387.53Z"
              stroke="#D9FF00"
              strokeWidth="5px"
              fill={"transparent"}
            />
          </AnimatePresence>
        </IconSVG>
      </Star>
    </Wrapper>
  );
};

export default Face;

const Wrapper = styled.div`
  cursor: url("/cursor.png") 10 10, auto;
  width: 100%;
  overflow-x: hidden;
`;

const Star = styled.div`
  overflow: hidden;
  max-width: 100%;
`;

const IconSVG = styled(motion.svg)`
  position: absolute;
  top: -100px;

  @media screen and (max-width: 796px) {
    display: none;
  }
`;

const Games = styled.div`
  width: 100vw;
  background-color: transparent;
  position: absolute;
  z-index: 2;
  padding: 170px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media screen and (max-width: 796px) {
    padding: 92px 0;
  }
`;

const Header = styled.div`
  width: 1088px;
  @media screen and (max-width: 1212px) {
    width: 710px;
  }
  @media screen and (max-width: 796px) {
    width: 341px;
  }
`;

const HeaderTitle = styled.h2`
  font-family: "Upheaval TT (BRK)";
  font-size: 120px;
  line-height: 100px;
  text-shadow: 0px 8px 0px rgba(0, 0, 0, 0.25);

  @media screen and (max-width: 796px) {
    font-size: 100px;
    line-height: 64px;
  }
  & span {
    font-family: "Upheaval TT (BRK)";
    font-size: 120px;
    text-shadow: 0px 8px 0px rgba(0, 0, 0, 0.25);

    @media screen and (max-width: 796px) {
      font-size: 40px;
      text-shadow: 0px 3px 0px rgba(0, 0, 0, 0.25);
    }
  }
`;

const HeaderSubtitle = styled.h2`
  margin-top: 50px;
  font-size: 20px;
  line-height: 1.6;
  @media screen and (max-width: 796px) {
    font-size: 16px;
    line-height: 1.5;
    margin-top: 30px;
  }
`;

const Board = styled.div`
  display: grid;
  justify-content: center;
  grid-template-columns: repeat(3, 337px);
  width: 100%;
  height: 100%;
  margin-top: 100px;
  grid-gap: 36px;
  @media screen and (max-width: 1212px) {
    grid-template-columns: repeat(2, 337px);
  }
  @media screen and (max-width: 796px) {
    grid-template-columns: repeat(1, 337px);
    margin-top: 60px;
  }
`;

const GameBox = styled(motion.div)`
  background-color: white;
  width: 337px;
  height: 517px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  color: white;
  padding: 8px;
  padding-bottom: 24px;
  box-shadow: 4px 4px 0px 0px rgba(0, 0, 0, 0.1);
`;

const Icon = styled(motion.div)`
  height: 337px;
  width: 100%;
  border-radius: 8px;
  background-color: ${(props) => props.theme.accent};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 72px 74px;
  box-shadow: 4px 4px 0px 0px rgba(0, 0, 0, 0.1) inset;
`;

const NumberRow = styled(motion.div)`
  display: flex;
`;

const NumberBox = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 110px;
  height: 110px;
  margin: 5px;
  border-radius: 8px;
  background-color: white;
`;

const Title = styled.h2`
  font-weight: 400;
  font-family: "Upheaval TT (BRK)";
  padding: 20px 28px;
  font-size: 36px;
`;

const Description = styled.h2`
  font-size: 16px;
  font-weight: 400;
  padding: 0 26px;
  padding-bottom: 20px;
  line-height: 1.5;
`;

const BoardRow = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const BoardCell = styled.div`
  width: 110px;
  height: 110px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Vertical = styled.div`
  width: 5px;
  height: 100%;
  position: absolute;
  left: 50%;
  z-index: 1;
  background-color: white;
`;

const Horizen = styled.div`
  width: 100%;
  height: 5px;
  position: absolute;
  top: 50%;
  z-index: 1;
  background-color: white;
`;

const White = styled(motion.div)`
  background-color: ${(props) => props.theme.blue};
  width: 84px;
  height: 84px;
  border-radius: 100px;
  z-index: 2;
`;

const Black = styled(motion.div)`
  background-color: ${(props) => props.theme.red};
  width: 84px;
  height: 84px;
  border-radius: 100px;
  z-index: 2;
`;

const MatchBox = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 5px;
  width: 110px;
  height: 110px;
  border-radius: 8px;
  background-color: white;
`;

const WordBox = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 5px;
  width: 90px;
  height: 90px;
  border-radius: 8px;
`;

const MatchNum = styled(motion.h2)`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  background-color: ${(props) => props.theme.white};
`;

const WordNum = styled(motion.h2)`
  font-weight: 900;
  font-size: 24px;
  border-radius: 8px;
`;

const MineRow = styled(motion.div)`
  display: flex;
  border-left: 5px solid white;
  &:last-child {
    border-bottom: 5px solid white;
  }
`;

const MineBox = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #262626;
  border-top: 5px solid white;
  border-right: 5px solid white;
  height: 110px;
  width: 110px;
  font-size: 36px;
  font-weight: 700;
  font-family: "Upheaval TT (BRK)";
`;

const Bomb = styled(motion.div)`
  background-image: url("./minemain.png");
  background-position: center center;
  background-size: cover;
  width: 48px;
  height: 48px;
`;

const FlagIcon = styled(motion.span)`
  background-image: url("./flagmain.png");
  background-position: center center;
  background-size: cover;
  width: 48px;
  height: 48px;
`;

const number1Var = {
  initial: { opacity: 1 },
  animate: { opacity: 0, transition: { duration: 0.3, delay: 0.3 } },
  exit: { opacity: 1, transition: { duration: 0.3, delay: 2 } },
};

const number2Var = {
  initial: { opacity: 1 },
  animate: { opacity: 0, transition: { duration: 0.3, delay: 0.6 } },
  exit: { opacity: 1, transition: { duration: 0.3, delay: 2 } },
};

const number3Var = {
  initial: { opacity: 1 },
  animate: { opacity: 0, transition: { duration: 0.3, delay: 0.9 } },
  exit: { opacity: 1, transition: { duration: 0.3, delay: 2 } },
};

const number4Var = {
  initial: { opacity: 1 },
  animate: { opacity: 0, transition: { duration: 0.3, delay: 1.2 } },
  exit: { opacity: 1, transition: { duration: 0.3, delay: 2 } },
};

const blackVar = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.3, delay: 0.5 } },
  exit: { opacity: 0, transition: { duration: 0.3, delay: 1 } },
};

const whiteVar = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.3, delay: 1 } },
  exit: { opacity: 0, transition: { duration: 0.3, delay: 1 } },
};

const matchVar = {
  initial: { opacity: 1, backgroundColor: "#ffffff" },
  animate: { opacity: 0, backgroundColor: "#ffffff", transition: { duration: 0.2, delay: 0.5 } },
  exit: { opacity: 0, transition: { duration: 0.2, delay: 2 } },
};

const matchSecVar = {
  initial: { opacity: 1, backgroundColor: "#ffffff" },
  animate: { opacity: 0, backgroundColor: "#ffffff", transition: { duration: 0.2, delay: 1 } },
  exit: { opacity: 0, transition: { duration: 0.2, delay: 2 } },
};

const matchColorVar = {
  boxInitial: { backgroundColor: "#e6e6e6" },
  boxAnimate: { backgroundColor: "#d9ff00", transition: { duration: 0.2, delay: 1.5 } },
  boxExit: { backgroundColor: "#d9ff00", transition: { duration: 0.2, delay: 2 } },
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
  boxInitial: { backgroundColor: "#ffffff" },
  boxAnimate: {
    backgroundColor: "#ff7b7b",
    borderColor: "#ff7b7b",
    transition: { duration: 0.2, delay: 2 },
  },
  boxExit: { backgroundColor: "#ffffff", transition: { duration: 0.2, delay: 2 } },
};

const wordGColorVar = {
  boxInitial: { backgroundColor: "#ffffff" },
  boxAnimate: {
    backgroundColor: "#00e0ff",
    borderColor: "#00e0ff",
    transition: { duration: 0.2, delay: 2 },
  },
  boxExit: { backgroundColor: "#ffffff", transition: { duration: 0.2, delay: 2 } },
};

const path = {
  start: { pathLength: 0 },
  end: {
    pathLength: 1,
    transition: { duration: 2.5 },
  },
  exit: { pathLength: 0, transition: { duration: 2.5 } },
};

const hoverVar = {
  initial: { y: 0 },
  hover: { y: -16, boxShadow: "12px 16px 0 0 rgba(0,0,0,0.1)" },
};
