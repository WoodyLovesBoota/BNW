import { styled } from "styled-components";

const Letter = ({ bgcolor }: IColor) => {
  const moveCursor = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace") {
      (e.currentTarget.previousSibling as HTMLElement)?.focus();
    } else if (e.currentTarget.value.length === 1) {
      (e.currentTarget.nextSibling as HTMLElement)?.focus();
    }
  };
  return <Input maxLength={1} required={true} bgcolor={bgcolor} onKeyUp={moveCursor}></Input>;
};

export default Letter;

const Input = styled.input<IColor>`
  width: 4.375rem;
  height: 4.375rem;
  border-radius: 1.125rem;
  margin: 0.3125rem 0.1875rem;
  border: none;
  text-align: center;
  vertical-align: center;
  font-size: 3.5rem;
  font-weight: 600;
  color: white;
  text-transform: uppercase;
  transition: background-color 1s ease-in-out;
  caret-color: transparent;
  background-color: ${(props) => props.bgcolor};
  &:focus {
    outline: none;
  }
`;

interface IColor {
  bgcolor: string;
}
