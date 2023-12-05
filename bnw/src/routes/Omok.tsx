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
  justify-content: space-between;
  padding: 5% 8%;
  background-color: #141414;
  width: 100vw;
  height: 100vh;
  @media screen and (max-width: 899px) {
    flex-direction: column-reverse;
    justify-content: flex-end;
    width: 1500px;
    padding: 5%;
    overflow-x: scroll;
  }
`;

const Board = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media screen and (max-width: 899px) {
    align-items: flex-start;
  }
`;

const Row = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  @media screen and (max-width: 899px) {
    justify-content: flex-start;
  }
`;

const Cell = styled.div<{ loc: number[] }>`
  width: 2.25rem;
  height: 2.25rem;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Vertical = styled.div`
  background-color: rgba(255, 255, 255, 0.6);
  width: 0.0625rem;
  height: 100%;
  position: absolute;
  left: 50%;
  z-index: 1;
`;

const Horizen = styled.div`
  background-color: rgba(255, 255, 255, 0.6);
  width: 100%;
  height: 0.0625rem;
  position: absolute;
  top: 50%;
  z-index: 1;
`;

const White = styled.div`
  background-color: #87cefa;
  width: 1.875rem;
  height: 1.875rem;
  border-radius: 0.9375rem;
  z-index: 2;
`;

const Black = styled.div`
  background-color: #f7aea6;
  width: 1.875rem;
  height: 1.875rem;
  border-radius: 0.9375rem;
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

const Icons = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 3.125rem;
  @media screen and (max-width: 899px) {
    flex-direction: row;
    margin-bottom: 10px;
    margin-top: 0;
  }
`;

const Icon = styled.span`
  color: white;
  font-weight: 500;
  font-size: 1.5rem;
  margin-bottom: 1.25rem;
  cursor: pointer;
  @media screen and (max-width: 899px) {
    margin-right: 1.25rem;
  }
`;
