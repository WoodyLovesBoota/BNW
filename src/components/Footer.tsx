import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBlog } from "@fortawesome/free-solid-svg-icons";
import { faGithub, faInstagram, faLinkedin } from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <Wrapper>
      <Info>
        <Column>
          <Title>About</Title>
          <Contents>
            <Description href="https://github.com/WoodyLovesBoota/BNW" target="_blank">
              View Code
            </Description>
          </Contents>
        </Column>
        <Column>
          <Title>Get in touch</Title>
          <Contents>
            <Description>woodylovesboota@gmail.com</Description>
            <Description>+82) 10-2363-7164</Description>
          </Contents>
        </Column>
        <Column>
          <Title>Work</Title>
          <Contents>
            <Description href="https://woodylovesboota.xyz/" target="_blank">
              Portfolio
            </Description>
            <Description href="https://github.com/WoodyLovesBoota" target="_blank">
              Github
            </Description>
            <Description href="https://velog.io/@woodylovescoding" target="_blank">
              Personal Blog
            </Description>
          </Contents>
        </Column>
        <Column>
          <Title>Connect</Title>
          <Contents>
            <Description href="https://www.instagram.com/tttaeook/" target="_blank">
              Instagram
            </Description>
            <Description
              href="https://www.linkedin.com/in/tae-wook-yang-6762092a2/"
              target="_blank"
            >
              LinkedIn
            </Description>
          </Contents>
        </Column>
      </Info>
      <Link>@2023 - YANGTAEWOOK</Link>
      {/* <Icons>
        <Icon href="https://github.com/WoodyLovesBoota" target="_blank">
          <FontAwesomeIcon icon={faGithub} />
        </Icon>
        <Icon href="https://www.instagram.com/tttaeook/" target="_blank">
          <FontAwesomeIcon icon={faInstagram} />
        </Icon>
        <Icon href="https://www.linkedin.com/in/tae-wook-yang-6762092a2/" target="_blank">
          <FontAwesomeIcon icon={faLinkedin} />
        </Icon>
        <Icon href="https://velog.io/@woodylovescoding" target="_blank">
          <FontAwesomeIcon icon={faBlog} />
        </Icon>
      </Icons>
      <Info>@2023 - YANGTAEWOOK</Info> */}
    </Wrapper>
  );
};

export default Footer;

const Wrapper = styled.div`
  width: 100%;
  background-color: gray;
  position: absolute;
  top: 1900px;
  @media screen and (max-width: 1212px) {
    top: 2400px;
  }
  @media screen and (max-width: 796px) {
    top: 3400px;
  }
`;

const Info = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 100px 250px;
  @media screen and (max-width: 1212px) {
    padding: 100px 100px;
  }
  @media screen and (max-width: 796px) {
    flex-direction: column;
    justify-content: flex-start;
    padding: 40px;
  }
`;

const Column = styled.div``;

const Title = styled.h2`
  color: black;
  line-height: 2;
  font-size: 14px;
`;

const Contents = styled.div`
  display: flex;
  flex-direction: column;
`;

const Description = styled.a`
  color: white;
  font-size: 14px;
  line-height: 2;
`;

const Link = styled.h2`
  text-align: center;
  padding-bottom: 100px;
  font-size: 14px;
  @media screen and (max-width: 796px) {
    text-align: start;
    padding-left: 40px;
  }
`;
