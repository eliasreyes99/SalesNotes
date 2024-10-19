
import { Routes, Route, useLocation  } from 'react-router-dom';
import Home from './Routes/Home';
import Login from './Routes/Login';
import Config from './Routes/Config';
import Notebooks from './Routes/Notebooks';
import Navbar from './components/Navbar';
import Note from './Routes/Note';

function App() {
  const userData = JSON.parse(localStorage.getItem('user'));
  const location = useLocation();
  return (
    <div>
      {location.pathname !== '/' && userData && <Navbar company_name={userData[0].company_name} />}
      <Routes>
        <Route>

          <Route path='/' element={<Login />} />
          <Route path='/home' element={<Home />} />
          <Route path='/config' element={<Config/>} />
          <Route path='/notebooks' element={<Notebooks/>} />
          <Route path='/note' element={<Note/>} />

        </Route>
      </Routes>

    </div>
  );
}

export default App;