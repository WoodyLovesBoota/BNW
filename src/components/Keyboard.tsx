import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { historyState } from "../atoms";

const Keyboard = () => {
  const history = useRecoilValue(historyState);
  const firstRow = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
  const secondRow = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
  const thirdRow = ["Z", "X", "C", "V", "B", "N", "M"];

  const historyGreenSet = [...new Set(...[history.green])];
  const historyYellowSet = [...new Set(...[history.yellow])];
  const historyGraySet = [...new Set(...[history.gray])];

  return (
    <Container>
      <Row>
        {firstRow.map((element) => (
          <Cell
            key={element}
            bgcolor={
              historyGreenSet.includes(element.toLowerCase())
                ? "#D9FF00"
                : historyYellowSet.includes(element.toLowerCase())
                ? "#FF7B7B"
                : historyGraySet.includes(element.toLowerCase())
                ? "#999999"
                : "#ffffff"
            }
          >
            {element}
          </Cell>
        ))}
      </Row>
      <Row>
        {secondRow.map((element) => (
          <Cell
            key={element}
            bgcolor={
              historyGreenSet.includes(element.toLowerCase())
                ? "#D9FF00"
                : historyYellowSet.includes(element.toLowerCase())
                ? "#FF7B7B"
                : historyGraySet.includes(element.toLowerCase())
                ? "#999999"
                : "#ffffff"
            }
          >
            {element}
          </Cell>
        ))}
      </Row>
      <Row>
        {thirdRow.map((element) => (
          <Cell
            key={element}
            bgcolor={
              historyGreenSet.includes(element.toLowerCase())
                ? "#D9FF00"
                : historyYellowSet.includes(element.toLowerCase())
                ? "#FF7B7B"
                : historyGraySet.includes(element.toLowerCase())
                ? "#999999"
                : "#ffffff"
            }
          >
            {element}
          </Cell>
        ))}
      </Row>
    </Container>
  );
};

export default Keyboard;

const Container = styled.div`
  margin-top: 60px;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 56.25rem;
`;

const Cell = styled.div<IColor>`
  border: none;
  background-color: ${(props) => props.bgcolor};
  display: flex;
  justify-content: center;
  align-items: center;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 400;
  margin: 0.25rem;
  cursor: default;
`;

interface IColor {
  bgcolor: string;
}
