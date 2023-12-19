import {
  answerState,
  STATUS,
  isFinishState,
  historyState,
  wordleStateState,
  wordleClickState,
} from "../atoms";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import Letter from "./Letter";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";

const Word = ({ id }: { id: number }) => {
  const answer = useRecoilValue(answerState);
  const setIsFinished = useSetRecoilState(isFinishState);
  const [history, setHistory] = useRecoilState(historyState);
  const [current, setCurrent] = useRecoilState(wordleStateState);
  const [clicked, setClicked] = useRecoilState(wordleClickState);
  const [trial, setTrial] = useState("");
  const [green, setGreen] = useState<number[]>([]);
  const [yellow, setYellow] = useState<number[]>([]);
  const [gray, setGray] = useState<number[]>([]);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const { register, handleSubmit, getValues } = useForm<IForm>();
  const { ref, ...rest } = register("keyword");

  const onValid = () => {
    answer
      .toLowerCase()
      .split("")
      .forEach((e, i) => {
        if (e === trial[i]) {
          setGreen((prev) => [...prev, i]);
          setHistory((prev) => {
            let greens = [...prev["green"]];
            return { ...prev, ["green"]: [...greens, e] };
          });
        } else if (answer.includes(trial[i])) {
          setYellow((prev) => [...prev, i]);
          setHistory((prev) => {
            let yellows = [...prev["yellow"]];
            return { ...prev, ["yellow"]: [...yellows, trial[i]] };
          });
        } else {
          setGray((prev) => [...prev, i]);
          setHistory((prev) => {
            let grays = [...prev["gray"]];
            return { ...prev, ["gray"]: [...grays, trial[i]] };
          });
        }
      });
    setCurrent((prev) => prev + 1);
  };

  const handleKeyDown = () => {
    setTrial(getValues("keyword").toLowerCase());
  };

  useEffect(() => {
    if (id === current + 1) inputRef.current && inputRef.current.focus();
    if (green.length === 5) setIsFinished(STATUS.WIN);
    else if (current > 5) setIsFinished(STATUS.LOSE);
  }, [current, clicked]);

  return (
    <Wrapper>
      <Letters>
        {[0, 1, 2, 3, 4].map((index) => (
          <Letter
            key={index}
            text={trial[index]}
            bgcolor={
              green.includes(index)
                ? "#539165"
                : yellow.includes(index)
                ? "#F7C04A"
                : gray.includes(index)
                ? "#2b2b2b"
                : "#535353"
            }
          />
        ))}
      </Letters>
      <form onSubmit={handleSubmit(onValid)}>
        <Input
          {...rest}
          ref={(e) => {
            ref(e);
            inputRef.current = e;
          }}
          onKeyDown={handleKeyDown}
          onKeyUp={handleKeyDown}
          maxLength={5}
          minLength={5}
          autoComplete="off"
          required={true}
        />
        <button type="submit" style={{ display: "none" }} />
      </form>
    </Wrapper>
  );
};

export default Word;

const Wrapper = styled.div``;

const Letters = styled.div`
  display: flex;
`;

const Input = styled.input`
  background-color: transparent;
  border: transparent;
  color: transparent;
  outline: none;
`;

interface IForm {
  keyword: string;
}
