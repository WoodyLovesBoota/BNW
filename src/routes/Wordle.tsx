import { styled } from "styled-components";
import axios from "axios";
import { useEffect } from "react";
import Word from "../components/Word";
import { answerState, isFinishState } from "../atoms";
import { useRecoilValue, useSetRecoilState } from "recoil";
import ResultPage from "../components/ResultPage";
import Keyboard from "../components/Keyboard";

function Wordle() {
  const setAnswer = useSetRecoilState(answerState);
  const isFinished = useRecoilValue(isFinishState);

  const getWord = async () => {
    const { data } = await axios("https://random-word-api.herokuapp.com/word?length=5");
    setAnswer(data[0]);
  };

  useEffect(() => {
    getWord();
  }, []);

  const words = [1, 2, 3, 4, 5, 6, 7];

  return (
    <Wrapper>
      <Container>
        {words.map((element) => {
          return <Word key={element}></Word>;
        })}
        <Keyboard />
      </Container>
      <ResultPage result={isFinished} />
    </Wrapper>
  );
}

export default Wordle;

const Wrapper = styled.div`
  background-color: #141414;
`;

const Container = styled.div`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 4%;
`;
