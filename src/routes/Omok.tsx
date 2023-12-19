import { useEffect, useState } from "react";
import { styled, keyframes } from "styled-components";
import { useNavigate } from "react-router-dom";
import { ReactComponent as HomeIcon } from "../assets/home.svg";
import { ReactComponent as RestartIcon } from "../assets/restart.svg";

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
      if (
        !white.some((e) => e.row === row && e.col === col) &&
        !black.some((e) => e.row === row && e.col === col)
      ) {
        setWhite((prev) => [...prev, { row: row, col: col }]);
        setIsWhite(false);
      }
    } else {
      if (
        !white.some((e) => e.row === row && e.col === col) &&
        !black.some((e) => e.row === row && e.col === col)
      ) {
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
          <ResultTitle isBlue={winner === 1}>
            {winner === 1 ? "Yellow Win :)" : "Blue Win :)"}
          </ResultTitle>
          <ResultIcons>
            <ResultIcon onClick={onRestartClick}>
              <RestartIcon width={"32px"} />
            </ResultIcon>
            <ResultIconHome onClick={onHomeClick}>
              <HomeIcon width={"32px"} />
            </ResultIconHome>
          </ResultIcons>
        </Result>
      ) : null}
      <Icons>
        <Icon onClick={onHomeClick}>HOME</Icon>
        <RightIcons>
          <Icon onClick={onRestartClick}>RESTART</Icon>
          <Icon onClick={onGoBackClick}>BACK</Icon>
        </RightIcons>
      </Icons>
      <Board>
        <CoverTop />
        <CoverBottom />
        <CoverLeft />
        <CoverRight />
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((row) => (
          <Row key={row}>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((cell) =>
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
  flex-direction: column;
  align-items: center;
  width: 100vw;
  height: 100vh;
  padding: 46px 0;
`;

const Icons = styled.div`
  display: flex;
  align-items: center;
  width: 585px;
  margin-bottom: 45px;
`;

const RightIcons = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;
`;

const Icon = styled.h2`
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
  margin: 0 10px;
  &:hover {
    background-color: #e5e5e5;
    box-shadow: 3px 3px 0px 0px rgba(0, 0, 0, 0.25) inset;
  }
  &:active {
    background-color: #00000011;
    box-shadow: 3px 3px 0px 0px rgba(0, 0, 0, 0.25) inset;
  }
`;

const CoverTop = styled.div`
  background-color: #d2d2d2;
  position: absolute;
  top: 0;
  width: 100%;
  height: 22px;
  z-index: 2;
`;

const CoverBottom = styled.div`
  background-color: #d2d2d2;
  position: absolute;
  bottom: 0px;
  width: 100%;
  height: 19px;
  z-index: 2;
`;

const CoverLeft = styled.div`
  background-color: #d2d2d2;
  position: absolute;
  left: 0;
  height: 100%;
  width: 20px;
  z-index: 2;
`;

const CoverRight = styled.div`
  background-color: #d2d2d2;
  position: absolute;
  right: 0px;
  width: 17px;
  height: 100%;
  z-index: 2;
`;

const Board = styled.div`
  width: 600px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: relative;
`;

const Row = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const Cell = styled.div<{ loc: number[] }>`
  width: 43px;
  height: 43px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Vertical = styled.div`
  background-color: #e6e6e6;
  width: 3px;
  height: 100%;
  position: absolute;
  left: 50%;
  z-index: 1;
`;

const Horizen = styled.div`
  background-color: #e6e6e6;
  width: 100%;
  height: 3px;
  position: absolute;
  top: 50%;
  z-index: 1;
`;

const White = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 15px;
  z-index: 2;
  background: url("./stoneWhite.png");
  background-position: center center;
  background-size: cover;
`;

const Black = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 15px;
  z-index: 2;
  background: url("./stoneBlack.png");
  background-position: center center;
  background-size: cover;
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

const ResultTitle = styled.h2<{ isBlue: boolean }>`
  color: ${(props) => (!props.isBlue ? "#00E0FF" : "#D9FF00")};
  font-weight: 500;
  font-size: 32px;
  letter-spacing: 2px;
  padding-bottom: 56px;
`;

const rotationAni = keyframes`
  0% {transform: rotate(0deg)};
  100% {transform: rotate(-360deg)};
`;

const ResultIcons = styled.div`
  display: flex;
`;

const ResultIcon = styled.span`
  color: white;
  font-weight: 500;
  font-size: 32px;
  cursor: pointer;
  animation: ${rotationAni} 3s linear infinite;
  margin: 0 12px;
`;

const ResultIconHome = styled.span`
  color: white;
  font-weight: 500;
  font-size: 32px;
  cursor: pointer;
  margin: 0 12px;
`;
