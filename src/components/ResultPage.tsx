import { styled, keyframes } from "styled-components";
import { IResult, STATUS, answerState } from "../atoms";
import { useRecoilValue } from "recoil";
import { faRotateRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ResultPage = ({ result }: IResult) => {
  const answer = useRecoilValue(answerState);
  return (
    <Container result={result}>
      <h1>{result === STATUS.WIN ? "GOOD !!!" : "So Close..."}</h1>
      <h1>The Answer is...</h1>
      <div>
        <span>{answer[0]?.toUpperCase()}</span>
        <span>{answer[1]?.toUpperCase()}</span>
        <span>{answer[2]?.toUpperCase()}</span>
        <span>{answer[3]?.toUpperCase()}</span>
        <span>{answer[4]?.toUpperCase()}</span>
      </div>
      <Button onClick={refreshPage}>
        <span>
          <FontAwesomeIcon icon={faRotateRight}></FontAwesomeIcon>
        </span>
        Restart
      </Button>
    </Container>
  );
};

export default ResultPage;

const Container = styled.div<IResult>`
  background-color: rgba(0, 0, 0, 0.9);
  top: ${(props) => (props.result === STATUS.NOT_FINISHED ? "-200vh" : 0)};
  width: 100vw;
  height: 100vh;
  position: fixed;
  transition: top 1.5s ease-in-out;
  padding: 8%;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  h1 {
    font-size: 4rem;
    margin-bottom: 2.5rem;
    font-weight: 400;
  }
  div {
    display: flex;
    span {
      font-size: 4.5rem;
      padding: 0.9375rem 1.875rem;
      font-weight: 700;
      margin-right: 1.25rem;
      background-color: #539165;
      text-align: center;
      vertical-align: center;
      border-radius: 0.9375rem;
    }
  }
`;

const rotationAni = keyframes`
  0% {transform: rotate(0deg)};
  100% {transform: rotate(360deg)};
`;

const Button = styled.button`
  margin-top: 3.75rem;
  border: none;
  color: white;
  background-color: transparent;
  font-size: 1.5rem;
  font-weight: 500;
  cursor: pointer;
  span {
    display: block;
    font-size: 3rem;
    &:hover {
      animation: ${rotationAni} 2s linear infinite;
    }
  }
`;

const refreshPage = () => {
  window.location.reload();
};
