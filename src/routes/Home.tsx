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
  width: 100vw;
`;
