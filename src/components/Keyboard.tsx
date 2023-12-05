import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { historyState } from "../atoms";

const Keyboard = () => {
  const history = useRecoilValue(historyState);
  const firstRow = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
  const secondRow = ["A", "S", "D", "F", "G", "H", "I", "J", "K", "L"];
  const thirdRow = ["Z", "X", "C", "V", "B", "N", "M"];

  const historySet = Array.from(new Set(history).values());

  return (
    <Container>
      <Row>
        {firstRow.map((element) => (
          <Cell key={element} bgcolor={historySet.includes(element.toLowerCase()) ? "gray" : "#c4cbdd"}>
            {element}
          </Cell>
        ))}
      </Row>
      <Row>
        {secondRow.map((element) => (
          <Cell key={element} bgcolor={historySet.includes(element.toLowerCase()) ? "gray" : "#c4cbdd"}>
            {element}
          </Cell>
        ))}
      </Row>
      <Row>
        <Cell bgcolor={"#c4cbdd"} style={{ width: "7vw" }}>
          backspace
        </Cell>
        {thirdRow.map((element) => (
          <Cell key={element} bgcolor={historySet.includes(element.toLowerCase()) ? "gray" : "#c4cbdd"}>
            {element}
          </Cell>
        ))}
        <Cell bgcolor={"#c4cbdd"} style={{ width: "7vw" }}>
          Enter
        </Cell>
      </Row>
    </Container>
  );
};

export default Keyboard;

const Container = styled.div`
  margin-top: 3.125rem;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 31.25rem;
`;

const Cell = styled.div<IColor>`
  border: none;
  background-color: ${(props) => props.bgcolor};
  display: flex;
  justify-content: center;
  align-items: center;
  width: 3.125rem;
  height: 3.125rem;
  border-radius: 0.625rem;
  font-size: 1.125rem;
  color: #12121b;
  font-weight: 500;
  margin: 0.125rem;
  cursor: pointer;
`;

interface IColor {
  bgcolor: string;
}
