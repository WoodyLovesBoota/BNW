import { styled } from "styled-components";
import axios from "axios";
import { useEffect } from "react";
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

  const words = [1, 2, 3, 4, 5, 6];

  return (
    <Wrapper onClick={() => setCurrent((prev) => prev + 1)}>
      <Buttons>
        <Button onClick={onHomeClick}>Home</Button>
      </Buttons>
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

const Wrapper = styled.div``;

const Container = styled.div`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 4%;
`;

const Buttons = styled.div`
  display: flex;
`;

const Button = styled.button``;
