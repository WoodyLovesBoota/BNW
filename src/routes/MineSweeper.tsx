import { motion } from "framer-motion";
import { MouseEvent, MouseEventHandler, useEffect, useState } from "react";
import { styled, keyframes } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRotateRight, faHouse, faCertificate, faFlag } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const MineSweeper = () => {
  const [row, setRow] = useState(16);
  const [col, setCol] = useState(30);
  const [mine, setMine] = useState(10);

  const [rowFrame, setRowFrame] = useState<number[]>([]);
  const [colFrame, setColFrame] = useState<number[]>([]);

  const [mineInfo, setMineInfo] = useState<{ row: number; col: number }[]>([]);
  const [info, setInfo] = useState<[][]>([[]]);

  const [opened, setOpened] = useState<{ row: number; col: number }[]>([]);
  const [flag, setFlag] = useState<{ row: number; col: number }[]>([]);

  const [isFinish, setIsFinish] = useState(false);
  const [isWin, setIsWin] = useState(false);

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
    setOpened((prev) => [...prev, { row: row, col: col }]);
    if (mineInfo.some((e) => e.row === row && e.col === col)) {
      setIsFinish(true);
      setIsWin(false);
    } else if (info[row - 1][col - 1] !== 0) {
    } else {
      findBlank(row, col, [[0, 0]]);
    }
    if (opened.length === row * col - mine) {
      setIsFinish(true);
      setIsWin(true);
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
          <ResultTitle>{isWin ? "WIN" : "LOSE"}</ResultTitle>
          <ResultIcon onClick={onRestartClick}>
            <FontAwesomeIcon icon={faArrowRotateRight} />
          </ResultIcon>
        </Result>
      ) : null}

      <Board>
        <Header>
          <Buttons>
            <Button onClick={onBeginnerClick}>초급</Button>
            <Button onClick={onInterClick}>중급</Button>
            <Button onClick={onAdvClick}>고급</Button>
          </Buttons>
          <Icons>
            <Icon onClick={onHomeClick}>
              <FontAwesomeIcon icon={faHouse} />
            </Icon>
            <Icon onClick={onRestartClick}>
              <FontAwesomeIcon icon={faArrowRotateRight} />
            </Icon>
          </Icons>
        </Header>
        {rowFrame.map((row) => (
          <Row key={row}>
            {colFrame.map((col) =>
              opened.some((e) => e.row === row && e.col === col) ? (
                mineInfo.some((e) => e.row === row && e.col === col) ? (
                  <Box key={col + "mine"}>
                    <Bomb>
                      <FontAwesomeIcon icon={faCertificate} />
                    </Bomb>
                  </Box>
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
                  <FlagIcon>
                    <FontAwesomeIcon icon={faFlag} />
                  </FlagIcon>
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
  justify-content: center;
  padding: 3%;
  height: 100vh;
  background-color: #141414;
  color: white;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-use-select: none;
  user-select: none;
`;

const Board = styled.div``;

const Row = styled.div`
  width: 100%;
  height: 1.875rem;
  display: flex;
`;

const Box = styled(motion.div)`
  width: 1.875rem;
  height: 100%;
  border: 0.0625rem solid rgba(255, 255, 255, 0.3);
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: default;
`;

const Flag = styled(motion.div)`
  width: 1.875rem;
  height: 100%;
  border: 0.0625rem solid rgba(255, 255, 255, 0.3);
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #535353;
  cursor: default;
`;

const Cover = styled(motion.div)`
  width: 1.875rem;
  height: 100%;
  border: 0.0625rem solid rgba(255, 255, 255, 0.3);
  background-color: #535353;
  cursor: default;
  &:hover {
    background-color: #2b2b2b;
  }
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
  padding: 5%;
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

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.25rem;
  width: 100%;
`;

const Icons = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
`;

const Icon = styled.span`
  color: white;
  font-weight: 500;
  font-size: 1.5rem;
  margin-right: 1.25rem;
  cursor: pointer;
`;

const Buttons = styled.div`
  display: flex;
  align-items: center;
`;

const Button = styled.button`
  background-color: white;
  color: black;
  border: none;
  width: 20%;
  padding: 0.9375rem 1.25rem;
  font-size: 0.875rem;
  border-radius: 0.9375rem;
  cursor: pointer;
  margin-left: 0.9375rem;
  font-weight: 500;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background-color: rgba(255, 255, 255, 0.5);
  }
`;

const Bomb = styled.span`
  color: #ed5744;
`;

const FlagIcon = styled.span`
  color: #4a6bd6;
`;
