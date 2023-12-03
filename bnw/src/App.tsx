import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./routes/Home";
import Omok from "./routes/Omok";
import FourtyNine from "./routes/FourtyNine";
import Match from "./routes/Match";

const App = () => {
  return (
    <>
      <Router basename={process.env.PUBLIC_URL}>
        <Routes>
          <Route path="/match" element={<Match />}></Route>
          <Route path="/49" element={<FourtyNine />}></Route>
          <Route path="/omok" element={<Omok />}></Route>
          <Route path="/" element={<Home />}></Route>
        </Routes>
      </Router>
    </>
  );
};

export default App;
