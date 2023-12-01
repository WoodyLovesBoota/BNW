import { styled } from "styled-components";
import { motion } from "framer-motion";
import { useState } from "react";

const Home = () => {
  const [currentTile, setCurrentTile] = useState([0, 0]);

  const onMouseEnter = (row: number, column: number) => {
    setCurrentTile([row, column]);
  };

  return (
    <Wrapper>
      <BackgroundPhoto />
      <Cover>
        {[1, 2, 3, 4, 5, 6, 7, 8].map((row) => (
          <Row>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((tile) =>
              row === currentTile[0] && tile === currentTile[1] ? (
                <Glass
                  variants={tileVar}
                  animate="animate"
                  initial="initial"
                  onMouseEnter={() => onMouseEnter(row, tile)}
                />
              ) : row === currentTile[0] && (tile === currentTile[1] + 1 || tile === currentTile[1] - 1) ? (
                <Glass
                  variants={tileVar}
                  animate="animate"
                  initial="initial"
                  onMouseEnter={() => onMouseEnter(row, tile)}
                />
              ) : (row === currentTile[0] + 1 || row === currentTile[0] - 1) &&
                (tile === currentTile[1] || tile === currentTile[1] + 1 || tile === currentTile[1] - 1) ? (
                <Glass
                  variants={tileVar}
                  animate="animate"
                  initial="initial"
                  onMouseEnter={() => onMouseEnter(row, tile)}
                />
              ) : (
                <Tile
                  id={[row, tile]}
                  variants={tileVar}
                  animate="animate"
                  initial="initial"
                  onMouseEnter={() => onMouseEnter(row, tile)}
                />
              )
            )}
          </Row>
        ))}
      </Cover>
    </Wrapper>
  );
};

export default Home;

const Wrapper = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
`;

const BackgroundPhoto = styled.div`
  width: 100%;
  height: 100%;
  background: url("https://www.adobe.com/content/dam/cc/us/en/creativecloud/design/discover/is-black-a-color/desktop/is-black-a-color_P4a_690x450.jpg.img.jpg");
  background-position: center center;
  background-size: cover;
`;

const Cover = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const Row = styled.div`
  width: 100%;
  height: 12.5%;
  display: flex;
`;

const Tile = styled(motion.div)<{ id: number[] }>`
  width: 10%;
  height: 100%;
  background-color: black;
  border: 0.5px solid gray;
`;

const Glass = styled(motion.div)`
  width: 10%;
  height: 100%;
  border: 0.5px solid gray;
  transition: transform 0.3s ease-in-out;
  &:hover {
    transform: translateY(-5px);
  }
`;

const tileVar = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
};
