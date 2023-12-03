import { useEffect, useState } from "react";
import { styled, keyframes } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRotateRight, faLeftLong, faHouse } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const Omok = () => {
  const [white, setWhite] = useState<{ row: number; col: number }[]>([]);
  const [black, setBlack] = useState<{ row: number; col: number }[]>([]);
  const [isWhite, setIsWhite] = useState(false);
  const [isFinish, setIsFinish] = useState(false);
  const [winner, setWinner] = useState(0);
  const navigate = useNavigate();

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

  const onHomeClick = () => {
    setWhite([]);
    setBlack([]);
    setIsFinish(false);
    setWinner(0);
    navigate("/");
  };

  const onRestartClick = () => {
    setWhite([]);
    setBlack([]);
    setIsFinish(false);
    setWinner(0);
  };

  const onGoBackClick = () => {
    if (!isWhite) {
      setWhite((prev) => [...prev.slice(0, prev.length - 1)]);
      setIsWhite(true);
    } else {
      setBlack((prev) => [...prev.slice(0, prev.length - 1)]);
      setIsWhite(false);
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
          <ResultTitle>{winner === 1 ? "BLUE WIN" : "RED WIN"}</ResultTitle>
          <ResultIcon onClick={onRestartClick}>
            <FontAwesomeIcon icon={faArrowRotateRight} />
          </ResultIcon>
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
      <Icons>
        <Icon onClick={onHomeClick}>
          <FontAwesomeIcon icon={faHouse} />
        </Icon>
        <Icon onClick={onRestartClick}>
          <FontAwesomeIcon icon={faArrowRotateRight} />
        </Icon>
        <Icon onClick={onGoBackClick}>
          <FontAwesomeIcon icon={faLeftLong} />
        </Icon>
      </Icons>
    </Wrapper>
  );
};
export default Omok;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 3%;
  background-color: #141414;
  width: 100vw;
  height: 100vh;
`;

const Board = styled.div`
  width: 80%;
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
  background-color: #87cefa;
  width: 30px;
  height: 30px;
  border-radius: 15px;
  z-index: 2;
`;

const Black = styled.div`
  background-color: #f7aea6;
  width: 30px;
  height: 30px;
  border-radius: 15px;
  z-index: 2;
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
  font-size: 32px;
  letter-spacing: 2px;
  padding-bottom: 30px;
`;

const rotationAni = keyframes`
  0% {transform: rotate(0deg)};
  100% {transform: rotate(360deg)};
`;

const ResultIcon = styled.span`
  color: white;
  font-weight: 500;
  font-size: 32px;
  letter-spacing: 2px;
  margin-bottom: 30px;
  cursor: pointer;
  animation: ${rotationAni} 3s linear infinite;
`;

const Icons = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 50px;
`;

const Icon = styled.span`
  color: white;
  font-weight: 500;
  font-size: 24px;
  margin-bottom: 20px;
  cursor: pointer;
`;
