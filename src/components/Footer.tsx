import styled from "styled-components";
import { ReactComponent as Arrow } from "../assets/arrowtop.svg";

const Footer = () => {
  return (
    <Wrapper>
      <Info>
        <Column>
          <Link>@ YANGTAEWOOK 2023.</Link>
        </Column>
        <Column>
          <Contents>
            <Description href="https://woodylovesboota.xyz/" target="_blank">
              PORTFOLIO
            </Description>
            <Description href="https://github.com/WoodyLovesBoota" target="_blank">
              GITHUB
            </Description>
            <Description href="https://velog.io/@woodylovescoding" target="_blank">
              BLOG
            </Description>
            <Description
              href="https://www.linkedin.com/in/tae-wook-yang-6762092a2/"
              target="_blank"
            >
              LINKEDIN
            </Description>
          </Contents>
        </Column>
        <Column>
          <Description
            onClick={() => {
              window.scrollTo(0, 0);
            }}
          >
            BACK TO TOP
            <Arrow />
          </Description>
        </Column>
      </Info>
    </Wrapper>
  );
};

export default Footer;

const Wrapper = styled.div`
  width: 100%;
  background-color: gray;
  position: absolute;
  display: flex;
  justify-content: center;
  height: 330px;
  top: 1900px;
  @media screen and (max-width: 1212px) {
    top: 2400px;
    height: inherit;
  }
  @media screen and (max-width: 796px) {
    top: 3400px;
  }
`;

const Info = styled.div`
  width: 1080px;
  height: 100%;
  display: flex;
  justify-content: space-between;
  @media screen and (max-width: 1212px) {
    width: 100%;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 100px 0;
    padding-bottom: 50px;
  }
`;

const Column = styled.div`
  display: flex;
  align-items: center;
  @media screen and (max-width: 1212px) {
    margin-bottom: 50px;
  }
`;

const Contents = styled.div`
  display: flex;
  justify-content: space-between;
  @media screen and (max-width: 796px) {
    flex-direction: column;
  }
`;

const Description = styled.a`
  font-size: 14px;
  font-weight: 400;
  margin: 0 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  @media screen and (max-width: 796px) {
    margin: 20px 0;
    justify-content: center;
  }
`;

const Link = styled.h2`
  text-align: center;
  font-size: 14px;
`;
