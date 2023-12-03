import { useEffect, useState } from "react";
import styled from "styled-components";

const Omok = () => {
  const [white, setWhite] = useState<{ row: number; col: number }[]>([]);
  const [black, setBlack] = useState<{ row: number; col: number }[]>([]);
  const [isWhite, setIsWhite] = useState(false);
  const [isFinish, setIsFinish] = useState(false);
  const [winner, setWinner] = useState(0);

  const checkRow = (arr: { row: number; col: number }[]) => {
    for (let i = 0; i < arr.length - 4; i++) {
      const targetRow = arr.slice(i, i + 5).map((item) => item.row);
      const targetCol = arr.slice(i, i + 5).map((item) => item.col);
      if (new Set(targetRow).size === 1) {
        if (
          targetCol[0] + 1 === targetCol[1] &&
          targetCol[1] + 1 === targetCol[2] &&
          targetCol[2] + 1 === targetCol[3] &&
          targetCol[3] + 1 === targetCol[4]
        ) {
          return true;
        }
      }
    }
    return false;
  };

  const checkCol = (arr: { row: number; col: number }[]) => {
    for (let i = 0; i < arr.length - 4; i++) {
      const targetRow = arr.slice(i, i + 5).map((item) => item.col);
      const targetCol = arr.slice(i, i + 5).map((item) => item.row);

      if (new Set(targetRow).size === 1) {
        if (
          targetCol[0] + 1 === targetCol[1] &&
          targetCol[1] + 1 === targetCol[2] &&
          targetCol[2] + 1 === targetCol[3] &&
          targetCol[3] + 1 === targetCol[4]
        ) {
          return true;
        }
      }
    }
    return false;
  };

  const checkDig = (arr: { row: number; col: number }[]) => {
    for (let i = 0; i < arr.length; i++) {
      let target = arr[i];
      let plus = [];
      let minus = [];
      for (let ele of arr) {
        if (target.col - target.row === ele.col - ele.row) plus.push(ele);
        if (target.col + target.row === ele.col + ele.row) minus.push(ele);
      }
      plus.sort((a, b) => a.row - b.row);
      minus.sort((a, b) => a.row - b.row);
      for (let i = 0; i < plus.length - 4; i++) {
        const targetRow = plus.slice(i, i + 5).map((item) => item.row);
        if (
          targetRow[0] + 1 === targetRow[1] &&
          targetRow[1] + 1 === targetRow[2] &&
          targetRow[2] + 1 === targetRow[3] &&
          targetRow[3] + 1 === targetRow[4]
        ) {
          return true;
        }
      }
      for (let i = 0; i < minus.length - 4; i++) {
        const targetRow = minus.slice(i, i + 5).map((item) => item.row);
        if (
          targetRow[0] + 1 === targetRow[1] &&
          targetRow[1] + 1 === targetRow[2] &&
          targetRow[2] + 1 === targetRow[3] &&
          targetRow[3] + 1 === targetRow[4]
        ) {
          return true;
        }
      }
    }
    return false;
  };

  const onBoxClick = (row: number, col: number) => {
    if (isWhite) {
      if (!white.some((e) => e.row === row && e.col === col) && !black.some((e) => e.row === row && e.col === col)) {
        setWhite((prev) => [...prev, { row: row, col: col }]);
        setIsWhite(false);
      }
    } else {
      if (!white.some((e) => e.row === row && e.col === col) && !black.some((e) => e.row === row && e.col === col)) {
        setBlack((prev) => [...prev, { row: row, col: col }]);
        setIsWhite(true);
      }
    }
  };

  useEffect(() => {
    let copyWhite = [...white];
    let copyColWhite = [...white];

    copyWhite.sort((a, b) => {
      if (a.row > b.row) return 1;
      else if (a.row < b.row) return -1;
      else {
        if (a.col > b.col) return 1;
        else return -1;
      }
    });

    copyColWhite.sort((a, b) => {
      if (a.col > b.col) return 1;
      else if (a.col < b.col) return -1;
      else {
        if (a.row > b.row) return 1;
        else return -1;
      }
    });

    if (copyWhite.length >= 5) {
      if (checkCol(copyColWhite) || checkRow(copyWhite) || checkDig(white)) {
        setIsFinish(true);
        setWinner(1);
      }
    }
  }, [white]);

  useEffect(() => {
    let copyWhite = [...black];
    let copyColWhite = [...black];

    copyWhite.sort((a, b) => {
      if (a.row > b.row) return 1;
      else if (a.row < b.row) return -1;
      else {
        if (a.col > b.col) return 1;
        else return -1;
      }
    });

    copyColWhite.sort((a, b) => {
      if (a.col > b.col) return 1;
      else if (a.col < b.col) return -1;
      else {
        if (a.row > b.row) return 1;
        else return -1;
      }
    });

    if (copyWhite.length >= 5) {
      if (checkCol(copyColWhite) || checkRow(copyWhite) || checkDig(black)) {
        setIsFinish(true);
        setWinner(2);
      }
    }
  }, [black]);

  return (
    <Wrapper>
      {isFinish ? (
        <Result>
          <ResultTitle>{winner === 1 ? "WHITE WIN" : "BLACK WIN"}</ResultTitle>
        </Result>
      ) : null}
      <Board>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22].map((row) => (
          <Row key={row}>
            {[
              1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29,
              30, 31, 32, 33, 34, 35,
            ].map((cell) =>
              white.some((e) => e.row === row && e.col === cell) ? (
                <Cell key={cell} loc={[row, cell]} onClick={() => onBoxClick(row, cell)}>
                  <Vertical />
                  <Horizen />
                  <White />
                </Cell>
              ) : black.some((e) => e.row === row && e.col === cell) ? (
                <Cell key={cell} loc={[row, cell]} onClick={() => onBoxClick(row, cell)}>
                  <Vertical />
                  <Horizen />
                  <Black />
                </Cell>
              ) : (
                <Cell key={cell} loc={[row, cell]} onClick={() => onBoxClick(row, cell)}>
                  <Vertical />
                  <Horizen />
                </Cell>
              )
            )}
          </Row>
        ))}
      </Board>
    </Wrapper>
  );
};
export default Omok;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 3%;
  background-color: #141414;
  width: 100vw;
  height: 100vh;
`;

const Board = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Row = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const Cell = styled.div<{ loc: number[] }>`
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

const White = styled.div`
  background-color: #934fc1;
  width: 30px;
  height: 30px;
  border-radius: 15px;
  z-index: 2;
`;

const Black = styled.div`
  background-color: #42d888;
  width: 30px;
  height: 30px;
  border-radius: 15px;
  z-index: 2;
`;

const Result = styled.div``;

const ResultTitle = styled.h2`
  color: white;
`;

const Cover = styled.div``;
