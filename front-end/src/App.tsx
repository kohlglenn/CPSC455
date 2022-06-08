import './App.css';
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import Landing from './components/pages/Landing';
import Selection from './components/pages/Selection';

function App() {
  return (
    <Router>
      <Routes>
        <Route path ="/" element={<Landing/>} />
        {/* <Route path ="/about" caseSensitive={false} element={<About/>} /> */}
        <Route path ="/selection" caseSensitive={false} element={<Selection/>} />
      </Routes>
    </Router>
  );
}

export default App;