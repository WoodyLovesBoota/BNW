import { motion } from "framer-motion";
import { styled } from "styled-components";

const Letter = ({ bgcolor, text }: IColor) => {
  return (
    <Wrapper bgcolor={bgcolor} text={text}>
      <Alpha>{text}</Alpha>
    </Wrapper>
  );
};

export default Letter;

const Wrapper = styled(motion.div)<IColor>`
  width: 54px;
  height: 68px;
  border-radius: 8px;
  margin: 8px 4px;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  text-transform: uppercase;
  transition: background-color 1s ease-in-out;
  caret-color: transparent;
  background-color: ${(props) => props.bgcolor};
  &:focus {
    outline: none;
  }
`;

const Alpha = styled(motion.h2)`
  font-size: 32px;
  font-weight: 400;
  color: #4d4d4d;
`;

interface IColor {
  bgcolor: string;
  text: string;
}
