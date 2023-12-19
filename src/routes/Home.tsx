import { styled } from "styled-components";

import Face from "../components/Face";

const Home = () => {
  return (
    <Wrapper>
      <Face />
    </Wrapper>
  );
};

export default Home;

const Wrapper = styled.div`
  position: relative;
  width: 100vw;
  background-color: #141414;
`;
