import { styled, keyframes } from "styled-components";
import { IResult, STATUS, answerState } from "../atoms";
import { useRecoilValue } from "recoil";
import { ReactComponent as HomeIcon } from "../assets/home.svg";
import { ReactComponent as RestartIcon } from "../assets/restart.svg";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const ResultPage = ({ result }: IResult) => {
  const answer = useRecoilValue(answerState);
  const navigate = useNavigate();

  const onHomeClick = () => {
    navigate("/");
  };

  const onRestartClick = () => {
    window.location.reload();
  };
  return (
    <Container result={result}>
      <h1>The Answer is...</h1>
      <div>
        <span>{answer[0]?.toUpperCase()}</span>
        <span>{answer[1]?.toUpperCase()}</span>
        <span>{answer[2]?.toUpperCase()}</span>
        <span>{answer[3]?.toUpperCase()}</span>
        <span>{answer[4]?.toUpperCase()}</span>
      </div>
      <ResultButtons>
        <ResButton onClick={onRestartClick}>
          <RestartIcon width={"32px"} />
        </ResButton>
        <ResButtonHome onClick={onHomeClick}>
          <HomeIcon width={"32px"} />
        </ResButtonHome>
      </ResultButtons>
    </Container>
  );
};

export default ResultPage;

const Container = styled.div<IResult>`
  background-color: rgba(0, 0, 0, 0.75);
  top: ${(props) => (props.result === STATUS.NOT_FINISHED ? "-200vh" : 0)};
  width: 100vw;
  height: 100vh;
  position: fixed;
  z-index: 6;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  h1 {
    font-size: 16px;
    margin-bottom: 26px;
    font-weight: 400;
    color: white;
  }
  div {
    display: flex;
    span {
      font-size: 32px;
      padding: 15px;
      font-weight: 400;
      margin-right: 10px;
      background-color: ${(props) => props.theme.accent};
      text-align: center;
      vertical-align: center;
      border-radius: 10px;
    }
  }
`;

const ResultButtons = styled.div`
  display: flex;
  margin-top: 56px;
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
