import { styled } from "styled-components";
import { motion } from "framer-motion";
import { useState } from "react";

const Main = () => {
  const [currentTile, setCurrentTile] = useState([0, 0]);

  const onMouseEnter = (row: number, column: number) => {
    setCurrentTile([row, column]);
  };

  return (
    <Wrapper>
      <BackgroundPhoto />
      <Cover>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20].map((row) => (
          <Row>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25].map((tile) =>
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
                (tile === currentTile[1] ||
                  tile === currentTile[1] + 1 ||
                  tile === currentTile[1] - 1 ||
                  tile === currentTile[1] - 2 ||
                  tile === currentTile[1] + 2) ? (
                <Glass
                  variants={tileVar}
                  animate="animate"
                  initial="initial"
                  onMouseEnter={() => onMouseEnter(row, tile)}
                />
              ) : (row === currentTile[0] + 2 || row === currentTile[0] - 2) &&
                (tile === currentTile[1] || tile === currentTile[1] - 1 || tile === currentTile[1] + 1) ? (
                <Glass
                  variants={tileVar}
                  animate="animate"
                  initial="initial"
                  onMouseEnter={() => onMouseEnter(row, tile)}
                />
              ) : row === currentTile[0] && (tile === currentTile[1] + 2 || tile === currentTile[1] - 2) ? (
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

export default Main;

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
  height: 5%;
  display: flex;
`;

const Tile = styled(motion.div)<{ id: number[] }>`
  width: 4%;
  height: 100%;
  background-color: #141414;
  border: 0.5px solid rgba(71, 71, 71, 0.2);
`;

const Glass = styled(motion.div)`
  width: 4%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.1);
  border: 0.5px solid rgba(255, 255, 255, 0.1);
`;

const tileVar = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.3 } },
};
