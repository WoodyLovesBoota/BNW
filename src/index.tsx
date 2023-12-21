import ReactDOM from "react-dom/client";
import App from "./App";
import { ThemeProvider, createGlobalStyle } from "styled-components";
import { RecoilRoot } from "recoil";
import { theme } from "./theme";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@300;400&display=swap');
  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center, input, textarea,
  dl, dt, dd, menu, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed,
  figure, figcaption, footer, header, hgroup,
  main, menu, nav, output, ruby, section, summary,
  time, mark, audio, video,button {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 16px;
    vertical-align: baseline;
    font-family: Galmuri11,  sans-serif;
    font-weight: 300;
    line-height: 1;
    color: #262626;
    word-break: keep-all;

 
    @media screen and (max-width: 796px) {
      font-size: 9.6px;
    }

  }
  /* HTML5 display-role reset for older browsers */
  article, aside, details, figcaption, figure,
  footer, header, hgroup, main, menu, nav, section {
    display: block;
  }
  /* HTML5 hidden-attribute fix for newer browsers */
  *[hidden] {
    display: none;
  }
  body {
    line-height: 1;
    max-width: 100%;
    overflow-x: hidden;
  }
  menu, ol, ul {
    list-style: none;
  }
  blockquote, q {
    quotes: none;
  }
  blockquote:before, blockquote:after,
  q:before, q:after {
    content: '';
    content: none;
  }
  
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }

  * {
    box-sizing: border-box;
  }

  body {
    font-weight: 300;
    line-height: 1.2;
    background-color: #d2d2d2;

  }

  a {
    text-decoration:none;
    color:inherit;
  }

  &::-webkit-scrollbar {
    background-color: transparent;
    width: 5px;
    height: 5px; 
    display: none;
  }

  &::-webkit-scrollbar-track {
    background-color: transparent;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: transparent;

  }
`;

root.render(
  <RecoilRoot>
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <App />
    </ThemeProvider>
  </RecoilRoot>
);
