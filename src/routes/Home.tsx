import { styled } from "styled-components";

import Face from "../components/Face";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <Wrapper>
      <Face />
      {/* <Footer /> */}
    </Wrapper>
  );
};

export default Home;

const Wrapper = styled.div`
  width: 100vw;
  position: relative;
`;
