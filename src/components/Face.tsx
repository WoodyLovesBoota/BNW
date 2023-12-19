import styled from "styled-components";
import { ReactComponent as Vector } from "../assets/vector.svg";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import HeaderBar from "./HeaderBar";
import Lottie from "react-lottie-player";
import animationData from "../animationData.json";
import Sheep from "./Sheep";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRotateRight,
  faHouse,
  faCertificate,
  faFlag,
} from "@fortawesome/free-solid-svg-icons";

const Face = () => {
  const [count, setCount] = useState(1);
  const [counter, setCounter] = useState(1);

  useEffect(() => {
    const timer = setInterval(() => {
      setCount(count + 1);
    }, 2500);

    return () => {
      clearInterval(timer);
    };
  });

  const [currentTile, setCurrentTile] = useState([0, 0]);
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
      setCounter(counter + 1);
    }, 2500);
    return () => clearInterval(timer3);
  });

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
          <GameBox onClick={onFourtyNineClick}>
            <Icon>
              <AnimatePresence mode="wait">
                <NumberRow key={"Row" + count}>
                  <NumberBox
                    key={"four" + count + 100}
                    variants={number3Var}
                    animate="animate"
                    exit={"exit"}
                  >
                    3
                  </NumberBox>
                  <NumberBox
                    key={"four" + count + 200}
                    variants={number2Var}
                    animate="animate"
                    exit={"exit"}
                  >
                    2
                  </NumberBox>
                </NumberRow>
                <NumberRow key={"Row" + count + 10}>
                  <NumberBox
                    key={"four" + count}
                    variants={number1Var}
                    initial="initial"
                    animate="animate"
                    exit={"exit"}
                  >
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
            <Title>25</Title>
            <Description>1부터 25까지 가능한 빠르게 클릭해주세요.</Description>
          </GameBox>
          <GameBox onClick={onOmokClick}>
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
          <GameBox onClick={onMatchClick}>
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
                    >
                      3
                    </MatchNum>
                  </MatchBox>
                  <MatchBox></MatchBox>
                </NumberRow>
                <NumberRow key={"numberrow1"}>
                  <MatchBox></MatchBox>
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
                    >
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
                    <Bomb
                      key={count + 100}
                      variants={whiteVar}
                      initial="initial"
                      animate="animate"
                      exit={"exit"}
                    >
                      <FontAwesomeIcon icon={faCertificate} />
                    </Bomb>
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
                    >
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
                  <WordBox
                    key={count + 7}
                    variants={wordColorVar}
                    initial="boxInitial"
                    animate="boxAnimate"
                    exit={"boxExit"}
                  >
                    <MatchNum
                      key={count + 200}
                      variants={word1Var}
                      initial="initial"
                      animate="animate"
                      exit={"exit"}
                    >
                      B
                    </MatchNum>
                  </WordBox>
                  <WordBox
                    key={count + 16}
                    variants={wordGColorVar}
                    initial="boxInitial"
                    animate="boxAnimate"
                    exit={"boxExit"}
                  >
                    <MatchNum
                      key={count + 214}
                      variants={word2Var}
                      initial="initial"
                      animate="animate"
                      exit={"exit"}
                    >
                      N
                    </MatchNum>
                  </WordBox>
                  <WordBox
                    key={count + 26}
                    variants={wordColorVar}
                    initial="boxInitial"
                    animate="boxAnimate"
                    exit={"boxExit"}
                  >
                    <MatchNum
                      key={count + 234}
                      variants={word3Var}
                      initial="initial"
                      animate="animate"
                      exit={"exit"}
                    >
                      W
                    </MatchNum>
                  </WordBox>
                </NumberRow>
              </AnimatePresence>
            </Icon>
            <Title>Wordle</Title>
            <Description>단어를 맞춰주세요.</Description>
          </GameBox>
        </Board>
      </Games>
      <IconSVG xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 1638">
        <AnimatePresence mode="wait">
          <motion.path
            key={count}
            variants={path}
            initial="start"
            animate="end"
            exit="exit"
            d="M361.686 1496.92L602.235 1015.65L315.478 1135.16L551.989 893.893L-34.0172 727.926L628.568 676.629L487.028 118.878L919.994 351.663L1420.91 -352.713L1299.23 289.422L2090.1 -68.4037L1497.02 631.995L2020.92 646.655L1443.12 819.08L1800.98 1116.02L1155 829.458L1260.53 1219.35L1071.44 1002.47L898.592 1637.02L831.029 1101.91L361.686 1496.92Z 110.765 1387.53L432.472 956.265L129.125 1023.29L404.503 827.549L-143.016 560.77L518.223 627.21L477.336 53.2344L862.425 358.776L1479.79 -246.143L1246.69 364.438L2088.29 151.801L1380.92 736.54L1894.01 843.428L1294.85 911.177L1594.69 1266.61L1009.42 870.545L1044.49 1272.94L896.641 1026.1L614.52 1620.18L642.452 1081.55L110.765 1387.53Z"
            stroke="#D9FF00"
            strokeWidth="5"
            fill={"transparent"}
          />
        </AnimatePresence>
      </IconSVG>
    </Wrapper>
  );
};

export default Face;

const Wrapper = styled.div`
  position: relative;
  cursor: url("/cursor.png") 10 10, auto;
`;

const IconSVG = styled(motion.svg)`
  position: absolute;
  top: -6.25rem;
`;

const Games = styled.div`
  width: 100vw;
  background-color: transparent;
  padding: 270px 156px;
  position: absolute;
  z-index: 2;
  @media screen and (max-width: 1520px) {
    padding: 160px 80px;
  }

  @media screen and (max-width: 950px) {
    padding: 130px 30px;
  }
`;

const Header = styled.div``;

const HeaderTitle = styled.h2`
  font-family: "Upheaval TT (BRK)";
  font-size: 6.25rem;
  line-height: 0.8;
  & span {
    font-family: "Upheaval TT (BRK)";
    font-size: 6.25rem;
  }
  @media screen and (max-width: 900px) {
    line-height: 0.6;
    & span {
      font-size: 3.125rem;
    }
  }
`;

const HeaderSubtitle = styled.h2`
  margin-top: 4.5rem;
  font-size: 21px;
  @media screen and (max-width: 900px) {
    font-size: 16px;
  }
`;

const Board = styled.div`
  display: grid;
  justify-content: center;
  grid-template-columns: repeat(auto-fill, minmax(377px, 1fr));
  width: 100%;
  height: 100%;
  margin-top: 7.5rem;
  grid-gap: 40px;
  @media screen and (max-width: 900px) {
    grid-template-columns: repeat(auto-fill, minmax(327px, 1fr));
  }
`;

const GameBox = styled(motion.div)`
  background-color: white;
  width: 100%;
  height: 534px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  color: white;
  padding: 8px;
  &:hover {
    background-color: rgba(45, 45, 45, 0.15);
  }
  @media screen and (max-width: 900px) {
    height: 500px;
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
  @media screen and (max-width: 900px) {
    height: 327px;
  }
`;

const NumberRow = styled(motion.div)`
  display: flex;
`;

const NumberBox = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid #262626;
  width: 120px;
  margin: 10px;
  height: 120px;
  font-weight: 700;
  font-size: 24px;
  border-radius: 10px;
`;

const Title = styled.h2`
  font-weight: 400;
  font-family: "Upheaval TT (BRK)";
  padding: 20px 26px;
  font-size: 36px;
`;

const Description = styled.h2`
  font-size: 16px;
  font-weight: 400;
  padding: 0 26px;
  padding-bottom: 20px;
`;

const BoardRow = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const BoardCell = styled.div`
  width: 120px;
  height: 120px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Vertical = styled.div`
  width: 2px;
  height: 100%;
  position: absolute;
  left: 50%;
  z-index: 1;
  background-color: #262626;
`;

const Horizen = styled.div`
  width: 100%;
  height: 2px;
  position: absolute;
  top: 50%;
  z-index: 1;
  background-color: #262626;
`;

const White = styled(motion.div)`
  background-color: #87cefa;
  width: 60px;
  height: 60px;
  border-radius: 30px;
  z-index: 2;
`;

const Black = styled(motion.div)`
  background-color: #f7aea6;
  width: 60px;
  height: 60px;
  border-radius: 30px;
  z-index: 2;
`;

const MatchBox = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid #262626;
  margin: 5px;
  width: 120px;
  height: 120px;
  border-radius: 10px;
`;

const WordBox = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid #262626;
  margin: 5px;
  width: 80px;
  height: 80px;
  border-radius: 10px;
`;

const MatchNum = styled(motion.h2)`
  font-weight: 700;
  font-size: 24px;
  color: white;
`;

const MineRow = styled(motion.div)`
  display: flex;
  border-left: 2px solid #262626;
  &:last-child {
    border-bottom: 2px solid #262626;
  }
`;

const MineBox = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #262626;
  border-top: 2px solid #262626;
  border-right: 2px solid #262626;
  height: 120px;
  width: 120px;
  font-size: 24px;
  font-weight: 700;
`;

const Bomb = styled(motion.span)`
  color: #ed5744;
  font-size: 24px;
`;

const FlagIcon = styled(motion.span)`
  color: #4a6bd6;
  font-size: 24px;
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
  boxInitial: { backgroundColor: "#262626" },
  boxAnimate: { backgroundColor: "#484848", transition: { duration: 0.2, delay: 1.5 } },
  boxExit: { backgroundColor: "#262626;", transition: { duration: 0.2, delay: 2 } },
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
  boxAnimate: {
    backgroundColor: "#F7C04A",
    borderColor: "#F7C04A",
    transition: { duration: 0.2, delay: 2 },
  },
  boxExit: { backgroundColor: "#202020", transition: { duration: 0.2, delay: 2 } },
};
const wordGColorVar = {
  boxInitial: { backgroundColor: "#202020" },
  boxAnimate: {
    backgroundColor: "#539165",
    borderColor: "#539165",
    transition: { duration: 0.2, delay: 2 },
  },
  boxExit: { backgroundColor: "#202020", transition: { duration: 0.2, delay: 2 } },
};

const path = {
  start: { pathLength: 0 },
  end: {
    pathLength: 1,
    transition: { duration: 2.5 },
  },
  exit: { pathLength: 0, transition: { duration: 2.5 } },
};
