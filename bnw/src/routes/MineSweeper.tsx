import { motion } from "framer-motion";
import { MouseEvent, MouseEventHandler, useEffect, useState } from "react";
import styled from "styled-components";

const MineSweeper = () => {
  const [row, setRow] = useState(16);
  const [col, setCol] = useState(30);
  const [mine, setMine] = useState(30);

  const [rowFrame, setRowFrame] = useState<number[]>([]);
  const [colFrame, setColFrame] = useState<number[]>([]);

  const [mineInfo, setMineInfo] = useState<{ row: number; col: number }[]>([]);
  const [info, setInfo] = useState<[][]>([[]]);

  const [opened, setOpened] = useState<{ row: number; col: number }[]>([]);

  const [flag, setFlag] = useState<{ row: number; col: number }[]>([]);
  let historyArr: number[][] = [];

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

  const onCoverClick = (row: number, col: number) => {
    setOpened((prev) => [...prev, { row: row, col: col }]);
    if (mineInfo.some((e) => e.row === row && e.col === col)) {
      // game over
      console.log("lose");
    } else if (info[row - 1][col - 1] !== 0) {
      // 숫자만 열기
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

  const onNumberClick = (row: number, col: number) => {
    for (let e of flag) {
      if (!mineInfo.some((ele) => ele.row === e.row && ele.col === e.col)) {
        // 게임 종료
        console.log("lose");
      }
    }
    let target = info[row - 1][col - 1];
    let flagNum = 0;
    for (let e of flag) {
      if (e.row + 1 === row && e.col === col) flagNum++;
      else if (e.row + 1 === row && e.col + 1 === col) flagNum++;
      else if (e.row + 1 === row && e.col - 1 === col) flagNum++;
      else if (e.row === row && e.col + 1 === col) flagNum++;
      else if (e.row === row && e.col - 1 === col) flagNum++;
      else if (e.row - 1 === row && e.col + 1 === col) flagNum++;
      else if (e.row - 1 === row && e.col === col) flagNum++;
      else if (e.row - 1 === row && e.col - 1 === col) flagNum++;
    }
    if (target === flagNum) {
      // let temp = [
      //   [row + 1, col + 1],
      //   [row + 1, col - 1],
      //   [row - 1, col + 1],
      //   [row - 1, col - 1],
      //   [row - 1, col],
      //   [row, col - 1],
      //   [row, col + 1],
      //   [row + 1, col],
      // ];
      // for (let [nRow, nCol] of temp) {
      //   if (!mineInfo.some((e) => e.row === nRow && e.col === nCol)) {
      //     if (!flag.some((ele) => ele.row === nRow && ele.col === nCol)) {
      //       if (!opened.some((elem) => elem.row === nRow && elem.col === nCol)) {
      //         findBlank(nRow, nCol, [[0, 0]]);
      //       }
      //     }
      //   }
      // }
      findBlank(row, col, [[0, 0]]);
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
  }, [mine]);

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

  return (
    <Wrapper>
      <Board>
        {rowFrame.map((row) => (
          <Row key={row}>
            {colFrame.map((col) =>
              opened.some((e) => e.row === row && e.col === col) ? (
                mineInfo.some((e) => e.row === row && e.col === col) ? (
                  <Box key={col + "mine"}>X</Box>
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
                  O
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
      {/* <div>
        {mineInfo.map((e) => (
          <h2>
            {e.row} {e.col}
          </h2>
        ))}
      </div>
      <Ex>
        <div>{info[0]}</div>
        <div>{info[1]}</div>
        <div>{info[2]}</div>
        <div>{info[3]}</div>
        <div>{info[4]}</div>
      </Ex> */}
    </Wrapper>
  );
};

export default MineSweeper;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 3%;
  background-color: #141414;
  width: 100vw;
  height: 100vh;
  color: white;
`;

const Board = styled.div``;

const Row = styled.div`
  width: 100%;
  height: 35px;
  display: flex;
`;

const Box = styled(motion.div)`
  width: 35px;
  height: 100%;
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Flag = styled(motion.div)`
  width: 35px;
  height: 100%;
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: gray;
`;

const Cover = styled(motion.div)`
  width: 35px;
  height: 100%;
  border: 1px solid rgba(255, 255, 255, 0.3);
  background-color: gray;
`;

const Ex = styled.div`
  margin-left: 30px;
`;
