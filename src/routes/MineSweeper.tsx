import { motion } from "framer-motion";
import { MouseEvent, useEffect, useState } from "react";
import { styled, keyframes } from "styled-components";
import { useNavigate } from "react-router-dom";
import { ReactComponent as HomeIcon } from "../assets/home.svg";
import { ReactComponent as RestartIcon } from "../assets/restart.svg";

const MineSweeper = () => {
  const [row, setRow] = useState(9);
  const [col, setCol] = useState(9);
  const [mine, setMine] = useState(10);

  const [rowFrame, setRowFrame] = useState<number[]>([]);
  const [colFrame, setColFrame] = useState<number[]>([]);

  const [mineInfo, setMineInfo] = useState<{ row: number; col: number }[]>([]);
  const [info, setInfo] = useState<[][]>([[]]);

  const [opened, setOpened] = useState<{ row: number; col: number }[]>([]);
  const [flag, setFlag] = useState<{ row: number; col: number }[]>([]);

  const [isFinish, setIsFinish] = useState(false);
  const [isWin, setIsWin] = useState(false);
  const [isHover, setIsHover] = useState(false);

  const [isRestart, setIsRestart] = useState(false);

  const navigate = useNavigate();

  const findBlank = async (rowA: number, colA: number, his: number[][]) => {
    let temp = [
      [rowA + 1, colA + 1],
      [rowA + 1, colA - 1],
      [rowA - 1, colA + 1],
      [rowA - 1, colA - 1],
      [rowA - 1, colA],
      [rowA, colA - 1],
      [rowA, colA + 1],
      [rowA + 1, colA],
    ];
    his.push([rowA, colA]);

    for (let i = 0; i < temp.length; i++) {
      let [nRow, nCol] = temp[i];
      if (his.some((e) => e[0] === nRow && e[1] === nCol)) {
      } else {
        if (
          !mineInfo.some((e) => e.row === nRow && e.col === nCol) &&
          !opened.some((e) => e.row === nRow && e.col === nCol)
        ) {
          if (nRow > 0 && nCol > 0 && nRow < row + 1 && nCol < col + 1) {
            if (info[nRow - 1][nCol - 1] !== 0) {
              setOpened((prev) => [...prev, { row: nRow, col: nCol }]);
            } else {
              setOpened((prev) => [...prev, { row: nRow, col: nCol }]);
              findBlank(nRow, nCol, his);
            }
          }
        }
      }
    }
  };

  const onBeginnerClick = () => {
    setRow(9);
    setCol(9);
    setMine(10);
    setIsFinish(false);
    setIsWin(false);
    setOpened([]);
    setFlag([]);
    setIsRestart((prev) => !prev);
  };

  const onInterClick = () => {
    setRow(16);
    setCol(16);
    setMine(40);
    setIsFinish(false);
    setIsWin(false);
    setOpened([]);
    setFlag([]);
    setIsRestart((prev) => !prev);
  };

  const onAdvClick = () => {
    setRow(16);
    setCol(30);
    setMine(99);
    setIsFinish(false);
    setIsWin(false);
    setOpened([]);
    setFlag([]);
    setIsRestart((prev) => !prev);
  };

  const onRestartClick = () => {
    setIsFinish(false);
    setIsWin(false);
    setOpened([]);
    setFlag([]);
    setIsRestart((prev) => !prev);
    navigate("/mine");
  };

  const onHomeClick = () => {
    setIsFinish(false);
    setIsWin(false);
    setOpened([]);
    setFlag([]);
    setIsRestart((prev) => !prev);
    navigate("/");
  };

  const onCoverClick = (row: number, col: number) => {
    for (let e of flag) {
      if (!mineInfo.some((ele) => ele.row === e.row && ele.col === e.col)) {
        setIsFinish(true);
        setIsWin(false);
        mineInfo.forEach((e) => setOpened((prev) => [...prev, { row: e.row, col: e.col }]));
      }
    }
    setOpened((prev) => [...prev, { row: row, col: col }]);
    if (mineInfo.some((e) => e.row === row && e.col === col)) {
      setIsFinish(true);
      setIsWin(false);
    } else if (info[row - 1][col - 1] !== 0) {
    } else {
      findBlank(row, col, [[0, 0]]);
    }
  };

  const onCoverRightClick = (row: number, col: number, event: MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    setFlag((prev) => [...prev, { row: row, col: col }]);
  };

  const onFlagRightClick = (row: number, col: number, event: MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    let index = flag.findIndex((e, i) => {
      return e.row === row && e.col === col;
    });
    setFlag((prev) => [...prev.slice(0, index), ...prev.slice(index + 1)]);
  };

  const onNumberClick = (rowA: number, colA: number) => {
    for (let e of flag) {
      if (!mineInfo.some((ele) => ele.row === e.row && ele.col === e.col)) {
        setIsFinish(true);
        setIsWin(false);
        mineInfo.forEach((e) => setOpened((prev) => [...prev, { row: e.row, col: e.col }]));
      }
    }
    let target = info[rowA - 1][colA - 1];
    let flagNum = 0;
    for (let e of flag) {
      if (e.row + 1 === rowA && e.col === colA) flagNum++;
      else if (e.row + 1 === rowA && e.col + 1 === colA) flagNum++;
      else if (e.row + 1 === rowA && e.col - 1 === colA) flagNum++;
      else if (e.row === rowA && e.col + 1 === colA) flagNum++;
      else if (e.row === rowA && e.col - 1 === colA) flagNum++;
      else if (e.row - 1 === rowA && e.col + 1 === colA) flagNum++;
      else if (e.row - 1 === rowA && e.col === colA) flagNum++;
      else if (e.row - 1 === rowA && e.col - 1 === colA) flagNum++;
    }
    if (target === flagNum) {
      findBlank(rowA, colA, [[0, 0]]);
    }
  };

  useEffect(() => {
    setRowFrame([]);
    setColFrame([]);
    for (let i = 1; i <= row; i++) {
      setRowFrame((prev) => [...prev, i]);
    }
    for (let i = 1; i <= col; i++) {
      setColFrame((prev) => [...prev, i]);
    }
  }, [row, col]);

  useEffect(() => {
    let temp = [];
    for (let i = 1; i <= row * col; i++) temp.push(i);
    temp.sort(() => Math.random() - 0.5);
    let target = temp.slice(0, mine).map((e) => {
      return { row: Math.floor((e - 1) / col) + 1, col: e - Math.floor((e - 1) / col) * col };
    });
    setMineInfo(target);
  }, [mine, isRestart]);

  useEffect(() => {
    let infoTemp = new Array(row);
    for (let i = 0; i < row; i++) {
      infoTemp[i] = new Array(col);
    }
    for (let i = 0; i < row; i++) {
      for (let j = 0; j < col; j++) {
        let cnt = 0;
        if (mineInfo.some((e) => e.row === i + 1 && e.col === j)) cnt++;
        if (mineInfo.some((e) => e.row === i + 1 && e.col === j + 2)) cnt++;
        if (mineInfo.some((e) => e.row === i + 2 && e.col === j)) cnt++;
        if (mineInfo.some((e) => e.row === i + 2 && e.col === j + 1)) cnt++;
        if (mineInfo.some((e) => e.row === i + 2 && e.col === j + 2)) cnt++;
        if (mineInfo.some((e) => e.row === i && e.col === j)) cnt++;
        if (mineInfo.some((e) => e.row === i && e.col === j + 1)) cnt++;
        if (mineInfo.some((e) => e.row === i && e.col === j + 2)) cnt++;
        infoTemp[i][j] = cnt;
      }
    }
    setInfo(infoTemp);
  }, [mineInfo]);

  useEffect(() => {
    let unique: { row: number; col: number }[] = [];
    opened.forEach((e) => {
      if (!unique.some((ele) => e.row === ele.row && e.col === ele.col)) {
        unique.push(e);
      }
    });
    if (unique.length === row * col - mine) {
      setIsFinish(true);
      setIsWin(true);
    }
  }, [opened]);

  return (
    <Wrapper>
      {isFinish ? (
        <Result>
          <ResultTitle>{isWin ? "You Win :)" : "You Lose :("}</ResultTitle>
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

      <Board mine={mine}>
        <Header>
          <Icons>
            <Icon onClick={onHomeClick}>HOME</Icon>
            <IconRight>
              <Icon onClick={onRestartClick}>RESTART</Icon>
              <Icon
                onMouseEnter={() => {
                  setIsHover(true);
                }}
                onMouseLeave={() => {
                  setIsHover(false);
                }}
              >
                ?
              </Icon>
            </IconRight>
            {isHover && (
              <Information>
                <InfoBox>
                  <InfoRow>
                    <Box />
                    <InfoContent>Mouse Left Click</InfoContent>
                  </InfoRow>
                  <InfoRow>
                    <FlagBox>
                      <FlagIcon />
                    </FlagBox>
                    <InfoContent>Mouse Right Click</InfoContent>
                  </InfoRow>
                </InfoBox>
              </Information>
            )}
          </Icons>
          <Buttons>
            <Button isnow={mine === 10} onClick={onBeginnerClick}>
              EASY
            </Button>
            <Button isnow={mine === 40} onClick={onInterClick}>
              MEDIUM
            </Button>
            <Button isnow={mine === 99} onClick={onAdvClick}>
              HARD
            </Button>
            <FlagInfo>
              <FlagSvg />
              <FlagNum>
                <FlagCurrent>{flag.length}</FlagCurrent>
                <Divider>/</Divider>
                <FlagTotal>{mine}</FlagTotal>
              </FlagNum>
            </FlagInfo>
          </Buttons>
        </Header>
        {rowFrame.map((row) => (
          <Row key={row}>
            {colFrame.map((col) =>
              opened.some((e) => e.row === row && e.col === col) ? (
                mineInfo.some((e) => e.row === row && e.col === col) ? (
                  <BombBox key={col + "mine"}>
                    <Bomb></Bomb>
                  </BombBox>
                ) : info[row - 1][col - 1] !== 0 ? (
                  <Box
                    key={String(col) + String(row) + "number"}
                    onClick={() => {
                      onNumberClick(row, col);
                    }}
                  >
                    {info[row - 1][col - 1]}
                  </Box>
                ) : (
                  <Box key={String(col) + String(row) + "blank"}></Box>
                )
              ) : flag.some((e) => e.row === row && e.col === col) ? (
                <Flag
                  key={col + "flag"}
                  onContextMenu={(event) => {
                    onFlagRightClick(row, col, event);
                  }}
                >
                  <FlagIcon></FlagIcon>
                </Flag>
              ) : (
                <Cover
                  key={String(col) + String(row) + "cover"}
                  onClick={() => {
                    onCoverClick(row, col);
                  }}
                  onContextMenu={(event) => {
                    onCoverRightClick(row, col, event);
                  }}
                />
              )
            )}
          </Row>
        ))}
      </Board>
    </Wrapper>
  );
};

export default MineSweeper;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-use-select: none;
  user-select: none;
`;

const Board = styled.div<{ mine: number }>`
  width: ${(props) => (props.mine === 10 ? "18rem" : props.mine === 40 ? "32rem" : "60rem")};
  display: flex;
  flex-direction: column;
  padding: 40px 0;
  overflow-x: auto;
`;

const Row = styled.div`
  width: 100%;
  height: 2rem;
  display: flex;
`;

const Box = styled(motion.div)`
  width: 2rem;
  height: 2rem;
  font-size: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${(props) => props.theme.bg};
  box-shadow: 2px 2px 0px 0px rgba(0, 0, 0, 0.25) inset;
  cursor: default;
  font-family: "Upheaval TT (BRK)";
`;

const BombBox = styled(motion.div)`
  width: 2rem;
  height: 100%;
  font-size: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${(props) => props.theme.red};
  box-shadow: 2px 2px 0px 0px rgba(0, 0, 0, 0.25) inset;
  cursor: default;
  font-family: "Upheaval TT (BRK)";
`;

const Flag = styled(motion.div)`
  width: 2rem;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  box-shadow: -2px -2px 0px 0px rgba(0, 0, 0, 0.25) inset;
  cursor: default;
`;

const Cover = styled(motion.div)`
  width: 2rem;
  height: 100%;
  background-color: white;
  box-shadow: -2px -2px 0px 0px rgba(0, 0, 0, 0.25) inset;
  cursor: default;
  &:hover {
    background: ${(props) => props.theme.white};
  }
  &:active {
    background: #d9d9d9;
    box-shadow: 2px 2px 0px 0px rgba(0, 0, 0, 0.25) inset;
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

const Header = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Icons = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
  margin-bottom: 54px;
  position: relative;
`;

const IconRight = styled.div`
  margin-left: auto;
  display: flex;
`;

const Icon = styled.span`
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
  position: relative;
  &:last-child {
    margin-left: 16px;
  }
  &:hover {
    background: ${(props) => props.theme.white};
  }
  &:active {
    background-color: #00000011;
    box-shadow: 3px 3px 0px 0px rgba(0, 0, 0, 0.25) inset;
  }
`;

const Buttons = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const Button = styled.button<{ isnow: boolean }>`
  border: none;
  padding: 11px 8px 7px 8px;
  font-size: 14px;
  border-radius: 10px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => (props.isnow ? props.theme.accent : "transparent")};
  box-shadow: ${(props) => props.isnow && "2px 3px 0px 0px rgba(0, 0, 0, 0.25) inset"};

  &:hover {
    background-color: ${(props) => (props.isnow ? props.theme.accent : props.theme.bg)};
    box-shadow: 2px 3px 0px 0px rgba(0, 0, 0, 0.25) inset;
  }
`;

const FlagInfo = styled.div`
  margin-left: auto;
  display: flex;
  align-items: center;
`;

const FlagSvg = styled.div`
  background-image: url("./flag.png");
  background-position: center center;
  background-size: cover;
  width: 24px;
  height: 24px;
  margin-right: 6px;
  margin-bottom: 5px;
`;

const FlagNum = styled.div`
  display: flex;
`;

const FlagCurrent = styled.h2`
  font-size: 14px;
`;

const FlagTotal = styled.h2`
  font-size: 14px;
`;

const Divider = styled.h2`
  font-size: 14px;
`;

const Bomb = styled.span`
  background-image: url("./mine.png");
  background-position: center center;
  background-size: cover;
  width: 1.5rem;
  height: 1.5rem;
`;

const FlagIcon = styled.div`
  background-image: url("./flag.png");
  background-position: center center;
  background-size: cover;
  width: 1.5rem;
  height: 1.5rem;
`;

const Information = styled.div`
  position: absolute;
  background: ${(props) => props.theme.white};
  border-radius: 5px;
  right: 0;
  top: 50px;
  &::after {
    content: "";
    position: absolute;
    top: 0;
    right: 7px;
    width: 0;
    height: 0;
    border: 10px solid transparent;
    border-bottom-color: ${(props) => props.theme.white};
    border-top: 0;
    margin-left: -7px;
    margin-top: -7px;
  }
`;

const InfoBox = styled.div`
  padding: 16px;
  box-shadow: 0px 3px 0px 0px rgba(0, 0, 0, 0.25);
  border-radius: 8px;
`;

const FlagBox = styled.div`
  width: 32px;
  height: 32px;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const InfoRow = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  margin-bottom: 22px;
  &:last-child {
    margin-bottom: 0;
  }
`;

const InfoContent = styled.h2`
  font-size: 14px;
  margin-left: 12px;
`;
