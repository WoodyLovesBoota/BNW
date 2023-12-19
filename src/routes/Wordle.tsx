import { styled } from "styled-components";
import axios from "axios";
import { useEffect, useState } from "react";
import Word from "../components/Word";
import { answerState, isFinishState, wordleClickState, wordleStateState } from "../atoms";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import ResultPage from "../components/ResultPage";
import Keyboard from "../components/Keyboard";
import { useNavigate } from "react-router-dom";

function Wordle() {
  const setAnswer = useSetRecoilState(answerState);
  const isFinished = useRecoilValue(isFinishState);
  const [current, setCurrent] = useRecoilState(wordleClickState);
  const [currentStage, setCurrentStage] = useRecoilState(wordleStateState);
  const [isHover, setIsHover] = useState(false);

  const navigate = useNavigate();

  const getWord = async () => {
    const { data } = await axios("https://random-word-api.herokuapp.com/word?length=5");
    setAnswer(data[0]);
  };

  useEffect(() => {
    getWord();
  }, []);

  const onHomeClick = () => {
    navigate("/");
  };

  const onRestartClick = () => {
    window.location.reload();
  };

  const words = [1, 2, 3, 4, 5, 6];

  return (
    <Wrapper onClick={() => setCurrent((prev) => prev + 1)}>
      <Buttons>
        <Button onClick={onHomeClick}>HOME</Button>
        <ButtonRights>
          <Button onClick={onRestartClick}>RESTART</Button>
          <Button
            onMouseEnter={() => {
              setIsHover(true);
            }}
            onMouseLeave={() => {
              setIsHover(false);
            }}
          >
            ?
          </Button>
        </ButtonRights>
        {isHover && (
          <Information>
            <InfoBox>
              <InfoRow>
                <ColorY></ColorY>
                <InfoContent>Included in correct spot</InfoContent>
              </InfoRow>
              <InfoRow>
                <ColorR></ColorR>
                <InfoContent>Included in wrong spot</InfoContent>
              </InfoRow>
              <InfoRow>
                <ColorG></ColorG>
                <InfoContent>Not Included</InfoContent>
              </InfoRow>
            </InfoBox>
          </Information>
        )}
      </Buttons>
      <Hearts>
        {[1, 2, 3, 4, 5, 6].slice(currentStage).map((e) => (
          <Filled />
        ))}
        {[1, 2, 3, 4, 5, 6].slice(0, currentStage).map((e) => (
          <Heart />
        ))}
      </Hearts>
      <Container>
        {words.map((element) => {
          return <Word key={element} id={element}></Word>;
        })}
        <Keyboard />
      </Container>
      <ResultPage result={isFinished} />
    </Wrapper>
  );
}

export default Wordle;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 0;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Buttons = styled.div`
  width: 300px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 54px;
  position: relative;
`;

const ButtonRights = styled.div`
  margin-left: auto;
  display: flex;
`;

const Button = styled.button`
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
  position: relative;
  &:last-child {
    margin-left: 16px;
  }
  &:hover {
    background-color: #e5e5e5;
  }
  &:active {
    background-color: #00000011;
    box-shadow: 3px 3px 0px 0px rgba(0, 0, 0, 0.25) inset;
  }
`;

const Hearts = styled.div`
  display: flex;
  width: 300px;
  margin-bottom: 24px;
`;

const Filled = styled.div`
  background: url("./filled.png");
  background-position: center center;
  background-size: cover;
  width: 20px;
  height: 20px;
`;

const Heart = styled.div`
  background: url("./heart.png");
  background-position: center center;
  background-size: cover;
  width: 20px;
  height: 20px;
`;

const Information = styled.div`
  position: absolute;
  background: #e6e6e6;
  border-radius: 5px;
  right: 0;
  top: 50px;
  &::after {
    content: "";
    position: absolute;
    top: 0;
    right: 7px;
    width: 0;
    height: 0;
    border: 10px solid transparent;
    border-bottom-color: #e6e6e6;
    border-top: 0;
    margin-left: -7px;
    margin-top: -7px;
  }
`;

const InfoBox = styled.div`
  padding: 16px;
  box-shadow: 0px 3px 0px 0px rgba(0, 0, 0, 0.25);
  border-radius: 8px;
`;

const InfoRow = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  margin-bottom: 22px;
  &:last-child {
    margin-bottom: 0;
  }
`;

const ColorY = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 4px;
  background-color: #d9ff00;
`;

const ColorR = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 4px;
  background-color: #ff7b7b;
`;

const ColorG = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 4px;
  background-color: #999999;
`;

const InfoContent = styled.h2`
  font-size: 14px;
  margin-left: 12px;
`;
