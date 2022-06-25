import './App.css';
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import Landing from './components/pages/Landing';
import Selection from './components/pages/Selection';
import LobbySelection from './components/pages/LobbyCreation';
import ContactPage from './components/pages/ContactPage';
import AccountInfo from './components/pages/AccountInfo';
import AccountLogin from './components/pages/AccountLogin';

function App() {
  return (
    <Router>
      <Routes>
        <Route path ="/" element={<Landing/>} />
        {/* <Route path ="/about" caseSensitive={false} element={<About/>} /> */}
        <Route path ="/selection" caseSensitive={false} element={<Selection/>} />
        <Route path ="/contact" caseSensitive={false} element={<ContactPage/>} />
        <Route path ="/account" caseSensitive={false} element={<AccountInfo/>} />
        <Route path ="/login" caseSensitive={false} element={<AccountLogin/>} />
      </Routes>
    </Router>
  );
}

export default App;