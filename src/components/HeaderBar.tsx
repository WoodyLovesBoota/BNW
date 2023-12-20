import styled from "styled-components";

const HeaderBar = () => {
  const words = ["미니게임천국에", "오신", "것을", "환영합니다!"];
  return (
    <Wrapper>
      <Bar>
        {words
          .concat(words)
          .concat(words)
          .concat(words)
          .concat(words)
          .concat(words)
          .concat(words)
          .concat(words)
          .concat(words)
          .concat(words)
          .concat(words)
          .concat(words)
          .concat(words)
          .concat(words)
          .concat(words)
          .concat(words)
          .concat(words)
          .concat(words)
          .concat(words)
          .concat(words)
          .concat(words)
          .concat(words)
          .concat(words)
          .concat(words)
          .concat(words)
          .concat(words)
          .concat(words)
          .concat(words)
          .concat(words)
          .concat(words)
          .concat(words)
          .concat(words)
          .concat(words)
          .concat(words)
          .concat(words)
          .concat(words)
          .concat(words)
          .concat(words)
          .map((e, i) => (
            <Block key={e + i}>{e}</Block>
          ))}
      </Bar>
    </Wrapper>
  );
};
export default HeaderBar;

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  background-color: ${(props) => props.theme.blue};
  width: 100vw;
  height: 30px;
  z-index: 1;
  @media screen and (max-width: 796px) {
    height: 24px;
  }
`;

const Bar = styled.div`
  width: 300vw;
  height: 100%;
  display: flex;

  animation-iteration-count: infinite;
  animation-duration: 30s;
  animation-timing-function: linear;
  animation-fill-mode: forwards;
  animation-name: slidedown;

  @keyframes slidedown {
    0% {
      transform: translateX(-6000px);
    }
    100% {
      transform: translateX(-1660px);
    }
  }
`;

const Block = styled.h2`
  margin-right: 5px;
  font-size: 14px;
  display: flex;
  align-items: center;
  @media screen and (max-width: 796px) {
    font-size: 12px;
  }
`;
