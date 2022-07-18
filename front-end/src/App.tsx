import './App.css';
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import Landing from './components/pages/Landing';
import Selection from './components/pages/Selection';
import LobbySelection from './components/pages/LobbySelection';
import LobbyPage from './components/pages/LobbyPage';

import ContactPage from './components/pages/ContactPage';
import AccountInfo from './components/pages/AccountInfo';
import AccountLogin from './components/pages/AccountLogin';
import SimpleCreation from './components/pages/SimpleCreation';

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
        <Route path ="/createaccount" caseSensitive={false} element={<SimpleCreation/>} />
        <Route path ="/lobbyselection" caseSensitive={false} element={<LobbySelection/>} />
        <Route path ="/lobbypage" caseSensitive={false} element={<LobbyPage participants={[]} newLobby={true} numberRestaurants={50}/>} />

      </Routes>
    </Router>
  );
}

export default App;