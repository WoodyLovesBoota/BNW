import { motion } from "framer-motion";
import { styled } from "styled-components";

const Letter = ({ bgcolor, text }: IColor) => {
  return (
    <Wrapper variants={alphaVar} initial="initial" animate="animate" bgcolor={bgcolor} text={text}>
      <Alpha>{text}</Alpha>
    </Wrapper>
  );
};

export default Letter;

const Wrapper = styled(motion.div)<IColor>`
  width: 70px;
  height: 70px;
  border-radius: 18px;
  margin: 5px 3px;
  border: none;
  text-align: center;
  vertical-align: center;
  text-transform: uppercase;
  transition: background-color 1s ease-in-out;
  caret-color: transparent;
  background-color: ${(props) => props.bgcolor};
  &:focus {
    outline: none;
  }
`;

const Alpha = styled(motion.h2)`
  font-size: 56px;
  font-weight: 600;
  color: white;
`;

const alphaVar = {
  initial: { scale: 1.1 },
  animate: { scale: 1 },
};

interface IColor {
  bgcolor: string;
  text: string;
}
