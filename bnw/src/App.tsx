import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./routes/Home";
import Puzzle from "./routes/Puzzle";
import FourtyNine from "./routes/FourtyNine";

const App = () => {
  return (
    <>
      <Router basename={process.env.PUBLIC_URL}>
        <Routes>
          <Route path="/49" element={<FourtyNine />}></Route>
          <Route path="/puzzle" element={<Puzzle />}></Route>
          <Route path="/" element={<Home />}></Route>
        </Routes>
      </Router>
    </>
  );
};

export default App;
