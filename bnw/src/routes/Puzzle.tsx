import styled from "styled-components";

const Puzzle = () => {
  return (
    <Wrapper>
      <Board>{[1, 2, 3, 4, 5]}</Board>
    </Wrapper>
  );
};
export default Puzzle;

const Wrapper = styled.div``;

const Board = styled.div``;

const Row = styled.div``;

const Cell = styled.div``;

const Cover = styled.div``;
